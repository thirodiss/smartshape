"use client";

import { useEffect, useMemo, useState } from "react";
import type { NormalizedFitProfile } from "@/lib/fit-profile";

type MissingFitProfile = {
  objetivo: boolean;
  nivel: boolean;
  localTreino: boolean;
  diasTreino: boolean;
  duracaoTreino: boolean;
  estiloDieta: boolean;
};

type MealItem = {
  name: string;
  amount: string;
};

type DietMeal = {
  mealName: string;
  timeSuggestion: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  items: MealItem[];
};

type DietPlan = {
  summary: string;
  target: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  style: string;
  restrictions: string[];
  hydrationLiters: number;
  notes: string[];
  meals: DietMeal[];
  meta?: Record<string, any>;
};

type DietPlanResult = {
  ok: boolean;
  type: "diet_plan";
  plan: DietPlan;
};

type Props = {
  userId: string;
  fitProfile: NormalizedFitProfile;
  nutrition: any;
  progress: any;
  fitProfileComplete: boolean;
  fitProfileMissing: MissingFitProfile;
  plan: string;
};

function prettyLabel(key: string) {
  const labels: Record<string, string> = {
    objetivo: "Objetivo",
    nivel: "Nível",
    localTreino: "Local de treino",
    diasTreino: "Dias de treino",
    duracaoTreino: "Duração do treino",
    estiloDieta: "Estilo da dieta",
  };
  return labels[key] ?? key;
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDateBR(date: Date | null) {
  if (!date) return "—";
  return date.toLocaleDateString("pt-BR");
}

function extractDietPlanFromActiveResponse(data: any): DietPlan | null {
  if (!data) return null;
  if (data?.plan?.meals && Array.isArray(data.plan.meals)) return data.plan as DietPlan;
  if (data?.activePlan?.meals && Array.isArray(data.activePlan.meals)) return data.activePlan as DietPlan;
  if (data?.data?.plan?.meals && Array.isArray(data.data.plan.meals)) return data.data.plan as DietPlan;
  if (data?.meals && Array.isArray(data.meals)) return data as DietPlan;
  return null;
}

function getPlanStartDate(plan: DietPlan | null) {
  if (!plan) return null;
  const raw = plan?.meta?.savedAt || plan?.meta?.generatedAt || plan?.meta?.createdAt || null;
  if (!raw) return null;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export default function NutricaoClient({
  userId,
  fitProfile,
  nutrition,
  progress,
  fitProfileComplete,
  fitProfileMissing,
  plan,
}: Props) {
  const [loadingActive, setLoadingActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [activePlan, setActivePlan] = useState<DietPlan | null>(null);
  const [draftPlan, setDraftPlan] = useState<DietPlan | null>(null);

  const faltando = useMemo(
    () =>
      Object.entries(fitProfileMissing ?? {})
        .filter(([, v]) => v)
        .map(([k]) => prettyLabel(k)),
    [fitProfileMissing]
  );

  const displayedPlan = draftPlan ?? activePlan;
  const hasDraft = !!draftPlan;

  const planStartDate = getPlanStartDate(displayedPlan);
  const planEndDate = planStartDate ? addDays(planStartDate, 30) : null;

  const daysRemaining = useMemo(() => {
    if (!planEndDate) return null;
    const now = new Date();
    const diffMs = planEndDate.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  }, [planEndDate]);

  async function loadActiveDiet() {
    setLoadingActive(true);
    setError("");

    try {
      const res = await fetch("/api/ai/diet-plan/active", {
        method: "GET",
        cache: "no-store",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setActivePlan(null);
        return;
      }

      const extracted = extractDietPlanFromActiveResponse(data);
      setActivePlan(extracted);
    } catch (err) {
      console.error("loadActiveDiet.error", err);
      setActivePlan(null);
    } finally {
      setLoadingActive(false);
    }
  }

  useEffect(() => {
    void loadActiveDiet();
  }, []);

  async function handleGenerateDiet() {
    if (!fitProfileComplete) {
      setError(
        `Complete seu Prontuário FIT antes de gerar a dieta. Campos pendentes: ${
          faltando.length ? faltando.join(", ") : "verifique seus dados"
        }`
      );
      setMessage("");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");
    setDraftPlan(null);

    try {
      const res = await fetch("/api/ai/diet-plan/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

   const data: any = await res.json().catch(() => ({}));

if (!res.ok || !data?.ok) {
  throw new Error(data?.error || "Não foi possível gerar a dieta.");
}

      setDraftPlan({
        ...data.plan,
        meta: {
          ...(data.plan.meta ?? {}),
          generatedAt: new Date().toISOString(),
        },
      });

      setMessage("Dieta gerada com sucesso. Revise e salve para ativar por 30 dias.");
    } catch (err: any) {
      setError(err?.message || "Erro ao gerar dieta.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveDiet() {
    if (!draftPlan) return;

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const payloadPlan = {
        ...draftPlan,
        meta: {
          ...(draftPlan.meta ?? {}),
          savedAt: new Date().toISOString(),
          cycleDays: 30,
        },
      };

      const res = await fetch("/api/ai/diet-plan/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          plan: payloadPlan,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Não foi possível salvar a dieta.");
      }

      setMessage("Dieta salva com sucesso. Esse plano fica ativo por 30 dias.");
      setDraftPlan(null);
      await loadActiveDiet();
    } catch (err: any) {
      setError(err?.message || "Erro ao salvar dieta.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <div className="space-y-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-300">
                Dieta
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                Plano alimentar ativo por 30 dias
              </h1>
              <p className="mt-2 text-sm text-zinc-600 dark:text-slate-400">
                Gere, salve e siga sua dieta por 30 dias. Depois, ajuste conforme evolução, saciedade e rotina.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                Plano atual
              </div>
              <div className="mt-1 font-semibold text-slate-900 dark:text-white">
                {plan ?? "FREE"}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <div className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
              Objetivo
            </div>
            <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
              {fitProfile?.objetivo || "—"}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <div className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
              Estilo
            </div>
            <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
              {fitProfile?.estiloDieta || "—"}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <div className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
              Frequência
            </div>
            <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
              {fitProfile?.diasTreino ? `${fitProfile.diasTreino}x por semana` : "—"}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <div className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
              Local
            </div>
            <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
              {fitProfile?.localTreino || "—"}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Status do ciclo
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-slate-400">
                Sua dieta atual deve ser seguida por 30 dias antes de uma nova revisão completa.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleGenerateDiet}
                disabled={loading || loadingActive}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Gerando dieta..."
                  : activePlan
                    ? "Atualizar dieta"
                    : "Gerar dieta"}
              </button>

              {hasDraft ? (
                <button
                  type="button"
                  onClick={handleSaveDiet}
                  disabled={saving}
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Salvando..." : "Salvar dieta"}
                </button>
              ) : null}
            </div>
          </div>

          {loadingActive ? (
            <p className="mt-4 text-sm text-zinc-500 dark:text-slate-400">
              Carregando dieta ativa...
            </p>
          ) : null}

          {!loadingActive && displayedPlan ? (
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                  Início do ciclo
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                  {formatDateBR(planStartDate)}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                  Fim do ciclo
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                  {formatDateBR(planEndDate)}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                  Dias restantes
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                  {daysRemaining !== null ? `${daysRemaining} dias` : "—"}
                </div>
              </div>
            </div>
          ) : null}

          {message ? (
            <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
              {message}
            </p>
          ) : null}

          {error ? (
            <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">
              {error}
            </p>
          ) : null}
        </section>

        {displayedPlan ? (
          <>
            {hasDraft ? (
              <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900/30 dark:bg-amber-900/10">
                <h3 className="text-base font-semibold text-amber-900 dark:text-amber-200">
                  Prévia gerada
                </h3>
                <p className="mt-2 text-sm text-amber-800 dark:text-amber-300">
                  Revise a dieta abaixo. Ela só vira seu plano ativo de 30 dias depois que você clicar em <strong>Salvar dieta</strong>.
                </p>
              </section>
            ) : null}

            <section className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 dark:border-emerald-900/30 dark:bg-emerald-950/10">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Estratégia alimentar
              </h3>

              <div className="mt-4 grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <div className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                    Calorias
                  </div>
                  <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {displayedPlan.target.calories} kcal
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <div className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                    Proteína
                  </div>
                  <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {displayedPlan.target.protein} g
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <div className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                    Carboidratos
                  </div>
                  <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {displayedPlan.target.carbs} g
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <div className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                    Gorduras
                  </div>
                  <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {displayedPlan.target.fats} g
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Resumo
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-slate-400">
                  {displayedPlan.summary}
                </p>
              </div>
            </section>

            <section className="space-y-4">
              {displayedPlan.meals.map((meal, idx) => (
                <div
                  key={`${meal.mealName}-${idx}`}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                        {meal.timeSuggestion}
                      </div>
                      <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                        {meal.mealName}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
                        {meal.calories} kcal
                      </span>
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
                        P {meal.protein}g
                      </span>
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
                        C {meal.carbs}g
                      </span>
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
                        G {meal.fats}g
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {meal.items.map((item, itemIdx) => (
                      <div
                        key={`${meal.mealName}-${item.name}-${itemIdx}`}
                        className="rounded-2xl border border-zinc-200 p-4 dark:border-slate-800"
                      >
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          {item.name}
                        </div>
                        <div className="mt-1 text-sm text-zinc-600 dark:text-slate-400">
                          {item.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
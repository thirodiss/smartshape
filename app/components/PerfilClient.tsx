"use client";

import { useEffect, useMemo, useState } from "react";

type GoalKey = "perder" | "ganhar" | "manter" | "condicionamento" | "glicemico";
type LevelKey = "beginner" | "intermediate" | "advanced";
type LocationKey = "home" | "gym";
type DaysKey = "2" | "3" | "4" | "5";
type DurationKey = "30" | "45" | "60" | "75";
type DietStyleKey = "pratico" | "equilibrado" | "cozinhar";
type RestrictionKey =
  | "nenhuma"
  | "lactose"
  | "gluten"
  | "vegetariano"
  | "low_carb";
type LimitKey = "joelho" | "ombro" | "coluna";
type SexKey = "masculino" | "feminino" | "outro";
type ShapeKey =
  | "seco_definido"
  | "atletico"
  | "hipertrofia"
  | "emagrecimento"
  | "recomposicao";

type FitProfileApi = {
  fullName?: string | null;
  goal?: string | null;
  shapeGoal?: string | null;
  sex?: string | null;
  age?: number | null;
  heightCm?: number | null;
  currentWeightKg?: number | null;
  targetWeightKg?: number | null;
  level?: string | null;
  location?: string | null;
  trainingDaysPerWeek?: number | null;
  minutesPerSession?: number | null;
  dietStyle?: string | null;
  dietaryRestrictions?: unknown;
  limitations?: unknown;
  observations?: string | null;
};

const objectiveOptions: { value: GoalKey; label: string; desc: string }[] = [
  {
    value: "perder",
    label: "Emagrecimento",
    desc: "Foco em déficit, aderência e consistência.",
  },
  {
    value: "ganhar",
    label: "Ganho de massa",
    desc: "Foco em progressão, recuperação e construção muscular.",
  },
  {
    value: "manter",
    label: "Manutenção",
    desc: "Equilíbrio, rotina e bem-estar no longo prazo.",
  },
  {
    value: "condicionamento",
    label: "Condicionamento",
    desc: "Mais resistência, disposição e preparo físico.",
  },
  {
    value: "glicemico",
    label: "Controle glicêmico",
    desc: "Foco em estabilidade energética e suporte metabólico.",
  },
];

const shapeOptions: { value: ShapeKey; label: string; desc: string }[] = [
  {
    value: "seco_definido",
    label: "Seco e definido",
    desc: "Visual mais seco, com cintura mais enxuta e definição.",
  },
  {
    value: "atletico",
    label: "Atlético",
    desc: "Equilíbrio entre definição, performance e estética.",
  },
  {
    value: "hipertrofia",
    label: "Grande e volumoso",
    desc: "Mais massa muscular, volume e densidade.",
  },
  {
    value: "emagrecimento",
    label: "Emagrecimento",
    desc: "Redução de gordura com foco em leveza e constância.",
  },
  {
    value: "recomposicao",
    label: "Recomposição",
    desc: "Ganhar massa e reduzir gordura ao mesmo tempo.",
  },
];

const sexOptions: { value: SexKey; label: string }[] = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
  { value: "outro", label: "Outro" },
];

const levelOptions: { value: LevelKey; label: string }[] = [
  { value: "beginner", label: "Iniciante" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" },
];

const locationOptions: { value: LocationKey; label: string }[] = [
  { value: "home", label: "Casa" },
  { value: "gym", label: "Academia" },
];

const trainingDaysOptions: { value: DaysKey; label: string; split: string }[] = [
  { value: "2", label: "2x por semana", split: "Dia 1 / Dia 2" },
  { value: "3", label: "3x por semana", split: "Dia 1 / Dia 2 / Dia 3" },
  { value: "4", label: "4x por semana", split: "Dia 1 / Dia 2 / Dia 3 / Dia 4" },
  { value: "5", label: "5x por semana", split: "Dia 1 / Dia 2 / Dia 3 / Dia 4 / Dia 5" },
];

const durationOptions: { value: DurationKey; label: string }[] = [
  { value: "30", label: "30 min" },
  { value: "45", label: "45 min" },
  { value: "60", label: "60 min" },
  { value: "75", label: "75+ min" },
];

const dietStyleOptions: { value: DietStyleKey; label: string }[] = [
  { value: "pratico", label: "Muito prático" },
  { value: "equilibrado", label: "Equilibrado" },
  { value: "cozinhar", label: "Posso cozinhar mais" },
];

const restrictionOptions: { value: RestrictionKey; label: string }[] = [
  { value: "nenhuma", label: "Sem restrição" },
  { value: "lactose", label: "Sem lactose" },
  { value: "gluten", label: "Sem glúten" },
  { value: "vegetariano", label: "Vegetariano" },
  { value: "low_carb", label: "Low carb" },
];

const limitOptions: { value: LimitKey; label: string }[] = [
  { value: "joelho", label: "Joelho" },
  { value: "ombro", label: "Ombro" },
  { value: "coluna", label: "Coluna" },
];

function CardButton({
  active,
  onClick,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition ${
        active
          ? "border-cyan-400 bg-cyan-50 shadow-[0_12px_30px_-18px_rgba(6,182,212,0.55)] dark:border-cyan-400/50 dark:bg-cyan-500/10"
          : "border-zinc-200 bg-white hover:border-cyan-200 hover:bg-cyan-50/40 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-cyan-500/20 dark:hover:bg-slate-800/60"
      }`}
    >
      <div className="text-sm font-semibold text-slate-900 dark:text-white">
        {title}
      </div>
      {subtitle ? (
        <div className="mt-1 text-xs text-zinc-500 dark:text-slate-400">
          {subtitle}
        </div>
      ) : null}
    </button>
  );
}

function SmallChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
        active
          ? "border-cyan-400 bg-cyan-50 text-cyan-700 dark:border-cyan-400/50 dark:bg-cyan-500/10 dark:text-cyan-200"
          : "border-zinc-200 bg-white text-zinc-600 hover:border-cyan-200 hover:bg-cyan-50/40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-500/20 dark:hover:bg-slate-800"
      }`}
    >
      {children}
    </button>
  );
}

function parseNotesFallback(notasApi: string) {
  const lines = notasApi.split("\n").map((line) => line.trim());

  const get = (key: string) =>
    lines
      .find((line) => line.startsWith(`${key}:`))
      ?.split(":")
      .slice(1)
      .join(":")
      .trim();

  const getNumber = (key: string) => {
    const value = get(key);
    if (!value) return null;
    const parsed = Number(String(value).replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  };

  return {
    nivel: get("nivel") as LevelKey | undefined,
    local: get("local") as LocationKey | undefined,
    diasTreino: get("diasTreino") as DaysKey | undefined,
    duracaoTreino: get("duracaoTreino") as DurationKey | undefined,
    estiloDieta: get("estiloDieta") as DietStyleKey | undefined,
    restricaoAlimentar: get("restricaoAlimentar") as RestrictionKey | undefined,
    observacoesLivres: get("observacoes") ?? "",
    sexo: get("sexo") as SexKey | undefined,
    idade: getNumber("idade"),
    alturaCm: getNumber("alturaCm"),
    pesoKg: getNumber("pesoKg"),
    pesoMetaKg: getNumber("pesoMetaKg"),
    shapeObjetivo: get("shapeObjetivo") as ShapeKey | undefined,
    limitacoes:
      get("limitacoes")
        ?.split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .filter((item): item is LimitKey =>
          limitOptions.some((opt) => opt.value === item)
        ) ?? [],
  };
}

function formatBodyValue(value?: number | null, suffix = "") {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `${value}${suffix}`;
}

function isGoalKey(value: string): value is GoalKey {
  return objectiveOptions.some((o) => o.value === value);
}

function isShapeKey(value: string): value is ShapeKey {
  return shapeOptions.some((o) => o.value === value);
}

function isSexKey(value: string): value is SexKey {
  return sexOptions.some((o) => o.value === value);
}

function isLevelKey(value: string): value is LevelKey {
  return levelOptions.some((o) => o.value === value);
}

function isLocationKey(value: string): value is LocationKey {
  return locationOptions.some((o) => o.value === value);
}

function isDaysKey(value: string): value is DaysKey {
  return trainingDaysOptions.some((o) => o.value === value);
}

function isDurationKey(value: string): value is DurationKey {
  return durationOptions.some((o) => o.value === value);
}

function isDietStyleKey(value: string): value is DietStyleKey {
  return dietStyleOptions.some((o) => o.value === value);
}

function isRestrictionKey(value: string): value is RestrictionKey {
  return restrictionOptions.some((o) => o.value === value);
}

function normalizeRestriction(value: string): RestrictionKey {
  if (value === "nenhuma" || value === "sem_restricao") return "nenhuma";
  if (value === "lactose" || value === "sem_lactose") return "lactose";
  if (value === "gluten" || value === "sem_gluten") return "gluten";
  if (value === "vegetariano") return "vegetariano";
  if (value === "low_carb") return "low_carb";
  return "nenhuma";
}

function toLimitacoes(value: unknown): LimitKey[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item).trim())
    .filter((item): item is LimitKey =>
      limitOptions.some((opt) => opt.value === item)
    );
}

export default function PerfilClient() {
  const [nome, setNome] = useState("");
  const [objetivo, setObjetivo] = useState<GoalKey>("manter");
  const [notas, setNotas] = useState("");

  const [shapeObjetivo, setShapeObjetivo] = useState<ShapeKey>("atletico");
  const [sexo, setSexo] = useState<SexKey>("masculino");
  const [idade, setIdade] = useState<number | "">("");
  const [alturaCm, setAlturaCm] = useState<number | "">("");
  const [pesoKg, setPesoKg] = useState<number | "">("");
  const [pesoMetaKg, setPesoMetaKg] = useState<number | "">("");

  const [nivel, setNivel] = useState<LevelKey>("beginner");
  const [local, setLocal] = useState<LocationKey>("gym");
  const [diasTreino, setDiasTreino] = useState<DaysKey>("4");
  const [duracaoTreino, setDuracaoTreino] = useState<DurationKey>("45");
  const [estiloDieta, setEstiloDieta] = useState<DietStyleKey>("equilibrado");
  const [restricaoAlimentar, setRestricaoAlimentar] =
    useState<RestrictionKey>("nenhuma");
  const [limitacoes, setLimitacoes] = useState<LimitKey[]>([]);
  const [observacoesLivres, setObservacoesLivres] = useState("");

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/user/profile", { cache: "no-store" });
        if (!res.ok) return;

        const data = await res.json();
        const user = data?.user ?? {};
        const fitProfile = (data?.fitProfile ?? null) as FitProfileApi | null;

        setNome(String(fitProfile?.fullName ?? user?.name ?? ""));

        const goalValue = String(fitProfile?.goal ?? "manter");
        setObjetivo(isGoalKey(goalValue) ? goalValue : "manter");

        const shapeValue = String(fitProfile?.shapeGoal ?? "atletico");
        setShapeObjetivo(isShapeKey(shapeValue) ? shapeValue : "atletico");

        const sexValue = String(fitProfile?.sex ?? "masculino");
        setSexo(isSexKey(sexValue) ? sexValue : "masculino");

        const levelValue = String(fitProfile?.level ?? "beginner");
        setNivel(isLevelKey(levelValue) ? levelValue : "beginner");

        const locationValue = String(fitProfile?.location ?? "gym");
        setLocal(isLocationKey(locationValue) ? locationValue : "gym");

        const daysValue = String(fitProfile?.trainingDaysPerWeek ?? "4");
        setDiasTreino(isDaysKey(daysValue) ? daysValue : "4");

        const durationValue = String(fitProfile?.minutesPerSession ?? "45");
        setDuracaoTreino(isDurationKey(durationValue) ? durationValue : "45");

        const dietStyleValue = String(fitProfile?.dietStyle ?? "equilibrado");
        setEstiloDieta(
          isDietStyleKey(dietStyleValue) ? dietStyleValue : "equilibrado"
        );

        const restrictionsArray = Array.isArray(fitProfile?.dietaryRestrictions)
          ? fitProfile?.dietaryRestrictions
          : [];
        const firstRestriction = normalizeRestriction(
          String(restrictionsArray[0] ?? "nenhuma")
        );
        setRestricaoAlimentar(firstRestriction);

        setLimitacoes(toLimitacoes(fitProfile?.limitations));
        setObservacoesLivres(String(fitProfile?.observations ?? ""));

        setIdade(
          typeof fitProfile?.age === "number" ? fitProfile.age : ""
        );
        setAlturaCm(
          typeof fitProfile?.heightCm === "number" ? fitProfile.heightCm : ""
        );
        setPesoKg(
          typeof fitProfile?.currentWeightKg === "number"
            ? fitProfile.currentWeightKg
            : ""
        );
        setPesoMetaKg(
          typeof fitProfile?.targetWeightKg === "number"
            ? fitProfile.targetWeightKg
            : ""
        );

        const payloadLines = [
          `nivel:${isLevelKey(levelValue) ? levelValue : "beginner"}`,
          `local:${isLocationKey(locationValue) ? locationValue : "gym"}`,
          `diasTreino:${isDaysKey(daysValue) ? daysValue : "4"}`,
          `duracaoTreino:${isDurationKey(durationValue) ? durationValue : "45"}`,
          `estiloDieta:${isDietStyleKey(dietStyleValue) ? dietStyleValue : "equilibrado"}`,
          `restricaoAlimentar:${firstRestriction}`,
          `limitacoes:${toLimitacoes(fitProfile?.limitations).join(",")}`,
          `observacoes:${String(fitProfile?.observations ?? "").trim()}`,
          `sexo:${isSexKey(sexValue) ? sexValue : "masculino"}`,
          `idade:${typeof fitProfile?.age === "number" ? fitProfile.age : ""}`,
          `alturaCm:${typeof fitProfile?.heightCm === "number" ? fitProfile.heightCm : ""}`,
          `pesoKg:${typeof fitProfile?.currentWeightKg === "number" ? fitProfile.currentWeightKg : ""}`,
          `pesoMetaKg:${typeof fitProfile?.targetWeightKg === "number" ? fitProfile.targetWeightKg : ""}`,
          `shapeObjetivo:${isShapeKey(shapeValue) ? shapeValue : "atletico"}`,
        ];

        setNotas(payloadLines.join("\n"));
      } catch (err) {
        console.error("Erro ao carregar prontuário:", err);
      } finally {
        setLoadingInitial(false);
      }
    }

    void loadProfile();
  }, []);

  function toggleLimitacao(value: LimitKey) {
    setLimitacoes((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  const splitPreview = useMemo(() => {
    if (diasTreino === "2") return "Sua ficha vai ter Dia 1 e Dia 2";
    if (diasTreino === "3") return "Sua ficha vai ter Dia 1, Dia 2 e Dia 3";
    if (diasTreino === "4") return "Sua ficha vai ter Dia 1, Dia 2, Dia 3 e Dia 4";
    return "Sua ficha vai ter Dia 1, Dia 2, Dia 3, Dia 4 e Dia 5";
  }, [diasTreino]);

  const objectivePreview = useMemo(() => {
    if (objetivo === "perder") {
      return "O sistema vai priorizar gasto calórico, aderência e consistência.";
    }
    if (objetivo === "ganhar") {
      return "O sistema vai priorizar progressão de carga, volume e recuperação.";
    }
    if (objetivo === "condicionamento") {
      return "O sistema vai priorizar resistência, preparo e ritmo de treino.";
    }
    if (objetivo === "glicemico") {
      return "O sistema vai priorizar estabilidade energética e rotina controlada.";
    }
    return "O sistema vai priorizar equilíbrio, manutenção e rotina sustentável.";
  }, [objetivo]);

  const imc = useMemo(() => {
    if (typeof alturaCm !== "number" || typeof pesoKg !== "number" || alturaCm <= 0) {
      return null;
    }

    const alturaM = alturaCm / 100;
    const value = pesoKg / (alturaM * alturaM);
    return Number.isFinite(value) ? value.toFixed(1) : null;
  }, [alturaCm, pesoKg]);

  const notesPayload = useMemo(() => {
    const payloadLines = [
      `nivel:${nivel}`,
      `local:${local}`,
      `diasTreino:${diasTreino}`,
      `duracaoTreino:${duracaoTreino}`,
      `estiloDieta:${estiloDieta}`,
      `restricaoAlimentar:${restricaoAlimentar}`,
      `limitacoes:${limitacoes.join(",")}`,
      `observacoes:${observacoesLivres.trim()}`,
      `sexo:${sexo}`,
      `idade:${idade === "" ? "" : idade}`,
      `alturaCm:${alturaCm === "" ? "" : alturaCm}`,
      `pesoKg:${pesoKg === "" ? "" : pesoKg}`,
      `pesoMetaKg:${pesoMetaKg === "" ? "" : pesoMetaKg}`,
      `shapeObjetivo:${shapeObjetivo}`,
    ];

    return payloadLines.join("\n");
  }, [
    nivel,
    local,
    diasTreino,
    duracaoTreino,
    estiloDieta,
    restricaoAlimentar,
    limitacoes,
    observacoesLivres,
    sexo,
    idade,
    alturaCm,
    pesoKg,
    pesoMetaKg,
    shapeObjetivo,
  ]);

  async function salvar() {
    setLoadingSave(true);
    setMessage("");

    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          objetivo,
          shape: shapeObjetivo,
          sexo,
          idade: idade === "" ? null : Number(idade),
          altura: alturaCm === "" ? null : Number(alturaCm),
          pesoAtual: pesoKg === "" ? null : Number(pesoKg),
          pesoMeta: pesoMetaKg === "" ? null : Number(pesoMetaKg),
          nivel,
          localTreino: local,
          diasTreino,
          duracaoTreino,
          estiloDieta,
          restricoes: [restricaoAlimentar],
          limitacoes,
          observacoes: observacoesLivres,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        console.error("SAVE ERROR:", data);
        throw new Error(data?.error || "Não foi possível salvar o prontuário.");
      }

      setNotas(notesPayload);
      setMessage("Prontuário FIT salvo com sucesso ✔");
    } catch (err: any) {
      console.error(err);
      setMessage(err?.message || "Erro ao salvar prontuário.");
    } finally {
      setLoadingSave(false);
    }
  }

  return (
  <div className="space-y-6">
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="bg-gradient-to-r from-[#08122f] via-[#0d2342] to-[#058b63] px-6 py-8 text-white md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#83ffd0]">
              Prontuário FIT
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">
              Base do seu MacroLens
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-white/85 md:text-base">
              Configure objetivo, shape, dados corporais, rotina de treino e
              preferências alimentares. Treino e dieta usam isso como base
              para personalização.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90">
            <div className="font-semibold">Preview da sua estrutura</div>
            <div className="mt-1 text-xs opacity-90">{splitPreview}</div>
          </div>
        </div>
      </div>
    </section>

    {loadingInitial ? (
      <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-6 text-sm text-zinc-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
        Carregando prontuário...
      </div>
    ) : (
      <div className="space-y-6 rounded-[28px] border border-cyan-200/60 bg-white p-6 shadow-[0_24px_60px_-35px_rgba(6,182,212,0.35)] dark:border-cyan-500/15 dark:bg-slate-950">
        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 p-4 dark:border-slate-800">
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
              Nome
            </label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-500/40"
              placeholder="Seu nome"
            />
          </div>

          <div className="rounded-2xl border border-zinc-200 p-4 dark:border-slate-800">
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
              Objetivo principal
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              {objectiveOptions.map((item) => (
                <CardButton
                  key={item.value}
                  active={objetivo === item.value}
                  onClick={() => setObjetivo(item.value)}
                  title={item.label}
                  subtitle={item.desc}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 p-4 dark:border-slate-800">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Shape desejado
            </h2>
            <p className="mt-1 text-xs text-zinc-500 dark:text-slate-400">
              Escolha o modelo corporal que mais combina com seu objetivo.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {shapeOptions.map((item) => (
              <CardButton
                key={item.value}
                active={shapeObjetivo === item.value}
                onClick={() => setShapeObjetivo(item.value)}
                title={item.label}
                subtitle={item.desc}
              />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 p-4 dark:border-slate-800">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Dados corporais
            </h2>
            <p className="mt-1 text-xs text-zinc-500 dark:text-slate-400">
              Esses dados ajudam a calibrar melhor dieta, meta calórica e treino.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                Sexo
              </label>
              <div className="flex flex-wrap gap-2">
                {sexOptions.map((item) => (
                  <SmallChip
                    key={item.value}
                    active={sexo === item.value}
                    onClick={() => setSexo(item.value)}
                  >
                    {item.label}
                  </SmallChip>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                Idade
              </label>
              <input
                type="number"
                min={0}
                value={idade}
                onChange={(e) =>
                  setIdade(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-500/40"
                placeholder="Ex: 28"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                Altura (cm)
              </label>
              <input
                type="number"
                min={0}
                value={alturaCm}
                onChange={(e) =>
                  setAlturaCm(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-500/40"
                placeholder="Ex: 178"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                Peso atual (kg)
              </label>
              <input
                type="number"
                min={0}
                step="0.1"
                value={pesoKg}
                onChange={(e) =>
                  setPesoKg(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-500/40"
                placeholder="Ex: 82.5"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                Peso meta (kg)
              </label>
              <input
                type="number"
                min={0}
                step="0.1"
                value={pesoMetaKg}
                onChange={(e) =>
                  setPesoMetaKg(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-500/40"
                placeholder="Ex: 76"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 p-4 dark:border-slate-800">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Configuração de treino
            </h2>
            <p className="mt-1 text-xs text-zinc-500 dark:text-slate-400">
              Quanto mais guiado, melhor. O sistema organiza sua divisão com base nisso.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                Nível
              </label>
              <div className="flex flex-wrap gap-2">
                {levelOptions.map((item) => (
                  <SmallChip
                    key={item.value}
                    active={nivel === item.value}
                    onClick={() => setNivel(item.value)}
                  >
                    {item.label}
                  </SmallChip>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                Local
              </label>
              <div className="flex flex-wrap gap-2">
                {locationOptions.map((item) => (
                  <SmallChip
                    key={item.value}
                    active={local === item.value}
                    onClick={() => setLocal(item.value)}
                  >
                    {item.label}
                  </SmallChip>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                Frequência semanal
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                {trainingDaysOptions.map((item) => (
                  <CardButton
                    key={item.value}
                    active={diasTreino === item.value}
                    onClick={() => setDiasTreino(item.value)}
                    title={item.label}
                    subtitle={item.split}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
                Duração média por treino
              </label>
              <div className="flex flex-wrap gap-2">
                {durationOptions.map((item) => (
                  <SmallChip
                    key={item.value}
                    active={duracaoTreino === item.value}
                    onClick={() => setDuracaoTreino(item.value)}
                  >
                    {item.label}
                  </SmallChip>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
              Limitações / atenção especial
            </label>
            <div className="flex flex-wrap gap-2">
              {limitOptions.map((item) => (
                <SmallChip
                  key={item.value}
                  active={limitacoes.includes(item.value)}
                  onClick={() => toggleLimitacao(item.value)}
                >
                  {item.label}
                </SmallChip>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 p-4 dark:border-slate-800">
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-slate-400">
            Observações rápidas
          </label>

          <textarea
            value={observacoesLivres}
            onChange={(e) => setObservacoesLivres(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-500/40"
            placeholder="Ex: treino melhor de manhã, prefiro jantar leve, tenho mais fome à noite..."
          />

          <p className="mt-2 text-xs text-zinc-500 dark:text-slate-400">
            Campo opcional. Use para ajustes finos.
          </p>
        </section>

        <section className="rounded-2xl border border-cyan-200 bg-cyan-50/40 p-4 dark:border-cyan-900/40 dark:bg-cyan-950/20">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
            Resumo do seu Prontuário FIT
          </h3>

          <div className="grid gap-4 md:grid-cols-5">
            <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-slate-900">
              <p className="text-xs uppercase text-zinc-400">Objetivo</p>
              <p className="font-medium text-slate-900 dark:text-white">
                {objetivo}
              </p>
            </div>

            <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-slate-900">
              <p className="text-xs uppercase text-zinc-400">Shape</p>
              <p className="font-medium text-slate-900 dark:text-white">
                {shapeObjetivo}
              </p>
            </div>

            <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-slate-900">
              <p className="text-xs uppercase text-zinc-400">Corpo</p>
              <p className="font-medium text-slate-900 dark:text-white">
                {alturaCm} cm • {pesoKg} kg
              </p>
              <p className="text-xs text-zinc-400">
                Meta: {pesoMetaKg || "-"} kg
              </p>
            </div>

            <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-slate-900">
              <p className="text-xs uppercase text-zinc-400">Treino</p>
              <p className="font-medium text-slate-900 dark:text-white">
                {diasTreino} dias / semana
              </p>
              <p className="text-xs text-zinc-400">
                {duracaoTreino} min por sessão
              </p>
            </div>

            <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-slate-900">
              <p className="text-xs uppercase text-zinc-400">Dieta</p>
              <p className="font-medium text-slate-900 dark:text-white">
                {estiloDieta}
              </p>
              <p className="text-xs text-zinc-400">
                {restricaoAlimentar || "Sem restrição"}
              </p>
            </div>
          </div>

          {message && (
            <p className="mt-4 text-sm text-red-500 dark:text-red-400">
              {message}
            </p>
          )}

          <div className="mt-4 flex justify-end">
            <button
              onClick={salvar}
              disabled={loadingSave}
              className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-zinc-200"
            >
              {loadingSave ? "Salvando..." : "Salvar Prontuário FIT"}
            </button>
          </div>
        </section>
      </div>
    )}
  </div>
);
}
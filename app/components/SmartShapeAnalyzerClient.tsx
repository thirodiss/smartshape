"use client";

import {
  useMemo,
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";

type Props = {
  isLogged: boolean;
  plan: string;
  emailVerified: boolean;
};

type Unit = "g" | "kg" | "xicara" | "colher_sopa";

const UNIT_LABEL: Record<Unit, string> = {
  g: "Gramas (g)",
  kg: "Quilos (kg)",
  xicara: "Xícara(s)",
  colher_sopa: "Colher(es) de sopa",
};

const UNIT_TO_GRAMS: Record<Unit, number> = {
  g: 1,
  kg: 1000,
  xicara: 120,
  colher_sopa: 10,
};

type ApiItem = {
  nome: string;
  gramas: number;
  carbo: number;
  prot: number;
  gord: number;
};

type ApiResult = {
  ok?: boolean;
  filename: string;
  size: number;
  items: ApiItem[];
  ig_estimado?: number;
  kcal_total?: number;
  error?: string;
  code?: string;
};

type Item = {
  id: string;
  nome: string;
  quantidade: number;
  unidade: Unit;
  carboPorGrama: number;
  proteinaPorGrama: number;
  gorduraPorGrama: number;
};

type FoodSearchItem = {
  id: string | number;
  name: string;
  canonicalName?: string;
  category?: string | null;
  portionLabel?: string;
  portionGrams: number;
  calories?: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  confidence?: number;
};

type MealItem = {
  nome: string;
  gramas: number;
  carbo: number;
  prot: number;
  gord: number;
};

type QuickProteinKey = "FRANGO" | "CARNE" | "PEIXE" | "OVO";

const QUICK_PROTEINS: Record<
  QuickProteinKey,
  { nome: string; baseGramas: number; carbo: number; prot: number; gord: number }
> = {
  FRANGO: {
    nome: "Peito de frango grelhado",
    baseGramas: 100,
    carbo: 0,
    prot: 25,
    gord: 3,
  },
  CARNE: {
    nome: "Carne bovina magra grelhada",
    baseGramas: 100,
    carbo: 0,
    prot: 26,
    gord: 8,
  },
  PEIXE: {
    nome: "Filé de peixe grelhado",
    baseGramas: 100,
    carbo: 0,
    prot: 24,
    gord: 4,
  },
  OVO: {
    nome: "Ovo cozido",
    baseGramas: 50,
    carbo: 0.5,
    prot: 6,
    gord: 5,
  },
};

function formatNumber(value: number, digits = 1) {
  return Number(value.toFixed(digits));
}

function computeRow(it: Item) {
  const gramas = it.quantidade * UNIT_TO_GRAMS[it.unidade];
  const carbo = gramas * it.carboPorGrama;
  const prot = gramas * it.proteinaPorGrama;
  const gord = gramas * it.gorduraPorGrama;
  const kcal = carbo * 4 + prot * 4 + gord * 9;

  return {
    gramas: Math.round(gramas),
    carbo,
    prot,
    gord,
    kcal,
  };
}

function hasDetectedProtein(items: Item[]) {
  const proteinNames = [
    "frango",
    "carne",
    "bife",
    "peixe",
    "salmão",
    "atum",
    "ovo",
    "porco",
    "lombo",
    "tilápia",
    "filé",
    "patinho",
    "músculo",
    "coxão",
    "alcatra",
  ];

  return items.some((it) => {
    const name = it.nome.toLowerCase();
    return proteinNames.some((term) => name.includes(term));
  });
}

async function compressImage(file: File): Promise<File> {
  try {
    const imageBitmap = await createImageBitmap(file);
    const maxWidth = 1280;
    const scale = Math.min(1, maxWidth / imageBitmap.width);

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(imageBitmap.width * scale);
    canvas.height = Math.round(imageBitmap.height * scale);

    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.72);
    });

    if (!blob) return file;

    return new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch {
    return file;
  }
}

async function persistMealToServer(payload: {
  items: MealItem[];
  kcalTotal: number;
  ig: number | null;
  filename?: string;
}) {
  const response = await fetch("/api/meals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: payload.items,
      kcalTotal: payload.kcalTotal,
      ig: payload.ig,
      filename: payload.filename,
      source: "smartshape_image_analyzer",
      mealItems: payload.items,
      kcal_total: payload.kcalTotal,
      ig_estimado: payload.ig,
      kind: "analysis",
    }),
  });

  const contentType = response.headers.get("content-type") || "";
  const json =
    contentType.includes("application/json")
      ? await response.json().catch(() => ({}))
      : await response.text().catch(() => "");

  if (!response.ok) {
    const message =
      typeof json === "object" && json
        ? (json as any).error || (json as any).message
        : "";

    throw new Error(
      message || `Falha ao salvar refeição no servidor (${response.status}).`
    );
  }

  return json;
}

export default function SmartShapeAnalyzerClient({
  isLogged,
  plan,
  emailVerified,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSavingMeal, setIsSavingMeal] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [serverData, setServerData] = useState<ApiResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<FoodSearchItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [igBase, setIgBase] = useState<number | null>(null);
  const [igLocal, setIgLocal] = useState<number | null>(null);
  const [baseCarbForIg, setBaseCarbForIg] = useState<number | null>(null);

  const totalKcal = useMemo(
    () => items.reduce((acc, it) => acc + computeRow(it).kcal, 0),
    [items]
  );

  const totalCarbs = useMemo(
    () => items.reduce((acc, it) => acc + computeRow(it).carbo, 0),
    [items]
  );

  const totalProtein = useMemo(
    () => items.reduce((acc, it) => acc + computeRow(it).prot, 0),
    [items]
  );

  const totalFat = useMemo(
    () => items.reduce((acc, it) => acc + computeRow(it).gord, 0),
    [items]
  );

  const hasProtein = useMemo(() => hasDetectedProtein(items), [items]);
  const canSend = !!file && !isSubmitting;
  const canConfirm = items.length > 0 && !isSavingMeal;

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null);
    setError(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file || isSubmitting) return;

    setError(null);
    setSubmitting(true);
    setServerData(null);
    setItems([]);
    setIgBase(null);
    setIgLocal(null);
    setBaseCarbForIg(null);

    try {
      const compressed = await compressImage(file);

      const fd = new FormData();
      fd.append("image", compressed);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: fd,
      });

      const contentType = res.headers.get("content-type") || "";
      const json: any = contentType.includes("application/json")
        ? await res.json().catch(() => ({}))
        : { error: await res.text().catch(() => "") };

      if (res.status === 401) {
        window.location.href = `/smartshape/login`;
        return;
      }

      if (res.status === 402 && json?.code === "FREE_LIMIT_REACHED") {
        alert(
          json?.error ||
            "Você atingiu o limite máximo grátis. Para continuar, contrate um plano."
        );
        window.location.href = "/planos";
        return;
      }

      if (res.status === 402 && json?.code === "PLAN_LIMIT_REACHED") {
        alert(
          json?.error ||
            "Você atingiu o limite do seu plano. Faça upgrade para continuar."
        );
        window.location.href = "/planos";
        return;
      }

      if (!res.ok) {
        const msg =
          (json && (json.error || json.message)) ||
          `Falha ao analisar imagem (status ${res.status}).`;
        throw new Error(msg);
      }

      if (json && json.ok === false) {
        throw new Error(json.error || "Falha ao analisar imagem.");
      }

      if (!json || !Array.isArray(json.items)) {
        throw new Error(
          "A resposta da análise não veio no formato esperado. Tente novamente."
        );
      }

      const apiItems: ApiItem[] = json.items.filter(
        (it: any) =>
          it &&
          typeof it.nome === "string" &&
          typeof it.gramas === "number" &&
          typeof it.carbo === "number" &&
          typeof it.prot === "number" &&
          typeof it.gord === "number"
      );

      const apiResult: ApiResult = {
        filename: json.filename ?? compressed.name,
        size: json.size ?? compressed.size,
        items: apiItems,
        ig_estimado:
          typeof json.ig_estimado === "number" ? json.ig_estimado : undefined,
        kcal_total:
          typeof json.kcal_total === "number" ? json.kcal_total : undefined,
        ok: json.ok,
        error: json.error,
        code: json.code,
      };

      setServerData(apiResult);

      if (!apiItems.length) {
        const initialIg =
          typeof json.ig_estimado === "number" ? json.ig_estimado : null;

        setIgBase(initialIg);
        setIgLocal(initialIg);
        setBaseCarbForIg(0);

        throw new Error(
          "A análise foi concluída, mas nenhum alimento foi identificado com segurança. Tente outra foto mais nítida ou adicione manualmente."
        );
      }

      const mapped: Item[] = apiItems.map((it, index) => {
        const g = it.gramas > 0 ? it.gramas : 100;

        return {
          id: `api-${index}-${it.nome}-${Date.now()}`,
          nome: it.nome,
          quantidade: g,
          unidade: "g",
          carboPorGrama: it.carbo / g,
          proteinaPorGrama: it.prot / g,
          gorduraPorGrama: it.gord / g,
        };
      });

      setItems(mapped);

      const baseCarb = apiItems.reduce((acc, it) => acc + (it.carbo ?? 0), 0);
      const initialIg =
        typeof json.ig_estimado === "number" ? json.ig_estimado : null;

      setBaseCarbForIg(baseCarb);
      setIgBase(initialIg);
      setIgLocal(initialIg);
    } catch (err: any) {
      console.error("Erro na análise SmartShape:", err);
      setError(
        err?.message ||
          "Erro inesperado ao analisar a imagem. Tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function addQuickProtein(key: QuickProteinKey) {
    const base = QUICK_PROTEINS[key];

    setItems((prev) => [
      ...prev,
      {
        id: `quick-${key}-${Date.now()}`,
        nome: base.nome,
        quantidade: base.baseGramas,
        unidade: "g",
        carboPorGrama: base.carbo / base.baseGramas,
        proteinaPorGrama: base.prot / base.baseGramas,
        gorduraPorGrama: base.gord / base.baseGramas,
      },
    ]);
  }

  useEffect(() => {
    const term = search.trim();

    if (!term) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        setIsSearching(true);

        const res = await fetch(`/api/foods?q=${encodeURIComponent(term)}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          setResults([]);
          return;
        }

        const data = await res.json();
        const foods = Array.isArray(data) ? data : data.foods ?? [];
        setResults(foods);
      } catch (err: any) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [search]);

  function handleSelectFood(food: FoodSearchItem) {
    const baseGramas = food.portionGrams > 0 ? food.portionGrams : 100;

    setItems((prev) => [
      ...prev,
      {
        id: `food-${food.id}-${Date.now()}`,
        nome: food.name,
        quantidade: baseGramas,
        unidade: "g",
        carboPorGrama: food.carbs / baseGramas,
        proteinaPorGrama: food.protein / baseGramas,
        gorduraPorGrama: food.fat / baseGramas,
      },
    ]);

    setSearch("");
    setResults([]);
    setSearchOpen(false);
  }

  function handleQuantityChange(id: string, value: number) {
    const safeValue = Number.isFinite(value) ? Math.max(0, value) : 0;

    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantidade: safeValue } : it
      )
    );
  }

  function handleUnitChange(id: string, unit: Unit) {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, unidade: unit } : it))
    );
  }

  function handleRemoveItem(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  useEffect(() => {
    if (!items.length || igBase == null || baseCarbForIg == null) return;
    if (baseCarbForIg <= 0) return;

    const totalCarbNow = items.reduce(
      (acc, it) => acc + computeRow(it).carbo,
      0
    );

    const ratio = totalCarbNow / baseCarbForIg;
    const newIg = Math.max(0, Math.min(100, Math.round(igBase * ratio || 0)));
    setIgLocal(newIg);
  }, [items, igBase, baseCarbForIg]);

  async function handleConfirmMeal() {
    if (!items.length) {
      alert("Adicione pelo menos um alimento antes de confirmar.");
      return;
    }

    const rows: MealItem[] = items.map((it) => {
      const r = computeRow(it);

      return {
        nome: it.nome,
        gramas: r.gramas,
        carbo: formatNumber(r.carbo),
        prot: formatNumber(r.prot),
        gord: formatNumber(r.gord),
      };
    });

    const kcalTotal = rows.reduce(
      (acc, r) => acc + (r.carbo * 4 + r.prot * 4 + r.gord * 9),
      0
    );

    setIsSavingMeal(true);

    try {
      await persistMealToServer({
        items: rows,
        kcalTotal: Math.round(kcalTotal),
        ig: igLocal ?? null,
        filename: serverData?.filename,
      });

      alert("Refeição confirmada e salva com sucesso!");
      window.location.href = "/smartshape/painel?refresh=1";
    } catch (err: any) {
      console.error("Erro ao salvar refeição:", err);
      alert(err?.message || "Erro ao salvar refeição.");
    } finally {
      setIsSavingMeal(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-7">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
              Scanner nutricional
            </p>
            <h2 className="mt-3 text-3xl font-black">
              Envie uma imagem para análise real
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
              A engine identifica alimentos, estima porções, calcula macros,
              calorias e índice glicêmico.
            </p>
          </div>

          <span className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-yellow-400">
            Plano {plan || "free"}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-zinc-300">
              Foto da refeição
            </span>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full max-w-xl text-sm text-zinc-300 file:mr-4 file:rounded-full file:border-0 file:bg-yellow-400 file:px-5 file:py-3 file:text-sm file:font-black file:text-black hover:file:bg-yellow-300"
              required
              disabled={isSubmitting}
            />
          </label>

          <button
            type="submit"
            disabled={!canSend}
            className={`rounded-full px-7 py-4 text-sm font-black transition ${
              canSend
                ? "bg-yellow-400 text-black hover:bg-yellow-300"
                : "cursor-not-allowed bg-yellow-400/40 text-black/60"
            }`}
          >
            {isSubmitting ? "Analisando refeição..." : "Enviar para análise"}
          </button>
        </form>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {!isLogged && (
          <div className="mt-6 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-4 text-sm text-yellow-300">
            Você precisa estar logado para usar o scanner.
          </div>
        )}

        {isLogged && !emailVerified && (
          <div className="mt-6 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-4 text-sm text-yellow-300">
            Seu e-mail ainda não foi verificado. Algumas funções podem ficar
            limitadas.
          </div>
        )}
      </section>

      {serverData && items.length > 0 && (
        <section className="grid gap-4 md:grid-cols-4">
          <ResultCard value={String(Math.round(totalKcal))} label="Kcal totais" />
          <ResultCard value={`${formatNumber(totalCarbs)}g`} label="Carboidratos" />
          <ResultCard value={`${formatNumber(totalProtein)}g`} label="Proteínas" />
          <ResultCard value={`${igLocal ?? "-"}`} label="IG estimado" />
        </section>
      )}

      {serverData && items.length > 0 && (
        <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-7">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-black">Composição detectada</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Ajuste quantidades, unidades ou remova alimentos antes de salvar.
              </p>
            </div>

            {serverData.filename && (
              <span className="text-xs text-zinc-500">
                Arquivo: {serverData.filename}
              </span>
            )}
          </div>

          <div className="mt-6 space-y-4">
            {items.map((it) => {
              const row = computeRow(it);

              return (
                <div
                  key={it.id}
                  className="rounded-3xl border border-white/10 bg-black p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h4 className="text-xl font-black">{it.nome}</h4>
                      <p className="mt-1 text-sm text-zinc-500">
                        {row.gramas}g · {formatNumber(row.kcal)} kcal
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(it.id)}
                      className="rounded-full border border-red-500/30 px-4 py-2 text-xs font-black text-red-300 hover:bg-red-500/10"
                    >
                      Remover
                    </button>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-[140px,180px,1fr]">
                    <label>
                      <span className="mb-1 block text-xs font-bold text-zinc-500">
                        Quantidade
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={it.quantidade}
                        onChange={(e) =>
                          handleQuantityChange(
                            it.id,
                            Number(e.target.value.replace(",", "."))
                          )
                        }
                        className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400"
                      />
                    </label>

                    <label>
                      <span className="mb-1 block text-xs font-bold text-zinc-500">
                        Unidade
                      </span>
                      <select
                        value={it.unidade}
                        onChange={(e) =>
                          handleUnitChange(it.id, e.target.value as Unit)
                        }
                        className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400"
                      >
                        {Object.entries(UNIT_LABEL).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <Mini label="Carbo" value={`${formatNumber(row.carbo)}g`} />
                      <Mini label="Prot" value={`${formatNumber(row.prot)}g`} />
                      <Mini label="Gord" value={`${formatNumber(row.gord)}g`} />
                      <Mini label="Kcal" value={`${formatNumber(row.kcal)}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {serverData && items.length > 0 && !hasProtein && (
        <section className="rounded-[2rem] border border-yellow-400/30 bg-yellow-400/10 p-6">
          <h3 className="text-lg font-black text-yellow-300">
            Não encontramos uma proteína clara
          </h3>
          <p className="mt-2 text-sm text-yellow-100/70">
            Adicione rapidamente uma opção para deixar a refeição mais completa.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {(Object.keys(QUICK_PROTEINS) as QuickProteinKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => addQuickProtein(key)}
                className="rounded-full border border-yellow-400/40 bg-black px-4 py-2 text-xs font-black text-yellow-300 hover:bg-yellow-400 hover:text-black"
              >
                + {QUICK_PROTEINS[key].nome}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-black">Adicionar alimento manualmente</h3>
            <p className="mt-1 text-sm text-zinc-500">
              Busque alimentos no catálogo real do MacroLens.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            className="rounded-full border border-white/10 px-5 py-3 text-sm font-black hover:border-yellow-400"
          >
            {searchOpen ? "Fechar" : "+ Adicionar"}
          </button>
        </div>

        {searchOpen && (
          <div className="mt-5">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ex: arroz, feijão, banana..."
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-sm text-white outline-none focus:border-yellow-400"
            />

            {isSearching && (
              <p className="mt-3 text-xs text-zinc-500">Buscando alimentos...</p>
            )}

            {!isSearching && search.trim().length > 2 && results.length === 0 && (
              <p className="mt-3 text-xs text-zinc-500">
                Nenhum alimento encontrado.
              </p>
            )}

            {results.length > 0 && (
              <div className="mt-4 max-h-80 space-y-3 overflow-y-auto pr-1">
                {results.map((food) => (
                  <button
                    key={`${food.id}-${food.name}`}
                    type="button"
                    onClick={() => handleSelectFood(food)}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black px-4 py-4 text-left hover:border-yellow-400"
                  >
                    <div>
                      <p className="font-black">{food.name}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {food.portionLabel ?? "porção padrão"} · base{" "}
                        {food.portionGrams}g
                      </p>
                    </div>

                    <div className="text-right text-xs text-zinc-500">
                      <p>C {food.carbs}g</p>
                      <p>
                        P {food.protein}g · G {food.fat}g
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-white/10 bg-zinc-950 p-6">
        <p className="text-sm text-zinc-500">
          Revise os alimentos antes de salvar no histórico.
        </p>

        <button
          type="button"
          onClick={handleConfirmMeal}
          disabled={!canConfirm}
          className={`rounded-full px-7 py-4 text-sm font-black transition ${
            canConfirm
              ? "bg-yellow-400 text-black hover:bg-yellow-300"
              : "cursor-not-allowed bg-yellow-400/40 text-black/60"
          }`}
        >
          {isSavingMeal ? "Salvando..." : "Confirmar refeição"}
        </button>
      </div>
    </div>
  );
}

function ResultCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
      <p className="text-4xl font-black text-yellow-400">{value}</p>
      <p className="mt-2 text-xs font-black uppercase tracking-widest text-zinc-500">
        {label}
      </p>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-3">
      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}
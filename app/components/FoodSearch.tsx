"use client";

import { useEffect, useState } from "react";
import type { FoodRecord } from "../data/foods";

type Props = {
  onSelect: (food: FoodRecord) => void;
  onCancel: () => void;
};

type ApiFoodItem = {
  id?: string;
  name?: string;
  canonicalName?: string;
  portionLabel?: string;
  portionGrams?: number;
  baseGrams?: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
};

type ApiFoodsResponse =
  | ApiFoodItem[]
  | {
      foods?: ApiFoodItem[];
      items?: ApiFoodItem[];
      results?: ApiFoodItem[];
    };

function toNumber(value: unknown, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function normalizeFood(item: ApiFoodItem, index: number): FoodRecord {
  return {
    id: String(item.id ?? `food-${index + 1}`),
    name: String(item.name ?? item.canonicalName ?? "Alimento"),
    baseGrams: toNumber(item.baseGrams ?? item.portionGrams, 100),
    carbs: toNumber(item.carbs, 0),
    protein: toNumber(item.protein, 0),
    fat: toNumber(item.fat, 0),
  } as FoodRecord;
}

function extractFoods(payload: ApiFoodsResponse): FoodRecord[] {
  const list = Array.isArray(payload)
    ? payload
    : payload.foods ?? payload.items ?? payload.results ?? [];

  return list.map(normalizeFood);
}

export default function FoodSearch({ onSelect, onCancel }: Props) {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<FoodRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const normalizedTerm = term.trim();

    if (normalizedTerm.length < 2) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/foods?q=${encodeURIComponent(normalizedTerm)}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || "Falha ao buscar alimentos.");
        }

        const json = (await res.json()) as ApiFoodsResponse;
        const normalizedResults = extractFoods(json);

        setResults(normalizedResults);
      } catch (err: unknown) {
        const error = err as { name?: string; message?: string };

        if (error?.name === "AbortError") return;

        setResults([]);
        setError(error?.message ?? "Erro ao buscar alimentos.");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [term]);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm">
      <div className="flex items-center gap-2">
        <span className="font-medium">Novo alimento:</span>

        <input
          autoFocus
          type="text"
          placeholder="Digite o alimento (ex: pão, frango, chiclete)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-zinc-300 px-3 py-1 text-xs"
        >
          Cancelar
        </button>
      </div>

      {loading && (
        <div className="text-xs text-zinc-500">Buscando alimentos…</div>
      )}

      {error && (
        <div className="text-xs text-red-600">{error}</div>
      )}

      {!loading && !error && term.trim().length >= 2 && results.length === 0 && (
        <div className="text-xs text-zinc-500">
          Nenhum alimento encontrado para <strong>{term.trim()}</strong>.
        </div>
      )}

      {results.length > 0 && (
        <div className="max-h-52 overflow-y-auto rounded-lg border border-zinc-200 bg-white">
          {results.map((food) => (
            <button
              key={food.id}
              type="button"
              onClick={() => onSelect(food)}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-emerald-50"
            >
              <span>{food.name}</span>

              <span className="text-[11px] text-zinc-500">
                base: {food.baseGrams} g • C {food.carbs}g • P {food.protein}g • G {food.fat}g
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
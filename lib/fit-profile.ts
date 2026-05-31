export type RawFitProfile = Record<string, any> | null | undefined

export type NormalizedFitProfile = {
  objetivo: string
  nivel: string
  localTreino: string
  diasTreino: number
  duracaoTreino: number
  estiloDieta: string
  restricoes: string[]
  limitacoes: string[]
  observacoes: string
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? "").trim()).filter(Boolean)
  }

  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim()).filter(Boolean)
  }

  return []
}

function toNumber(value: unknown, fallback = 0): number {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

function pickString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim()
  }
  return ""
}

export function normalizeFitProfile(profile: RawFitProfile): NormalizedFitProfile {
  const p = profile ?? {}

  return {
    objetivo: pickString(p.goal, p.objetivo, p.objective, p.meta),
    nivel: pickString(p.level, p.nivel),
    localTreino: pickString(p.location, p.localTreino, p.trainingLocation),
    diasTreino: toNumber(p.trainingDaysPerWeek ?? p.diasTreino ?? p.trainingDays, 0),
    duracaoTreino: toNumber(p.minutesPerSession ?? p.duracaoTreino ?? p.sessionDuration, 0),
    estiloDieta: pickString(p.dietStyle, p.estiloDieta, p.dieta),
    restricoes: toArray(p.dietaryRestrictions ?? p.restricoes ?? p.foodRestrictions),
    limitacoes: toArray(p.limitations ?? p.limitacoes ?? p.injuries),
    observacoes: pickString(p.observations, p.observacoes, p.notes),
  }
}

export function isFitProfileComplete(profile: RawFitProfile) {
  const normalized = normalizeFitProfile(profile)

  const complete =
    !!normalized.objetivo &&
    !!normalized.nivel &&
    !!normalized.localTreino &&
    normalized.diasTreino > 0 &&
    normalized.duracaoTreino > 0 &&
    !!normalized.estiloDieta

  return {
    complete,
    normalized,
    missing: {
      objetivo: !normalized.objetivo,
      nivel: !normalized.nivel,
      localTreino: !normalized.localTreino,
      diasTreino: normalized.diasTreino <= 0,
      duracaoTreino: normalized.duracaoTreino <= 0,
      estiloDieta: !normalized.estiloDieta,
    },
  }
}
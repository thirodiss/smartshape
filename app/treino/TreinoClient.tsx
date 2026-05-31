"use client";

import { useEffect, useState } from "react";
import {
  PlayCircle,
  PauseCircle,
  TimerReset,
  Flame,
  Trophy,
} from "lucide-react";

type Exercise = {
  order: number;
  name: string;
  muscleGroup: string;
  sets: string;
  reps: string;
  restSeconds: number;
  notes?: string[];
};

type Props = {
  userId: string;
  fitProfile: any;
  nutrition: any;
  progress: any;
  fitProfileComplete: boolean;
  fitProfileMissing?: Record<string, boolean>;
  plan?: string;
};

export default function TreinoClient({
  fitProfileComplete,
  fitProfileMissing,
}: Props) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [rest, setRest] = useState(0);
  const [running, setRunning] = useState(false);

  // MOCK inicial (até integrar 100% com API)
  useEffect(() => {
    setExercises([
      {
        order: 1,
        name: "Supino reto com barra",
        muscleGroup: "Peito",
        sets: "3-4",
        reps: "8-12",
        restSeconds: 60,
        notes: ["Controle a descida", "Postura firme"],
      },
      {
        order: 2,
        name: "Supino inclinado halteres",
        muscleGroup: "Peito",
        sets: "3-4",
        reps: "8-12",
        restSeconds: 60,
      },
      {
        order: 3,
        name: "Tríceps pulley",
        muscleGroup: "Tríceps",
        sets: "3-4",
        reps: "10-12",
        restSeconds: 60,
      },
    ]);
  }, []);

  useEffect(() => {
    let interval: any;
    if (running && rest > 0) {
      interval = setInterval(() => {
        setRest((r) => r - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, rest]);

  function startWorkout() {
    if (!fitProfileComplete) {
      const faltando = Object.entries(fitProfileMissing ?? {})
        .filter(([, v]) => v)
        .map(([k]) => k);

      alert(
        `Complete seu Prontuário FIT antes de treinar.\n\nFaltando: ${faltando.join(
          ", "
        )}`
      );
      return;
    }

    setStarted(true);
  }

  function finishExercise(index: number) {
    setDone((prev) => [...prev, index]);

    const next = index + 1;
    if (next < exercises.length) {
      setCurrentIndex(next);
      setRest(exercises[index].restSeconds);
      setRunning(true);
    } else {
      setStarted(false);
      alert("Treino finalizado 🔥");
    }
  }

  function toggleTimer() {
    setRunning((r) => !r);
  }

  function resetTimer() {
    setRest(0);
    setRunning(false);
  }

  const progress =
    exercises.length > 0 ? (done.length / exercises.length) * 100 : 0;

  return (
    <div className="space-y-6 p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Treino do dia</h1>
        <div className="text-sm text-gray-500">
          <Flame className="inline mr-1" size={16} />
          {done.length} / {exercises.length}
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-green-500 h-3 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* START */}
      {!started && (
        <button
          onClick={startWorkout}
          className="w-full bg-black text-white rounded-xl py-3 font-semibold"
        >
          Iniciar treino
        </button>
      )}

      {/* EXERCISES */}
      {started && (
        <div className="space-y-4">
          {exercises.map((ex, i) => {
            const active = i === currentIndex;
            const finished = done.includes(i);

            return (
              <div
                key={i}
                className={`rounded-2xl border p-4 transition ${
                  active
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200"
                } ${finished ? "opacity-40" : ""}`}
              >
                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      {ex.muscleGroup}
                    </p>
                    <h3 className="font-semibold">{ex.name}</h3>
                  </div>

                  <div className="flex gap-2 text-xs">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {ex.sets} séries
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {ex.reps} reps
                    </span>
                  </div>
                </div>

                {/* NOTES */}
                {ex.notes && (
                  <ul className="mt-2 text-sm text-gray-600">
                    {ex.notes.map((n, idx) => (
                      <li key={idx}>• {n}</li>
                    ))}
                  </ul>
                )}

                {/* ACTION */}
                {active && !finished && (
                  <button
                    onClick={() => finishExercise(i)}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl"
                  >
                    Finalizar exercício
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TIMER */}
      {started && rest > 0 && (
        <div className="fixed bottom-4 left-4 right-4 bg-black text-white rounded-xl p-4 flex items-center justify-between">
          <span className="text-lg font-bold">
            Descanso: {rest}s
          </span>

          <div className="flex gap-3">
            <button onClick={toggleTimer}>
              {running ? <PauseCircle /> : <PlayCircle />}
            </button>

            <button onClick={resetTimer}>
              <TimerReset />
            </button>
          </div> 
        </div> 
      )} 
    </div> 
  ); 
} 
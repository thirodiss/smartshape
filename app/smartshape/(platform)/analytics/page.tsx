export default function SmartShapeAnalyticsPage() {
  const bars = [42, 58, 51, 74, 69, 82, 91];

  return (
    <section className="space-y-6 text-white">
      <div className="rounded-[2rem] border border-white/10 bg-zinc-950 p-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-400">
          Analytics
        </p>
        <h1 className="mt-4 text-5xl font-black">Inteligência da rede</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Dados consolidados de uso, refeição, treino, nutrição e risco de
          evasão para decisões estratégicas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Kpi value="82%" label="aderência semanal" />
        <Kpi value="18%" label="risco médio" />
        <Kpi value="64%" label="uso do app" />
        <Kpi value="+21%" label="evolução mensal" />
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-zinc-950 p-7">
        <h2 className="text-3xl font-black">Engajamento semanal</h2>
        <div className="mt-8 flex h-72 items-end gap-4 rounded-3xl bg-black p-6">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-3">
              <div className="w-full rounded-t-2xl bg-yellow-400" style={{ height: `${h}%` }} />
              <span className="text-xs font-bold text-zinc-600">
                {["S", "T", "Q", "Q", "S", "S", "D"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Kpi({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
      <p className="text-4xl font-black text-yellow-400">{value}</p>
      <p className="mt-2 text-xs font-black uppercase tracking-widest text-zinc-500">{label}</p>
    </div>
  );
}
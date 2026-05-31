const units = [
  ["Unidade Paulista", "92%", "+18%", "Baixo"],
  ["Unidade Moema", "87%", "+12%", "Médio"],
  ["Unidade Centro", "79%", "+8%", "Médio"],
  ["Unidade ABC", "94%", "+24%", "Baixo"],
];

export default function SmartShapeUnidadesPage() {
  return (
    <section className="space-y-6 text-white">
      <div className="rounded-[2rem] border border-white/10 bg-zinc-950 p-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-400">
          Unidades
        </p>
        <h1 className="mt-4 text-5xl font-black">Performance por unidade</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Compare retenção, engajamento, risco de evasão e uso do SmartShape
          entre unidades da rede.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {units.map(([unit, retention, growth, risk]) => (
          <div key={unit} className="rounded-[2rem] border border-white/10 bg-zinc-950 p-6">
            <h2 className="text-xl font-black">{unit}</h2>
            <p className="mt-5 text-4xl font-black text-yellow-400">{retention}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-zinc-500">
              retenção
            </p>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-zinc-400">Crescimento</span>
              <span className="font-black text-green-400">{growth}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-zinc-400">Risco</span>
              <span className="font-black text-yellow-400">{risk}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
import SmartShapeChart from "./SmartShapeChart";

export default function SmartShapeEnterpriseHero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#facc15_0%,transparent_40%)] opacity-20" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-5 py-2 text-sm font-semibold text-yellow-400">
            Powered by MacroLens
          </div>

          <h1 className="max-w-3xl text-6xl font-black leading-none tracking-tight md:text-7xl">
            Inteligência fitness para redes que querem{" "}
            <span className="text-yellow-400">reter mais.</span>
          </h1>

          <p className="mt-8 max-w-xl text-xl leading-relaxed text-zinc-400">
            Treino, nutrição, análise alimentar por foto e analytics em uma
            única plataforma inteligente.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-full bg-yellow-400 px-8 py-4 font-bold text-black transition hover:scale-105">
              Entrar na plataforma
            </button>

            <button className="rounded-full border border-zinc-700 px-8 py-4 font-bold text-white transition hover:border-yellow-400">
              Ver demonstração
            </button>
          </div>
        </div>

        <div>
          <SmartShapeChart title="Dashboard IA" />
        </div>
      </div>
    </section>
  );
}
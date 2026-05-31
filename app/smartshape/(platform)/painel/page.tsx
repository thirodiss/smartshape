import SmartShapeMetric from "@/app/components/SmartShapeMetric";
import SmartShapeCard from "@/app/components/SmartShapeCard";
import SmartShapeRetentionCard from "@/app/components/SmartShapeRetentionCard";

export default function SmartShapePainelPage() {
  return (
    <>
      <SmartShapeRetentionCard
        score={78}
        title="Risco alto de evasão"
        description="O aluno apresentou queda de treino, menor frequência e baixa interação alimentar nos últimos dias."
      />

      <section className="mt-6 rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-yellow-950/20 p-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-400">
          Dashboard Enterprise
        </p>

        <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-white">
              Painel SmartShape
            </h1>

            <p className="mt-4 max-w-2xl text-zinc-400">
              Visão inteligente de retenção, engajamento, análise alimentar,
              treino e nutrição dos alunos.
            </p>
          </div>

          <a
            href="/smartshape/analisar"
            className="rounded-full bg-yellow-400 px-7 py-4 text-sm font-black text-black hover:bg-yellow-300"
          >
            Analisar refeição
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <SmartShapeMetric value="+32%" label="Retenção" />
          <SmartShapeMetric value="+41%" label="Engajamento" />
          <SmartShapeMetric value="-18%" label="Risco de evasão" />
          <SmartShapeMetric value="4,9/5" label="Satisfação" />
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <SmartShapeCard
          icon="📸"
          title="Análise alimentar"
          subtitle="Computer Vision Nutrition"
          text="Foto da refeição com calorias, macros, índice glicêmico e insights automáticos."
          href="/smartshape/analisar"
        />

        <SmartShapeCard
          icon="🏋️"
          title="Treino inteligente"
          subtitle="Adaptive Training"
          text="Plano de treino por objetivo, nível, frequência e evolução do aluno."
          href="/smartshape/treino"
        />

        <SmartShapeCard
          icon="🥗"
          title="Nutrição personalizada"
          subtitle="AI Nutrition Engine"
          text="Plano alimentar conectado ao prontuário fitness e comportamento diário."
          href="/smartshape/nutricao"
        />
      </section>
    </>
  );
}
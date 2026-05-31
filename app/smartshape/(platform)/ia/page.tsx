export default function SmartShapeIAPage() {
  return (
    <section className="space-y-6 text-white">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-yellow-950/20 p-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-400">
          Inteligência IA
        </p>
        <h1 className="mt-4 text-5xl font-black">Central de decisões inteligentes</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          A IA cruza treino, nutrição, frequência e comportamento para gerar
          alertas e recomendações.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Insight title="Risco de evasão" text="Alunos com queda de frequência e baixa interação entram em alerta automaticamente." />
        <Insight title="Nutrição crítica" text="Detecta baixa proteína, excesso calórico e padrões de alto índice glicêmico." />
        <Insight title="Treino parado" text="Identifica falta de progressão e sugere ajustes de carga ou divisão." />
      </div>
    </section>
  );
}

function Insight({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-zinc-950 p-7">
      <div className="mb-6 h-12 w-12 rounded-2xl bg-yellow-400" />
      <h2 className="text-2xl font-black">{title}</h2>
      <p className="mt-3 leading-relaxed text-zinc-400">{text}</p>
    </div>
  );
}
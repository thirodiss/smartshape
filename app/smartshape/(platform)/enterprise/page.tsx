export default function SmartShapeEnterprisePage() {
  return (
    <section className="space-y-6 text-white">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-yellow-950/20 p-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-400">
          Visão executiva
        </p>
        <h1 className="mt-4 text-5xl font-black">SmartShape Enterprise OS</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Painel executivo para redes fitness acompanharem retenção,
          engajamento, performance dos alunos e oportunidades de crescimento.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <Kpi value="+300 mil" label="alunos impactados" />
          <Kpi value="+250" label="unidades conectadas" />
          <Kpi value="+32%" label="retenção média" />
          <Kpi value="4,9/5" label="satisfação" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Retenção" text="Identifique alunos com queda de frequência, baixa interação e risco de cancelamento." />
        <Card title="Engajamento" text="Monitore uso do app, refeições analisadas, treinos concluídos e evolução." />
        <Card title="Receita" text="Use dados para aumentar permanência, upsell e relacionamento com o aluno." />
      </div>
    </section>
  );
}

function Kpi({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <p className="text-4xl font-black text-yellow-400">{value}</p>
      <p className="mt-2 text-xs font-black uppercase tracking-widest text-zinc-500">{label}</p>
    </div>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-zinc-950 p-7">
      <div className="mb-6 h-12 w-12 rounded-2xl bg-yellow-400" />
      <h2 className="text-2xl font-black">{title}</h2>
      <p className="mt-3 leading-relaxed text-zinc-400">{text}</p>
    </div>
  );
}
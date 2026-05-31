const students = [
  ["Matheus Lima", "Alto", "3 dias sem treino", "72%"],
  ["Ana Souza", "Médio", "baixa proteína", "58%"],
  ["Rafael Gomes", "Baixo", "evolução constante", "18%"],
  ["Camila Rocha", "Médio", "queda de engajamento", "44%"],
];

export default function SmartShapeAlunosPage() {
  return (
    <section className="space-y-6 text-white">
      <div className="rounded-[2rem] border border-white/10 bg-zinc-950 p-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-400">
          Alunos
        </p>
        <h1 className="mt-4 text-5xl font-black">Gestão inteligente de alunos</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Monitore risco de evasão, evolução, rotina alimentar e comportamento
          fitness dos alunos.
        </p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-black text-zinc-500">
            <tr>
              <th className="px-6 py-4">Aluno</th>
              <th className="px-6 py-4">Risco</th>
              <th className="px-6 py-4">Motivo</th>
              <th className="px-6 py-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {students.map(([name, risk, reason, score]) => (
              <tr key={name} className="border-b border-white/5">
                <td className="px-6 py-5 font-black">{name}</td>
                <td className="px-6 py-5">
                  <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-black">
                    {risk}
                  </span>
                </td>
                <td className="px-6 py-5 text-zinc-400">{reason}</td>
                <td className="px-6 py-5 font-black text-yellow-400">{score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
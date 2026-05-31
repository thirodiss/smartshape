const students = [
  {
    name: "Lucas Martins",
    status: "Ativo",
    performance: "92%",
  },
  {
    name: "Amanda Souza",
    status: "Ativo",
    performance: "88%",
  },
  {
    name: "Carlos Henrique",
    status: "Risco",
    performance: "51%",
  },
  {
    name: "Fernanda Lima",
    status: "Ativo",
    performance: "95%",
  },
];

export default function SmartShapeStudentsTable() {
  return (
    <div className="rounded-4xl border border-yellow-500/10 bg-[#0d0d0d] p-6">
      <div className="mb-6">
        <p className="text-sm text-zinc-500">Alunos</p>
        <h3 className="text-xl font-bold text-white">
          Performance da base
        </h3>
      </div>

      <div className="overflow-hidden rounded-3xl border border-zinc-800">
        <table className="w-full">
          <thead className="bg-black">
            <tr>
              <th className="px-4 py-4 text-left text-sm text-zinc-400">
                Nome
              </th>

              <th className="px-4 py-4 text-left text-sm text-zinc-400">
                Status
              </th>

              <th className="px-4 py-4 text-left text-sm text-zinc-400">
                Performance
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.name}
                className="border-t border-zinc-800"
              >
                <td className="px-4 py-4 font-medium text-white">
                  {student.name}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      student.status === "Ativo"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>

                <td className="px-4 py-4 text-yellow-400">
                  {student.performance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
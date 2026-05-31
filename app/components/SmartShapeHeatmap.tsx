export default function SmartShapeHeatmap() {
  const items = Array.from({ length: 35 });

  return (
    <div className="rounded-4xl border border-yellow-500/10 bg-[#0d0d0d] p-6">
      <div className="mb-6">
        <p className="text-sm text-zinc-500">Frequência</p>
        <h3 className="text-xl font-bold text-white">
          Heatmap de atividade
        </h3>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {items.map((_, index) => (
          <div
            key={index}
            className={`aspect-square rounded-xl ${
              index % 4 === 0
                ? "bg-yellow-400"
                : index % 3 === 0
                  ? "bg-yellow-500/50"
                  : "bg-zinc-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
"use client";

type Props = {
  title?: string;
};

export default function SmartShapeChart({
  title = "Evolução semanal",
}: Props) {
  const bars = [45, 72, 58, 91, 67, 84, 96];

  return (
    <div className="rounded-4xl border border-yellow-500/10 bg-[#0b0b0b] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">Analytics</p>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>

        <div className="rounded-full bg-yellow-400 px-4 py-1 text-xs font-bold text-black">
          LIVE
        </div>
      </div>

      <div className="flex h-64 items-end gap-4">
        {bars.map((value, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-3xl bg-yellow-400 transition-all duration-300 hover:opacity-80"
            style={{
              height: `${value}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
type Props = {
  score: number;
  title: string;
  description: string;
};

export default function SmartShapeRetentionCard({
  score,
  title,
  description,
}: Props) {
  const color =
    score >= 75
      ? "from-red-500/20 to-red-500/5 border-red-400/20"
      : score >= 45
      ? "from-yellow-500/20 to-yellow-500/5 border-yellow-400/20"
      : "from-green-500/20 to-green-500/5 border-green-400/20";

  return (
    <div
      className={`
        relative overflow-hidden
        rounded-[2rem]
        border
        bg-gradient-to-br
        ${color}
        p-8
        backdrop-blur-xl
      `}
    >
      <div
        className="
          absolute right-[-40px] top-[-40px]
          h-48 w-48 rounded-full
          bg-white/5 blur-3xl
        "
      />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-zinc-400">
            SmartShape Retention AI
          </p>

          <h2 className="mt-4 text-4xl font-black text-white">
            {title}
          </h2>

          <p className="mt-4 max-w-2xl leading-relaxed text-zinc-300">
            {description}
          </p>
        </div>

        <div
          className="
            flex h-36 w-36 items-center justify-center
            rounded-full
            border-[10px] border-white/10
            bg-black/40
            text-5xl font-black text-white
            shadow-[0_0_40px_rgba(255,255,255,0.06)]
          "
        >
          {score}
        </div>
      </div>
    </div>
  );
}
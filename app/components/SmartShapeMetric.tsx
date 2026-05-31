type Props = {
  value: string;
  label: string;
};

export default function SmartShapeMetric({
  value,
  label,
}: Props) {
  return (
    <div
      className="
        group
        relative overflow-hidden
        rounded-[2rem]
        border border-white/10
        bg-zinc-950/80
        backdrop-blur-xl
        p-6
        transition-all
        hover:-translate-y-1
        hover:border-yellow-400/30
      "
    >
      <div
        className="
          absolute inset-0 opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
          bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.12),transparent_60%)]
        "
      />

      <div className="relative z-10">
        <p
          className="
            text-5xl font-black
            tracking-tight
            text-white
          "
        >
          {value}
        </p>

        <p
          className="
            mt-3
            text-xs font-black uppercase
            tracking-[0.25em]
            text-zinc-500
          "
        >
          {label}
        </p>
      </div>
    </div>
  );
}
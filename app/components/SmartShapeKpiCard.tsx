type Props = {
  title: string;
  value: string;
  subtitle?: string;
};

export default function SmartShapeKpiCard({
  title,
  value,
  subtitle,
}: Props) {
  return (
    <div className="rounded-4xl border border-yellow-500/10 bg-[#0d0d0d] p-6">
      <p className="text-sm text-zinc-500">{title}</p>

      <h3 className="mt-3 text-4xl font-black text-yellow-400">
        {value}
      </h3>

      {subtitle && (
        <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
      )}
    </div>
  );
}
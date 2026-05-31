type Props = {
  title: string;
  subtitle?: string;
  text: string;
  href?: string;
  icon?: string;
};

export default function SmartShapeCard({
  title,
  subtitle,
  text,
  href,
  icon = "⚡",
}: Props) {
  const content = (
    <div className="group h-full rounded-[2rem] border border-white/10 bg-zinc-950 p-7 text-white transition hover:border-yellow-400">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-2xl shadow-[0_0_30px_rgba(250,204,21,0.25)] transition group-hover:scale-110">
        {icon}
      </div>

      {subtitle && (
        <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-400">
          {subtitle}
        </p>
      )}

      <h2 className="mt-3 text-2xl font-black text-white">{title}</h2>

      <p className="mt-3 leading-relaxed text-zinc-400">{text}</p>

      {href && <p className="mt-6 text-sm font-black text-white">Acessar módulo →</p>}
    </div>
  );

  if (href) return <a href={href}>{content}</a>;

  return content;
}
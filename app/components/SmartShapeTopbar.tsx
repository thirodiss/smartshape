export default function SmartShapeTopbar() {
  return (
    <header
      className="
        sticky top-0 z-40
        border-b border-white/10
        bg-black/70
        backdrop-blur-2xl
      "
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-lg font-black text-white">
            SmartShape Enterprise
          </h2>

          <p className="text-xs text-zinc-500">
            AI Retention Operating System
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="
              hidden md:flex
              items-center gap-2
              rounded-full
              border border-yellow-400/20
              bg-yellow-400/10
              px-4 py-2
              text-xs font-black text-yellow-300
            "
          >
            <span className="h-2 w-2 rounded-full bg-green-400" />
            IA ativa
          </div>

          <div
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full
              bg-gradient-to-br
              from-yellow-300
              to-yellow-500
              text-sm font-black text-black
              shadow-[0_0_30px_rgba(250,204,21,0.35)]
            "
          >
            S
          </div>
        </div>
      </div>
    </header>
  );
}
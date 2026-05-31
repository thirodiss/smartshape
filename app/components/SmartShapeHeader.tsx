export default function SmartShapeHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/smartshape" className="text-2xl font-black">
          Smart<span className="text-yellow-400">Shape</span>
        </a>

        <nav className="hidden gap-6 text-base font-bold text-zinc-400 md:flex">
          <a href="/smartshape/painel" className="hover:text-white">
            Painel
          </a>

          <a href="/smartshape/analisar" className="hover:text-white">
            Analisar refeição
          </a>

          <a href="/smartshape/treino" className="hover:text-white">
            Treino
          </a>

          <a href="/smartshape/nutricao" className="hover:text-white">
            Nutrição
          </a>

          <a href="/smartshape/perfil" className="hover:text-white">
            Perfil
          </a>
        </nav>

        <a
          href="/smartshape/login"
          className="rounded-full bg-yellow-400 px-5 py-3 text-sm font-black text-black hover:bg-yellow-300"
        >
          Entrar
        </a>
      </div>
    </header>
  );
}
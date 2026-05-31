import {
  Camera,
  CheckCircle2,
  Play,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="/" className="text-2xl font-black tracking-tight">
            Smart<span className="text-yellow-400">Shape</span>
          </a>

          <nav className="hidden items-center gap-10 text-sm font-semibold text-zinc-300 lg:flex">
            <a href="#analisar" className="transition hover:text-yellow-400">
              Analisar refeição
            </a>
            <a href="#painel" className="transition hover:text-yellow-400">
              Painel
            </a>
            <a href="#planos" className="transition hover:text-yellow-400">
              Planos
            </a>
            <a href="#contato" className="transition hover:text-yellow-400">
              Contato
            </a>
          </nav>

          <a
            href="/smartshape/login"
            className="rounded-full border border-yellow-400/40 px-7 py-3 text-sm font-black text-white transition hover:bg-yellow-400 hover:text-black"
          >
            Entrar
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_78%_28%,rgba(250,204,21,0.28),transparent_30%),linear-gradient(135deg,#050505_0%,#090909_40%,#171100_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute right-[-120px] top-[40px] h-[760px] w-[760px] rounded-full border border-yellow-400/20" />
        <div className="absolute right-[-40px] top-[120px] h-[600px] w-[600px] rounded-full border border-yellow-400/10" />

        <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-16 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
              <Sparkles size={14} />
              IA Fitness e Nutrição
            </div>

            <h1 className="max-w-2xl text-[52px] font-black leading-[0.95] tracking-[-0.06em] md:text-[74px]">
              Inteligência fitness para quem busca{" "}
              <span className="text-yellow-400">resultados reais.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-9 text-zinc-300">
              Analise refeições por foto, acompanhe calorias, macros, treinos e
              evolução com IA que entende seu objetivo e entrega insights
              práticos.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/smartshape/analisar"
                className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-4 text-sm font-black text-black shadow-[0_20px_60px_rgba(250,204,21,0.28)] transition hover:bg-yellow-300"
              >
                Analisar refeição agora
                <Camera size={18} />
              </a>

              <a
                href="#analisar"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-black transition hover:border-yellow-400 hover:text-yellow-400"
              >
                <Play size={16} />
                Ver como funciona
              </a>
            </div>
          </div>

          <div className="relative flex min-h-[720px] items-center justify-center">
            <img
              src="/hero-smartshape-ui.png"
              alt="SmartShape app"
              className="relative z-10 w-full max-w-[860px]"
            />
          </div>
        </div>
      </section>

      <section id="analisar" className="bg-white px-6 py-24 text-black">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-500">
              Análise alimentar por IA
            </p>

            <h2 className="mt-4 text-5xl font-black leading-tight tracking-[-0.04em]">
              Tire uma foto.
              <br />
              Receba <span className="text-yellow-500">insights.</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
              Nossa IA identifica os alimentos, calcula macros, calorias e
              índice glicêmico em segundos.
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <img
              src="/hero-smartshape-ui.png"
              alt="Análise alimentar SmartShape"
              className="w-full max-w-[980px]"
            />
          </div>
        </div>
      </section>

      <section
        id="painel"
        className="border-y border-white/10 bg-[#050505] px-6 py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.55fr_1.45fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-400">
              Painel inteligente
            </p>

            <h2 className="mt-4 text-5xl font-black leading-tight tracking-[-0.05em]">
              Seu progresso,
              <br />
              em <span className="text-yellow-400">um só lugar.</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              Acompanhe métricas, evolução, treinos e alimentação com
              dashboards completos e personalizados.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-black p-6 shadow-[0_35px_100px_rgba(0,0,0,0.5)]">
            <div className="mb-6 flex items-center gap-2 text-sm text-green-400">
              <CheckCircle2 size={16} />
              Dados atualizados em tempo real
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <MiniCard title="Gasto calórico" value="1.842 kcal" />
              <MiniCard title="Treinos concluídos" value="12" />
              <MiniCard title="Sequência" value="7 dias" />
              <MiniCard title="IG médio" value="52" />
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-5">
                <p className="text-sm font-black">Evolução de calorias</p>

                <div className="mt-5 flex h-48 items-end gap-4">
                  {[45, 58, 72, 50, 80, 62, 86].map((height) => (
                    <div
                      key={height}
                      className="flex-1 rounded-t-2xl bg-yellow-400"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-5">
                <p className="text-sm font-black">Distribuição de macros</p>

                <div className="mt-8 flex items-center gap-6">
                  <div className="h-36 w-36 rounded-full border-[20px] border-yellow-400 border-r-green-400 border-b-orange-400" />

                  <div className="space-y-3 text-sm text-zinc-400">
                    <p>Proteínas — 38%</p>
                    <p>Carboidratos — 42%</p>
                    <p>Gorduras — 20%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="planos" className="bg-white px-6 py-24 text-black">
        <div className="mx-auto max-w-6xl rounded-[3rem] bg-yellow-400 p-12">
          <p className="text-xs font-black uppercase tracking-[0.22em]">
            Planos SmartShape
          </p>

          <h2 className="mt-4 max-w-3xl text-5xl font-black leading-tight tracking-[-0.05em]">
            Transforme alimentação, treino e evolução em resultado real.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-black/70">
            Uma experiência premium inspirada nos maiores apps fitness do
            mercado.
          </p>
        </div>
      </section>

      <footer
        id="contato"
        className="border-t border-white/10 bg-black px-6 py-12"
      >
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
          <div>
            <p className="text-2xl font-black text-white">
              Smart<span className="text-yellow-400">Shape</span>
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              IA fitness, nutrição e evolução em uma única plataforma.
            </p>
          </div>

          <div>
            <h4 className="font-black text-white">Produto</h4>
            <div className="mt-4 space-y-2 text-sm text-zinc-500">
              <p>Analisar refeição</p>
              <p>Painel</p>
              <p>Planos</p>
            </div>
          </div>

          <div>
            <h4 className="font-black text-white">Empresa</h4>
            <div className="mt-4 space-y-2 text-sm text-zinc-500">
              <p>Sobre</p>
              <p>Contato</p>
              <p>Privacidade</p>
            </div>
          </div>

          <div>
            <h4 className="font-black text-white">Contato</h4>
            <p className="mt-4 text-sm text-zinc-500">
              contato@smartfitshape.com.br
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs text-zinc-600">
          © 2026 SmartShape. Todos os direitos reservados.
        </div>
      </footer>
    </main>
  );
}

function MiniCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#121212] p-4">
      <p className="text-[11px] text-zinc-500">{title}</p>
      <p className="mt-3 text-2xl font-black">{value}</p>
      <p className="mt-3 text-xs font-black text-green-400">+12%</p>
    </div>
  );
}
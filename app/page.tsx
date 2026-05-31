export default function SmartShapePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="/smartshape" className="text-2xl font-black">
            Smart<span className="text-yellow-400">Shape</span>
          </a>

          <nav className="hidden items-center gap-8 text-base font-bold text-zinc-400 md:flex">
            <a href="#solucao" className="hover:text-white">Solução</a>
            <a href="#plataforma" className="hover:text-white">Plataforma</a>
            <a href="#resultados" className="hover:text-white">Resultados</a>
            <a href="#contato" className="hover:text-white">Contato</a>
          </nav>

          <a
            href="/smartshape/login"
            className="rounded-full bg-yellow-400 px-6 py-3 text-sm font-black text-black hover:bg-yellow-300"
          >
            Entrar
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 pt-4 pb-20">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-yellow-400/20 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-black text-yellow-300">
              Powered by MacroLens
            </div>

            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Inteligência fitness para redes que querem{" "}
              <span className="text-yellow-400">reter mais.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Treino, nutrição, análise alimentar por foto, prontuário fitness
              e analytics em uma plataforma inteligente para aumentar
              engajamento, retenção e evolução dos alunos.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/smartshape/login"
                className="rounded-full bg-yellow-400 px-8 py-4 text-sm font-black text-black hover:bg-yellow-300"
              >
                Acessar plataforma
              </a>

              <a
                href="#plataforma"
                className="rounded-full border border-white/15 px-8 py-4 text-sm font-black text-white hover:border-yellow-400"
              >
                Ver como funciona
              </a>
            </div>
          </div>

          <div className="relative rounded-[2.5rem] border border-white/10 bg-zinc-950 p-5 shadow-2xl">
            <div className="rounded-[2rem] bg-[#111] p-6">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500">Dashboard IA</p>
                  <h2 className="text-2xl font-black">Rede Fitness</h2>
                </div>
                <span className="rounded-full bg-yellow-400 px-4 py-2 text-xs font-black text-black">
                  LIVE
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Metric value="+32%" label="retenção" />
                <Metric value="+41%" label="engajamento" />
                <Metric value="-18%" label="evasão" />
              </div>

              <div className="mt-6 rounded-3xl bg-black p-5">
                <p className="mb-4 text-sm font-black text-yellow-400">
                  Análise alimentar por IA
                </p>

                <div className="flex h-40 items-end gap-3 rounded-2xl bg-gradient-to-br from-zinc-800 to-black p-4">
                  {[42, 66, 90, 55, 76].map((h) => (
                    <div
                      key={h}
                      className="flex-1 rounded-t-xl bg-yellow-400"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                  <Box title="Kcal" value="682" />
                  <Box title="Proteína" value="38g" />
                  <Box title="IG" value="54" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0A0A0A] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            O problema não é vender matrícula.
            <span className="text-yellow-400"> É manter o aluno ativo.</span>
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Info title="Baixo acompanhamento" text="O aluno treina, mas muitas vezes não recebe orientação contínua fora da academia." />
            <Info title="Nutrição desconectada" text="A alimentação real do aluno não conversa com treino, evolução e objetivos." />
            <Info title="Evasão silenciosa" text="A rede só percebe a queda de engajamento quando o cancelamento já está próximo." />
          </div>
        </div>
      </section>

      <section id="plataforma" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-400">
            Plataforma
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            Tudo que uma rede fitness precisa em uma experiência digital inteligente.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Info title="Análise alimentar por foto" text="IA que identifica alimentos, calcula macros, calorias e índice glicêmico." />
            <Info title="Treino inteligente" text="Treinos adaptados por objetivo, frequência, nível e evolução." />
            <Info title="Nutrição personalizada" text="Planos alimentares conectados ao perfil e comportamento do aluno." />
            <Info title="Prontuário fitness" text="Histórico, metas, medidas, objetivos e acompanhamento." />
            <Info title="Gamificação" text="Desafios, evolução, recompensas e motivação contínua." />
            <Info title="Analytics da rede" text="Indicadores de retenção, engajamento e risco de evasão." />
          </div>
        </div>
      </section>

      <section id="resultados" className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-yellow-400 p-10 text-black">
          <p className="text-sm font-black uppercase tracking-[0.3em]">
            Impacto estimado
          </p>
          <h2 className="mt-5 max-w-4xl text-4xl font-black md:text-6xl">
            IA não é só funcionalidade. É retenção, recorrência e dados.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Impact value="+32%" label="retenção potencial" />
            <Impact value="+41%" label="engajamento no app" />
            <Impact value="-18%" label="risco de cancelamento" />
          </div>
        </div>
      </section>

      <section id="contato" className="px-6 py-20 text-center">
        <h2 className="mx-auto max-w-4xl text-5xl font-black md:text-7xl">
          O futuro digital das academias começa agora.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
          SmartShape é um conceito enterprise baseado na engine MacroLens para
          aumentar retenção com tecnologia.
        </p>

        <a
          href="/smartshape/login"
          className="mt-8 inline-flex rounded-full bg-yellow-400 px-9 py-4 text-sm font-black text-black hover:bg-yellow-300"
        >
          Solicitar apresentação
        </a>
      </section>
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black p-4">
      <p className="text-2xl font-black text-yellow-400">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-widest text-zinc-500">
        {label}
      </p>
    </div>
  );
}

function Box({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl bg-zinc-900 p-3">
      <p className="text-zinc-500">{title}</p>
      <p className="mt-1 font-black text-white">{value}</p>
    </div>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-7">
      <div className="mb-6 h-12 w-12 rounded-2xl bg-yellow-400" />
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-3 leading-relaxed text-zinc-400">{text}</p>
    </div>
  );
}

function Impact({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl bg-black p-7 text-white">
      <p className="text-5xl font-black text-yellow-400">{value}</p>
      <p className="mt-3 text-sm font-bold uppercase tracking-widest text-zinc-400">
        {label}
      </p>
    </div>
  );
}
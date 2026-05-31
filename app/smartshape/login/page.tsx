"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SmartShapeLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.ok) {
      window.location.href = "/smartshape/painel";
      return;
    }

    alert("E-mail ou senha inválidos.");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="hidden border-r border-white/10 bg-gradient-to-br from-black via-[#111] to-yellow-950/30 p-12 lg:flex lg:flex-col lg:justify-between">
          <a href="/smartshape" className="text-3xl font-black">
            Smart<span className="text-yellow-400">Shape</span>
          </a>

          <div>
            <p className="mb-5 inline-flex rounded-full border border-yellow-400/30 px-4 py-2 text-sm font-black text-yellow-400">
              Powered by MacroLens
            </p>

            <h1 className="max-w-xl text-6xl font-black leading-tight">
              Inteligência fitness para redes que querem reter mais.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
              Treino, nutrição, análise alimentar por foto e evolução do aluno
              em uma experiência premium.
            </p>
          </div>

          <p className="text-xs uppercase tracking-[0.35em] text-zinc-600">
            SmartShape Enterprise
          </p>
        </section>

        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <a href="/smartshape" className="mb-10 block text-2xl font-black">
              Smart<span className="text-yellow-400">Shape</span>
            </a>

            <h2 className="text-4xl font-black">
              Acesse sua conta
            </h2>

            <p className="mt-3 text-zinc-400">
              Entre para acessar o painel inteligente SmartShape.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-300">
                  E-mail
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full rounded-2xl border border-white/10
                    bg-zinc-900 px-5 py-4 text-white
                    outline-none transition
                    focus:border-yellow-400
                  "
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-300">
                  Senha
                </label>

                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full rounded-2xl border border-white/10
                    bg-zinc-900 px-5 py-4 text-white
                    outline-none transition
                    focus:border-yellow-400
                  "
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full rounded-full
                  bg-yellow-400 px-6 py-4
                  font-black text-black
                  transition hover:bg-yellow-300
                "
              >
                {loading ? "Entrando..." : "Entrar no SmartShape"}
              </button>
            </form>

            <button
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/smartshape/painel",
                })
              }
              className="
                mt-4 w-full rounded-full
                border border-white/10
                px-6 py-4 font-black text-white
                transition hover:border-yellow-400
              "
            >
              Continuar com Google
            </button>

            <p className="mt-8 text-center text-sm text-zinc-500">
              SmartShape Enterprise Platform
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
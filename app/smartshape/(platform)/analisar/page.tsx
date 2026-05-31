import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import SmartShapeAnalyzerClient from "@/app/components/SmartShapeAnalyzerClient";

export default async function SmartShapeAnalisarPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/smartshape/login");
  }

  const plan = (session as any).plan ?? (session?.user as any)?.plan ?? "free";

  const rawEmailVerified =
    (session?.user as any)?.emailVerified ?? (session as any)?.emailVerified;

  const emailVerified = rawEmailVerified === false ? false : true;

  return (
    <>
      <section className="mb-6 rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-yellow-950/20 p-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-400">
          Computer Vision Nutrition
        </p>

        <h1 className="mt-4 text-5xl font-black tracking-tight text-white">
          Analisar refeição
        </h1>

        <p className="mt-4 max-w-2xl text-zinc-400">
          Envie uma foto do prato, ajuste os alimentos manualmente e salve a
          refeição no painel SmartShape.
        </p>
      </section>

      <SmartShapeAnalyzerClient
        isLogged={!!session}
        plan={plan}
        emailVerified={emailVerified}
      />
    </>
  );
}
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import NutricaoClient from "@/app/nutricao/NutricaoClient";
import { isFitProfileComplete, normalizeFitProfile } from "@/lib/fit-profile";

export default async function SmartShapeNutricaoPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/smartshape/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true, name: true, role: true },
  });

  if (!user) {
    redirect("/smartshape/login");
  }

  const [fitProfile, nutrition, progress, subscription] = await Promise.all([
    prisma.fitProfile.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.nutritionSnapshot.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.progressSnapshot.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.subscription.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
      select: { plan: true },
    }),
  ]);

  const plan = String(subscription?.plan ?? "FREE").toUpperCase();
  const role = String(user.role ?? "USER").toUpperCase();

  const hasProAccess =
    plan === "PRO" ||
    plan === "PROFESSIONAL" ||
    plan === "ADMIN" ||
    role === "ADMIN";

  if (!hasProAccess) {
    redirect("/planos");
  }

  const fitCheck = isFitProfileComplete(fitProfile);

  return (
    <NutricaoClient
      userId={user.id}
      fitProfile={normalizeFitProfile(fitProfile)}
      nutrition={nutrition}
      progress={progress}
      fitProfileComplete={fitCheck.complete}
      fitProfileMissing={fitCheck.missing}
      plan={plan}
    />
  );
}
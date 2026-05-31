import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import PerfilClient from "@/app/components/PerfilClient";

export default async function SmartShapePerfilPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/smartshape/login");
  }

  return <PerfilClient />;
}
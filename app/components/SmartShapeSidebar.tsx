"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const groups = [
  {
    title: "Operação",
    items: [
      { href: "/smartshape/painel", label: "Painel" },
      { href: "/smartshape/analisar", label: "Analisar refeição" },
      { href: "/smartshape/treino", label: "Treino" },
      { href: "/smartshape/nutricao", label: "Nutrição" },
      { href: "/smartshape/perfil", label: "Perfil" },
    ],
  },
  {
    title: "Enterprise Demo",
    items: [
      { href: "/smartshape/enterprise", label: "Visão executiva" },
      { href: "/smartshape/analytics", label: "Analytics" },
      { href: "/smartshape/ia", label: "Inteligência IA" },
      { href: "/smartshape/unidades", label: "Unidades" },
    ],
  },
];

export default function SmartShapeSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[280px] flex-col border-r border-white/10 bg-black/95 lg:flex">
      <div className="border-b border-white/10 px-6 py-7">
        <h1 className="text-3xl font-black tracking-tight">
          <span className="text-white">Smart</span>
          <span className="text-yellow-400">Shape</span>
        </h1>

        <p className="mt-2 text-xs font-medium text-zinc-500">
          Enterprise Fitness OS
        </p>
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto p-4">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="mb-3 px-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
              {group.title}
            </p>

            <div className="space-y-1.5">
              {group.items.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                      active
                        ? "bg-yellow-400 text-black shadow-[0_0_30px_rgba(250,204,21,0.25)]"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="text-xs">●</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
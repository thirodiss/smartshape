"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

type Props = {
  callbackUrl?: string;
};

export default function GoogleSignInButton({ callbackUrl = "/painel" }: Props) {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl })}
      className="
        w-full
        flex items-center justify-center gap-2
        rounded-full border border-zinc-300
        bg-white
        px-4 py-2
        text-sm font-medium text-zinc-900
        shadow-sm
        transition
        hover:bg-zinc-50
        active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-300
      "
    >
      <Image src="/google-icon.svg" alt="Google" width={18} height={18} />
      <span>
        Continuar com <strong>Google</strong>
      </span>
    </button>
  );
}

import type { ReactNode } from "react";
import SmartShapeShell from "@/app/components/SmartShapeShell";

type Props = {
  children: ReactNode;
};

export default function PlatformLayout({ children }: Props) {
  return (
    <SmartShapeShell>
      {children}
    </SmartShapeShell>
  );
}
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function SmartShapeLayout({ children }: Props) {
  return <>{children}</>;
}
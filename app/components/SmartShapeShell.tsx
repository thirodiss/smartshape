import type { ReactNode } from "react";
import SmartShapeSidebar from "@/app/components/SmartShapeSidebar";
import SmartShapeTopbar from "@/app/components/SmartShapeTopbar";

type Props = {
  children: ReactNode;
};

export default function SmartShapeShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <SmartShapeSidebar />

        <div className="min-h-screen flex-1 bg-black text-white">
          <SmartShapeTopbar />

          <main className="p-6 text-white">{children}</main>
        </div>
      </div>
    </div>
  );
}
"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/** Brings new content in on each route change. */
export function PageFade({ children }: { children: ReactNode }) {
  return <div key={usePathname()} className="page-in">{children}</div>;
}

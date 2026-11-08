"use client";
import { useEffect, useState } from "react";

let visited = false;

// Moving to another page fades it in. The first page of a visit, or a reload, appears at
// once. Opacity only, so nothing moves.
export default function Template({ children }: { children: React.ReactNode }) {
  const [fade] = useState(visited);
  useEffect(() => { visited = true; }, []);
  return <div className={fade ? "page-in" : undefined}>{children}</div>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-xl place-items-center gap-4 px-gutter py-32 text-center">
      <p className="text-display font-semibold">404</p>
      <p className="text-muted-foreground">Page not found.</p>
      <Button size="xl" render={<Link href="/icons/" />}>Browse icons</Button>
    </div>
  );
}

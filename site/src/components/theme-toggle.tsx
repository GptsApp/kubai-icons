"use client";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "kubai-icons-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const flip = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");
  const toggle = () => {
    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) flip();
    else document.startViewTransition(() => flushSync(flip));
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={toggle}
      className="text-muted-foreground hover:text-foreground"
    >
      <Sun size={18} color="#F59E0B" trigger="parent" className="size-[18px] dark:hidden" />
      <Moon size={18} color="#818CF8" trigger="parent" className="hidden size-[18px] dark:block" />
    </Button>
  );
}

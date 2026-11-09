"use client";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { RiContrast2Line } from "@remixicon/react";
import { Moon, Sun } from "kubai-icons-react";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTr } from "@/lib/use-locale";
import { cn } from "@/lib/utils";

function useThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const flip = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");
  const toggle = () => {
    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) flip();
    else document.startViewTransition(() => flushSync(flip));
  };
  return toggle;
}

/** The theme switch as a row of a menu. */
export function ThemeMenuItem({ className }: { className?: string }) {
  const toggle = useThemeSwitch();
  const tr = useTr();
  return (
    <DropdownMenuItem className={className} onClick={toggle} closeOnClick={false}>
      <RiContrast2Line />{tr("Toggle dark mode", "切换深色模式")}
    </DropdownMenuItem>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const toggle = useThemeSwitch();
  const tr = useTr();
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={tr("Toggle dark mode", "切换深色模式")}
      onClick={toggle}
      className={cn("text-muted-foreground hover:text-foreground", className)}
    >
      <Sun size={18} color="#F59E0B" trigger="parent" className="size-[18px] dark:hidden" />
      <Moon size={18} color="#818CF8" trigger="parent" className="hidden size-[18px] dark:block" />
    </Button>
  );
}

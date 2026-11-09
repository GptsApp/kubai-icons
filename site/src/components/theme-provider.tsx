"use client";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { ThemeProvider as NextThemes } from "next-themes";
import type { ReactNode } from "react";
import { languageOf } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Sliders, tabs and menus take their reading direction from here.
  const direction = languageOf(useLocale()).dir === "rtl" ? "rtl" : "ltr";
  return (
    <DirectionProvider direction={direction}>
      <NextThemes attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </NextThemes>
    </DirectionProvider>
  );
}

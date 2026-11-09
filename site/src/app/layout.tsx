import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnalyticsScript } from "@/components/analytics-script";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HOME_DESCRIPTION } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const sans = Geist({ variable: "--font-face-sans", subsets: ["latin", "latin-ext", "cyrillic"] });
const mono = Geist_Mono({ variable: "--font-face-mono", subsets: ["latin", "latin-ext", "cyrillic"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL + "/"),
  title: { default: "Kubai Icons", template: "%s – Kubai Icons" },
  description: HOME_DESCRIPTION,
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <TooltipProvider>
            <SiteHeader />
            {/* At least a screen tall, so the footer never shows half-cut in the first view. */}
            <main className="min-h-[calc(100svh-var(--header))] flex-1">{children}</main>
            <SiteFooter />
            {/* Clear of the collection bar, which sits at the same place. */}
            <Toaster position="bottom-center" offset={{ bottom: 84 }} mobileOffset={{ bottom: 84 }} />
          </TooltipProvider>
        </ThemeProvider>
        <AnalyticsScript />
      </body>
    </html>
  );
}

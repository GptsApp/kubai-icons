"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { browserLocale, loadMessages, localize, pick, type Locale } from "@/lib/i18n";

/** The 404 message. A static host serves one file for every missing page, so the language is read from the address after loading. */
export function NotFoundBody() {
  const [locale, setLocale] = useState<Locale>("en");
  useEffect(() => {
    const locale = browserLocale();
    loadMessages(locale).then(() => setLocale(locale)).catch(() => { /* English still reads */ });
  }, []);
  return (
    <div className="mx-auto grid max-w-xl place-items-center gap-4 px-gutter py-32 text-center">
      <p className="text-display font-semibold">404</p>
      <p className="text-muted-foreground">{pick(locale, "Page not found.", "页面不存在")}</p>
      <Button size="xl" render={<Link href={localize("/icons/", locale)} />}>{pick(locale, "Browse icons", "浏览图标")}</Button>
    </div>
  );
}

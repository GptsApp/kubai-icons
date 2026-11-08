"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { localeOf, localize } from "@/lib/i18n";
import { asset } from "@/lib/site";

/** The address of this page in the other language, and the label that offers it. */
export function useLanguageLink() {
  const path = usePathname() ?? "/";
  const router = useRouter();
  const locale = localeOf(path);
  const other = locale === "zh" ? "en" : "zh";
  const target = localize(path, other);
  const href = asset(target);
  return {
    href,
    label: other === "zh" ? "中文" : "English",
    title: other === "zh" ? "切换到简体中文" : "Switch to English",
    hrefLang: other === "zh" ? "zh-CN" : "en",
    // Moves within the app, so the header stays in place. The search and the open icon
    // travel with the address, and the reader keeps their place on the page.
    onClick: (e: React.MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      router.push(target + window.location.search + window.location.hash, { scroll: false });
    },
  };
}

/** Keeps the document's language right while moving between pages in the app. */
export function DocumentLanguage() {
  const locale = localeOf(usePathname());
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);
  return null;
}

/** A link to this page in the other language. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { href, label, title, hrefLang, onClick } = useLanguageLink();
  return <a href={href} hrefLang={hrefLang} title={title} onClick={onClick} className={className}>{label}</a>;
}

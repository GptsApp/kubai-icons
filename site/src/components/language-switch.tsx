"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RiTranslate2 } from "@remixicon/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { languageOf, LANGUAGES, localeOf, localize } from "@/lib/i18n";
import { asset } from "@/lib/site";
import { useTr } from "@/lib/use-locale";

type LanguageLink = { code: string; name: string; tag: string; current: boolean; href: string; onClick: (e: React.MouseEvent) => void };

/** This page in every language. */
export function useLanguages() {
  const path = usePathname() ?? "/";
  const router = useRouter();
  const locale = localeOf(path);
  const links: LanguageLink[] = LANGUAGES.map(({ code, name, tag }) => {
    const target = localize(path, code);
    return {
      code,
      name,
      tag,
      current: code === locale,
      href: asset(target),
      // Moves within the app, so the header stays in place. The search and the open icon
      // travel with the address, and the reader keeps their place on the page.
      onClick: (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        router.push((target.includes("?") ? target : target + window.location.search) + window.location.hash, { scroll: false });
      },
    };
  });
  return { current: languageOf(locale).name, links };
}

/** Keeps the document's language and direction right while moving between pages in the app. */
export function DocumentLanguage() {
  const locale = localeOf(usePathname());
  useEffect(() => {
    const { tag, dir } = languageOf(locale);
    document.documentElement.lang = tag;
    document.documentElement.dir = dir ?? "ltr";
  }, [locale]);
  return null;
}

/** One row per language, each a real link so it can open in a new tab. */
export function LanguageItems({ links }: { links: LanguageLink[] }) {
  return links.map((l) => (
    <DropdownMenuItem key={l.code} render={<a href={l.href} hrefLang={l.tag} lang={l.tag} aria-current={l.current ? "page" : undefined} onClick={l.onClick} />} className={l.current ? "font-medium" : undefined}>
      {l.name}
    </DropdownMenuItem>
  ));
}

/** A menu of this page in every language. */
export function LanguageSwitch({ className, iconOnly }: { className?: string; iconOnly?: boolean }) {
  const { current, links } = useLanguages();
  const tr = useTr();
  const label = tr("Language", "语言");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label={label} title={label} className={className}>
        {iconOnly ? <RiTranslate2 className="size-4" /> : current}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="max-h-[min(26rem,70svh)] w-44 overflow-y-auto p-1.5">
        <LanguageItems links={links} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

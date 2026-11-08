"use client";
import Link from "next/link";
import { useCallback, useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { RiSearchLine } from "@remixicon/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Segmented } from "@/components/kit/segmented";
import { SizeControl } from "@/components/kit/size-control";
import { Swatches } from "@/components/kit/swatches";
import { Glide } from "@/components/kit/glide";
import { chip, navItem, raised } from "@/components/kit/styles";
import { loadIndex, loadKeywords, matchedKeyword, prepare, searchObjects, type Category, type IconIndex, type IconMeta, type Searchable } from "@/lib/icons";
import { track } from "@/lib/analytics";
import { asset, requestUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import { IconGrid } from "./icon-grid";
import { IconDialog } from "./icon-dialog";
import { MIXED, MIXED_FILL, SWATCHES, mixedColor, usePrefs } from "./prefs";

const readUrl = () => {
  if (typeof window === "undefined") return { q: "", cat: "", icon: "" };
  const p = new URLSearchParams(window.location.search);
  return { q: p.get("q") ?? "", cat: p.get("category") ?? "", icon: p.get("icon") ?? "" };
};
const writeUrl = (s: { q: string; cat: string; icon: string }) => {
  const p = new URLSearchParams();
  if (s.q) p.set("q", s.q);
  if (s.cat) p.set("category", s.cat);
  if (s.icon) p.set("icon", s.icon);
  const qs = p.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
};

export function IconBrowser({ categories: cats }: { categories: Category[] }) {
  const [index, setIndex] = useState<IconIndex | null>(null);
  const [list, setList] = useState<Searchable[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [open, setOpen] = useState<IconMeta | null>(null);
  // The colour of the tile that opened the dialog, so the preview matches it in mixed mode.
  const [openColor, setOpenColor] = useState<string | null>(null);
  // While on, clicking a tile adds it to the collection instead of opening it.
  const [selecting, setSelecting] = useState(false);
  // The list fades only when the visitor changes it, never when the page loads.
  const [refiltered, setRefiltered] = useState(false);
  // Only a slider drag lets the grid trail the size; a saved size applies at once.
  const [sizing, setSizing] = useState(false);
  const [prefs, setPrefs] = usePrefs();
  const query = useDeferredValue(q);
  const input = useRef<HTMLInputElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  const [failed, setFailed] = useState(false);
  const load = useCallback(() => {
    setFailed(false);
    loadIndex().then((ix) => {
      setIndex(ix);
      setList(prepare(ix.icons));
      loadKeywords().then((keywords) => setList(prepare(ix.icons, keywords))).catch(() => { /* names and tags still search */ });
      const u = readUrl();
      setQ(u.q);
      setCat(u.cat);
      if (u.icon) setOpen(ix.icons.find((i) => i.name === u.icon) ?? null);
    }, () => setFailed(true));
  }, []);
  useEffect(load, [load]);
  useEffect(() => { if (index) writeUrl({ q, cat, icon: open?.name ?? "" }); }, [q, cat, open, index]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => searchObjects(list, query, cat), [list, query, cat]);
  const hits = useMemo(() => (query.trim() ? new Map(results.map((r) => [r.name, matchedKeyword(r, query)])) : undefined), [results, query]);

  // A new category or query starts from the top of the grid, not somewhere in the middle
  // of a list that has just changed under the page. The page stops exactly where the
  // toolbar sticks, so the toolbar and the sidebar stay where they were.
  const first = useRef(true);
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    const toolbar = bar.current, column = toolbar?.parentElement;
    if (!toolbar || !column) return;
    const stuckAt = parseFloat(getComputedStyle(toolbar).top) || (document.querySelector("header")?.offsetHeight ?? 0);
    const pulledUp = parseFloat(getComputedStyle(toolbar).marginTop) || 0;
    const top = Math.ceil(column.getBoundingClientRect().top + window.scrollY + pulledUp - stuckAt);
    if (window.scrollY > top) window.scrollTo({ top, behavior: "instant" });
  }, [cat, query]);

  // Search analytics: one event per settled query.
  useEffect(() => {
    if (query.trim().length < 2) return;
    const id = setTimeout(() => track(results.length ? "search" : "search_empty", { q: query.trim().toLowerCase().slice(0, 40), results: results.length }), 1200);
    return () => clearTimeout(id);
  }, [query, results.length]);

  const openIcon = useCallback((m: IconMeta, color?: string) => {
    setOpen(m);
    if (color) setOpenColor(color);
    track("icon_open", { icon: m.name });
  }, []);
  const pickCat = (id: string) => { setRefiltered(true); setCat(id); if (id) track("filter_category", { category: id }); };
  // Category links filter in place; opening one in a new tab still goes to its page.
  const filterTo = (e: React.MouseEvent, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    pickCat(id);
  };
  const related = useMemo(() => {
    if (!open) return [];
    const root = open.base ?? open.name;
    return list.filter((i) => i.name === root || i.base === root);
  }, [open, list]);

  // The grid may trail the slider, which keeps the thumb under the pointer.
  const trailingSize = useDeferredValue(prefs.size);
  const gridSize = sizing ? trailingSize : prefs.size;
  const tile = 64 + gridSize * 1.5;
  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      <aside className="hidden lg:block">
        <nav className="isolate sticky top-[calc(var(--header)+var(--stick))] -mr-2 max-h-[calc(100dvh-var(--header)-2*var(--stick))] space-y-0.5 overflow-y-auto pr-2 pb-6 [mask-image:linear-gradient(to_bottom,black_calc(100%-1.5rem),transparent)]">
          <Glide selector="[aria-current=true]" className="rounded-control bg-muted" />
          <button type="button" aria-current={!cat} onClick={() => pickCat("")} className={navItem({ active: !cat })}>
            <span className="truncate">All</span>
          </button>
          {cats.map((c) => (
            <a key={c.id} href={asset(`/icons/category/${c.id}/`)} aria-current={cat === c.id} onClick={(e) => filterTo(e, c.id)} className={navItem({ active: cat === c.id })}>
              <span className="truncate">{c.en}</span>
            </a>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 space-y-5 lg:space-y-3">
        {/* The opaque band reaches up to the header, so tiles scrolling past never show
            between the header and the panel or round the panel's corners. */}
        <div ref={bar} className="relative z-30 max-lg:contents lg:pointer-events-none lg:sticky lg:top-header lg:-mt-stick lg:-mb-1 lg:pt-stick lg:pb-6 lg:before:absolute lg:before:inset-0 lg:before:-z-10 lg:before:bg-background/65 lg:before:backdrop-blur-xl lg:before:[mask-image:linear-gradient(to_bottom,black_calc(100%-1.5rem),transparent)]">
          <div className="flex flex-col gap-3 max-lg:contents lg:pointer-events-auto lg:rounded-panel lg:border lg:p-4">
          {/* Below the desktop layout only the search box stays in view. */}
          <div className="max-lg:sticky max-lg:top-header max-lg:z-30 max-lg:-mx-gutter max-lg:bg-background/80 max-lg:px-gutter max-lg:py-2 max-lg:backdrop-blur-xl">
          <div className="relative">
            <RiSearchLine className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={input}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, shape or meaning"
              className="h-11 rounded-card pr-16 pl-10 text-field"
              aria-label="Search icons"
            />
            <Kbd className="absolute top-1/2 right-3.5 -translate-y-1/2 pointer-coarse:hidden">/</Kbd>
          </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 max-lg:my-3">
            <Swatches
              className="-mx-gutter w-[calc(100%+2*var(--gutter))] flex-nowrap overflow-x-auto px-gutter sm:mx-0 sm:w-auto sm:flex-wrap sm:overflow-visible sm:px-0"
              value={prefs.color}
              options={[
                { value: MIXED, name: "Mixed", fill: MIXED_FILL },
                ...SWATCHES.map((s) => ({ value: s.value, name: s.name })),
              ]}
              onChange={(color) => setPrefs({ color })}
              label="Accent color"
              customLabel="Custom color"
              hexLabel="Hex color"
            />
            <Segmented
              value={prefs.variant}
              onChange={(variant) => setPrefs({ variant })}
              label="Variant"
              options={[{ value: "color", label: "Color" }, { value: "soft", label: "Soft" }]}
            />
            <Button variant={selecting ? "default" : "outline"} size="sm" aria-pressed={selecting} onClick={() => setSelecting((v) => !v)}>
              {selecting ? "Done" : "Select"}
            </Button>
            <SizeControl
              className="w-full sm:ml-auto sm:w-auto"
              label="Icon size"
              value={prefs.size}
              min={16}
              max={64}
              presets={[16, 24, 32, 48]}
              onChange={(size) => { setSizing(true); setPrefs({ size }); }}
            />
          </div>
          <div className="relative isolate -mx-gutter mb-4 flex gap-1.5 overflow-x-auto px-gutter pb-0.5 lg:hidden">
            <Glide selector="[aria-current=true]" className={cn("rounded-pill", raised)} />
            <button type="button" aria-current={!cat} className={chip({ active: !cat })} onClick={() => pickCat("")}>All</button>
            {cats.map((c) => (
              <a key={c.id} href={asset(`/icons/category/${c.id}/`)} aria-current={cat === c.id} className={chip({ active: cat === c.id })} onClick={(e) => filterTo(e, c.id)}>{c.en}</a>
            ))}
          </div>
          </div>
        </div>
        <div key={cat} className={cn("min-h-dvh", refiltered && "swap-in")}>
          {failed ? (
            <div className="grid place-items-center gap-3 rounded-panel border border-dashed py-20 text-center">
              <p className="text-muted-foreground">The icons could not be loaded.</p>
              <Button variant="outline" size="xl" onClick={load}>Try again</Button>
            </div>
          ) : index && results.length === 0 ? (
            <div className="grid place-items-center gap-3 rounded-panel border border-dashed py-20 text-center">
              <p className="text-muted-foreground">No results.</p>
              <Button variant="outline" size="xl" render={<a href={requestUrl(query)} target="_blank" rel="noreferrer" onClick={() => track("request_icon", { q: query })} />}>
                Request icon
              </Button>
              <Button variant="ghost" size="xl" className="text-muted-foreground" render={<Link href="/icons/submit/" />}>
                Submit your own
              </Button>
            </div>
          ) : (
            <IconGrid icons={results} tile={tile} size={gridSize} color={prefs.color} variant={prefs.variant} selecting={selecting} hits={hits} onOpen={openIcon} />
          )}
        </div>
      </div>
      <IconDialog
        meta={open}
        related={related}
        categories={index?.categories ?? []}
        color={prefs.color === MIXED ? (openColor ?? mixedColor(open?.base ?? open?.name ?? "")) : prefs.color}
        variant={prefs.variant}
        badge={prefs.badge}
        onBadge={(badge) => setPrefs({ badge })}
        onClose={() => { setOpen(null); setOpenColor(null); }}
        onOpen={openIcon}
        onCategory={(id) => { pickCat(id); setOpen(null); setOpenColor(null); }}
        onKeyword={(word) => { setRefiltered(true); setQ(word); setCat(""); setOpen(null); setOpenColor(null); }}
      />
    </div>
  );
}

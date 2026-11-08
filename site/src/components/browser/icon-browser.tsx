"use client";
import Link from "next/link";
import { useCallback, useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { RiFileCopyLine, RiSearchLine } from "@remixicon/react";
import { Search } from "kubai-icons-react";
import { copyText } from "@/components/copy-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Segmented } from "@/components/kit/segmented";
import { SizeControl } from "@/components/kit/size-control";
import { Swatches } from "@/components/kit/swatches";
import { Glide } from "@/components/kit/glide";
import { chip, navItem, raised, tile as tileStyle } from "@/components/kit/styles";
import { loadIndex, loadKeywords, matchedKeyword, prepare, searchObjects, type Category, type IconIndex, type IconMeta, type Searchable } from "@/lib/icons";
import { track } from "@/lib/analytics";
import { agentPrompt, asset, requestUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useLocale, useLocalize, useTr } from "@/lib/use-locale";
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
  const tr = useTr();
  const loc = useLocalize();
  const locale = useLocale();
  const [index, setIndex] = useState<IconIndex | null>(null);
  const [list, setList] = useState<Searchable[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [open, setOpen] = useState<IconMeta | null>(null);
  // The colour of the tile that opened the dialog, so the preview matches it in mixed mode.
  const [openColor, setOpenColor] = useState<string | null>(null);
  // While on, clicking a tile adds it to the collection instead of opening it.
  const [selecting, setSelecting] = useState(false);
  // The list moves only when the visitor changes it, never when the page loads.
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
  const restScroll = useCallback(() => {
    const toolbar = bar.current, column = toolbar?.parentElement;
    if (!toolbar || !column) return Infinity;
    const stuckAt = parseFloat(getComputedStyle(toolbar).top) || (document.querySelector("header")?.offsetHeight ?? 0);
    const pulledUp = parseFloat(getComputedStyle(toolbar).marginTop) || 0;
    return Math.ceil(column.getBoundingClientRect().top + window.scrollY + pulledUp - stuckAt);
  }, []);
  const first = useRef(true);
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    const top = restScroll();
    if (window.scrollY > top) window.scrollTo({ top, behavior: "instant" });
  }, [cat, query, restScroll]);

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
            <span className="truncate">{tr("All", "全部")}</span>
          </button>
          {cats.map((c) => (
            <a key={c.id} href={asset(loc(`/icons/category/${c.id}/`))} aria-current={cat === c.id} onClick={(e) => filterTo(e, c.id)} className={navItem({ active: cat === c.id })}>
              <span className="truncate">{tr(c.en, c.zh ?? c.en)}</span>
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
              onChange={(e) => { setRefiltered(true); setQ(e.target.value); }}
              placeholder={tr("Search by name, shape or meaning", "按名称、形状或含义搜索")}
              className="h-11 rounded-card pr-16 pl-10 text-field"
              aria-label={tr("Search icons", "搜索图标")}
            />
            <Kbd className="absolute top-1/2 right-3.5 -translate-y-1/2 pointer-coarse:hidden">/</Kbd>
          </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 max-lg:my-3">
            <Swatches
              className="-mx-gutter w-[calc(100%+2*var(--gutter))] flex-nowrap overflow-x-auto px-gutter sm:mx-0 sm:w-auto sm:flex-wrap sm:overflow-visible sm:px-0"
              value={prefs.color}
              options={[
                { value: MIXED, name: tr("Mixed", "多色"), fill: MIXED_FILL },
                ...SWATCHES.map((s) => ({ value: s.value, name: s.name })),
              ]}
              onChange={(color) => setPrefs({ color })}
              label={tr("Accent color", "主色")}
              customLabel={tr("Custom color", "自定义颜色")}
              hexLabel={tr("Hex color", "十六进制颜色")}
            />
            <Segmented
              value={prefs.variant}
              onChange={(variant) => setPrefs({ variant })}
              label={tr("Variant", "样式")}
              options={[{ value: "color", label: tr("Color", "彩色") }, { value: "soft", label: tr("Soft", "柔和") }]}
            />
            <Button variant={selecting ? "default" : "outline"} size="sm" aria-pressed={selecting} onClick={() => setSelecting((v) => !v)}>
              {selecting ? tr("Done", "完成") : tr("Select", "多选")}
            </Button>
            <SizeControl
              className="w-full sm:ml-auto sm:w-auto"
              label={tr("Icon size", "尺寸")}
              commonLabel={tr("Common icon sizes", "常用尺寸")}
              pixelsLabel={tr("Icon size in pixels", "尺寸（像素）")}
              value={prefs.size}
              min={16}
              max={64}
              presets={[16, 24, 32, 48]}
              onChange={(size) => { setSizing(true); setPrefs({ size }); }}
            />
          </div>
          <div className="relative isolate -mx-gutter mb-4 flex gap-1.5 overflow-x-auto px-gutter pb-0.5 lg:hidden">
            <Glide selector="[aria-current=true]" className={cn("rounded-pill", raised)} />
            <button type="button" aria-current={!cat} className={chip({ active: !cat })} onClick={() => pickCat("")}>{tr("All", "全部")}</button>
            {cats.map((c) => (
              <a key={c.id} href={asset(loc(`/icons/category/${c.id}/`))} aria-current={cat === c.id} className={chip({ active: cat === c.id })} onClick={(e) => filterTo(e, c.id)}>{tr(c.en, c.zh ?? c.en)}</a>
            ))}
          </div>
          </div>
        </div>
        <div className="min-h-dvh">
          {failed ? (
            <div className="grid place-items-center gap-3 rounded-panel border border-dashed py-20 text-center">
              <p className="text-muted-foreground">{tr("The icons could not be loaded.", "图标加载失败")}</p>
              <Button variant="outline" size="xl" onClick={load}>{tr("Try again", "重试")}</Button>
            </div>
          ) : index && results.length === 0 ? (
            <div className={cn("flex flex-col items-center px-4 py-20 text-center", refiltered && "swap-in")} data-kubai-trigger>
              <div className={cn(tileStyle({ interactive: false }), "size-20")}>
                <Search size={40} color="#5393FF" trigger="parent" />
              </div>
              <h2 className="mt-5 max-w-full truncate text-subheading font-semibold">
                {query.trim() ? tr(`No icons for “${query.trim()}”`, `未找到与“${query.trim()}”相关的图标`) : tr("No icons here yet", "暂无图标")}
              </h2>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <Button render={<a href={requestUrl(query)} target="_blank" rel="noreferrer" onClick={() => track("request_icon", { q: query })} />}>
                  {tr("Request this icon", "申请此图标")}
                </Button>
                <Button variant="outline" onClick={() => { copyText(agentPrompt(query, locale)); track("request_icon", { q: query, via: "agent_prompt" }); }}>
                  <RiFileCopyLine data-icon="inline-start" />
                  {tr("Copy agent prompt", "复制提示词")}
                </Button>
              </div>
            </div>
          ) : (
            <IconGrid icons={results} tile={tile} size={gridSize} color={prefs.color} variant={prefs.variant} selecting={selecting} hits={hits} animateChanges={refiltered} restScroll={restScroll} onOpen={openIcon} />
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

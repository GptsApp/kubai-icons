"use client";
import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ElementType, type ReactNode } from "react";
import { RiArrowRightSLine, RiBookmarkFill, RiBookmarkLine, RiDownloadLine, RiFileCopyLine, RiGithubLine, RiPlayFill } from "@remixicon/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CodeBlock } from "@/components/code-block";
import { copyText } from "@/components/copy-button";
import { HoverIcon, IconImage, prefetchIcon } from "@/components/kit/icon-image";
import { Segmented } from "@/components/kit/segmented";
import { Glide } from "@/components/kit/glide";
import { quietLink, tile } from "@/components/kit/styles";
import { toggleSaved, useSaved } from "@/lib/collection";
import { FACETS, loadKeywords, pascal, zhBadgeName, type IconMeta, type Category, type Keywords } from "@/lib/icons";
import { download, resolvedSvg, svgToPng } from "@/lib/export";
import { track } from "@/lib/analytics";
import { REPO, asset } from "@/lib/site";
import { useLocalize, useTr } from "@/lib/use-locale";
import { nudgeSponsor } from "@/lib/sponsor-nudge";
import { cn } from "@/lib/utils";
import { PREVIEW_SIZE, type Badge as BadgeMode } from "./prefs";
import { useIcon, useZhName } from "./icon-tile";

type Props = {
  meta: IconMeta;
  related: IconMeta[];
  categories: Category[];
  color: string;
  variant: "color" | "soft";
  badge: BadgeMode;
  onBadge: (b: BadgeMode) => void;
  onOpen: (m: IconMeta) => void;
  /** Searches the browser for a keyword. Without it, keywords link to the browser. */
  onKeyword?: (word: string) => void;
  /** Filters the browser by category. When given, the line above the name becomes a trail. */
  onCategory?: (id: string) => void;
  /** The element or component that renders the icon's name, and the line under it. */
  title: ElementType;
  description: ElementType;
  /** Shown in the preview until the live icon has loaded. */
  placeholder?: ReactNode;
};

const LANG_KEY = "kubai-icons:code";

/** How long a touch preview holds the hover pose, including the move there. */
const PLAY_MS = 1100;
/** Lets the panel finish appearing before a touch preview starts. */
const AUTOPLAY_DELAY = 320;

/** A small label above a group of controls. */
const Label = ({ children }: { children: React.ReactNode }) => <p className="text-caption font-medium text-muted-foreground">{children}</p>;

/** One icon's preview, code and downloads, in the dialog or on the icon's own page. */
export function IconDetail({ meta, related, categories, color, variant, badge, onBadge, onOpen, onCategory, onKeyword, title: Title, description: Description, placeholder }: Props) {
  const bc = badge === "semantic" ? "semantic" : undefined;
  const mainBc = meta.badge ? bc : undefined;
  const icon = useIcon(meta);
  const saved = useSaved(meta.name);
  const tr = useTr();
  const loc = useLocalize();
  const [keywords, setKeywords] = useState<Keywords | null>(null);
  const [showKeywords, setShowKeywords] = useState(false);
  const owner = meta.base ?? meta.name;
  useEffect(() => {
    let live = true;
    loadKeywords().then((all) => { if (live) setKeywords(all[owner] ?? null); }).catch(() => { /* the panel works without them */ });
    return () => { live = false; };
  }, [owner]);
  const [pinned, setPinned] = useState(false);
  const playing = useRef(0);
  const play = useCallback(() => {
    window.clearTimeout(playing.current);
    setPinned(true);
    playing.current = window.setTimeout(() => setPinned(false), PLAY_MS);
  }, []);
  // Touch screens have no hover, so each icon plays once when it is shown.
  const loaded = Boolean(icon);
  useEffect(() => {
    if (!loaded || !matchMedia("(hover: none)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = window.setTimeout(play, AUTOPLAY_DELAY);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(playing.current);
      setPinned(false);
    };
  }, [meta.name, loaded, play]);
  const [lang, setLang] = useState("react");
  // The last framework is restored before the panel paints.
  useLayoutEffect(() => {
    try { setLang(localStorage.getItem(LANG_KEY) || "react"); } catch { /* storage may be blocked */ }
  }, []);
  const pickLang = (next: string) => {
    setLang(next);
    try { localStorage.setItem(LANG_KEY, next); } catch { /* storage may be blocked */ }
  };
  const hex = color.toUpperCase();
  const P = pascal(meta.name);
  const cat = categories.find((c) => c.id === meta.category);
  const catName = cat ? tr(cat.en, cat.zh ?? cat.en) : undefined;
  const facets = tr<readonly { key: keyof Keywords; label: string; zh: string }[]>(FACETS, [{ key: "zh", label: "Chinese", zh: "中文" }, ...FACETS]);
  const snippets = useMemo(() => {
    const soft = (variant === "soft" ? ' variant="soft"' : "") + (mainBc ? ' badgeColor="semantic"' : "");
    return {
      react: `import { ${P} } from "kubai-icons-react";\n\n<${P} size={24} color="${color}"${soft} />`,
      vue: `<script setup>\nimport { ${P} } from "kubai-icons-vue";\n</script>\n\n<template>\n  <${P} :size="24" color="${color}"${soft} />\n</template>`,
      html: `<script type="module" src="https://cdn.jsdelivr.net/npm/kubai-icons@0/dist/element.js"></script>\n\n<kubai-icon name="${meta.name}" size="24" color="${color}"${variant === "soft" ? ' variant="soft"' : ""}${mainBc ? ' badge-color="semantic"' : ""}></kubai-icon>`,
      js: `import { createIcon, ${P} } from "kubai-icons";\n\ndocument.body.append(createIcon(${P}, { size: 24, color: "${color}"${variant === "soft" ? ', variant: "soft"' : ""}${mainBc ? ', badgeColor: "semantic"' : ""} }));`,
    };
  }, [meta, P, color, variant, mainBc]);
  const source = `${REPO}/blob/master/icons/${meta.base ?? meta.name}.js`;

  const svgText = () => (icon ? resolvedSvg(icon, { color, variant, badgeColor: mainBc, size: 96 }) : "");
  const actions = {
    copyName: () => { copyText(meta.name); track("icon_copy", { icon: meta.name, format: "name" }); },
    copyColor: () => { copyText(hex); track("icon_copy", { icon: meta.name, format: "color" }); },
    copySvg: () => { copyText(svgText()); track("icon_copy", { icon: meta.name, format: "svg" }); nudgeSponsor(); },
    svg: () => { download(`${meta.name}.svg`, new Blob([svgText()], { type: "image/svg+xml" })); track("icon_download", { icon: meta.name, format: "svg" }); nudgeSponsor(); },
    png: async () => { download(`${meta.name}.png`, await svgToPng(svgText(), 512)); track("icon_download", { icon: meta.name, format: "png" }); nudgeSponsor(); },
  };
  const variants = related.filter((r) => r.base);
  const root = related.find((r) => !r.base);
  const zh = useZhName(meta);
  const rootZh = useZhName(root);
  // Chinese pages lead with the Chinese name and keep the code name beside it.
  const codeName = tr(null, zh ? meta.name : null);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[17rem_minmax(0,1fr)]">
      {/* The preview and its size samples are one block. Narrow screens place them side by
          side, so the actions stay in view. */}
      <div className="flex bg-surface sm:flex-col">
        <button
          type="button"
          data-kubai-trigger
          onClick={() => { if (matchMedia("(hover: none)").matches) play(); else setPinned((v) => !v); }}
          className="focus-area relative grid aspect-square w-32 shrink-0 place-items-center sm:aspect-auto sm:min-h-54 sm:w-full sm:flex-1 [&>span]:scale-[0.6] sm:[&>span]:scale-100"
          aria-label={tr("Play the hover motion", "播放悬停动效")}
        >
          {icon ? <HoverIcon icon={icon} size={PREVIEW_SIZE} color={color} variant={variant} badgeColor={mainBc} hover={pinned} /> : placeholder}
          <small aria-hidden className={cn("absolute inset-x-0 bottom-2 hidden items-center justify-center gap-0.5 text-caption text-muted-foreground transition-opacity pointer-coarse:flex", pinned && "opacity-0")}>
            <RiPlayFill className="size-3" />{tr("Tap to play", "点击播放")}
          </small>
        </button>
        <div className="flex flex-1 items-end justify-center gap-3 pr-12 pb-7 pl-3 max-[389px]:[&>:last-child]:hidden sm:flex-none sm:gap-4 sm:p-panel">
          {[16, 24, 32, 48].map((s) => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              {icon ? <IconImage icon={icon} size={s} color={color} variant={variant} badgeColor={mainBc} /> : <span style={{ width: s, height: s }} />}
              <span className="text-caption text-muted-foreground tabular-nums">{s}</span>
            </div>
          ))}
        </div>
      </div>
    
      <div className="flex min-w-0 flex-col gap-6 p-panel">
        {/* Every line here keeps one line's height, so switching versions never moves
            the controls below. */}
        <header key={meta.name} className="swap-in relative">
          <Description className="flex h-5 items-center gap-0.5 pr-24 text-control whitespace-nowrap sm:pr-8 text-muted-foreground *:[a]:no-underline">
            {onCategory ? (
              <>
                <a href={asset(loc(`/icons/category/${meta.category}/`))} onClick={(e) => { if (!e.metaKey && !e.ctrlKey && !e.shiftKey) { e.preventDefault(); onCategory(meta.category); } }} className={cn("tap relative", quietLink, root && meta.base && "max-sm:hidden")}>{catName}</a>
                {root && meta.base && (
                  <>
                    <RiArrowRightSLine aria-hidden className="size-4 shrink-0 max-sm:hidden" />
                    <button type="button" onClick={() => onOpen(root)} className={cn("tap relative", quietLink)}>{rootZh ?? root.name}</button>
                  </>
                )}
                <RiArrowRightSLine aria-hidden className="size-4 shrink-0" />
                <span className="min-w-0 truncate text-foreground">{zh && meta.base ? zhBadgeName(meta) : zh ?? meta.name}</span>
              </>
            ) : catName}
            {meta.by && <a href={`https://github.com/${meta.by}`} target="_blank" rel="noreferrer" className={cn("tap relative ml-2 shrink-0", quietLink)}>by @{meta.by}</a>}
          </Description>
          <div className="flex h-8 items-center gap-1">
            <Title className={cn("min-w-0 truncate text-heading font-semibold", !zh && "font-mono", codeName && "shrink-0")}>{zh ?? meta.name}</Title>
            {codeName && <span className="ml-1 min-w-0 truncate font-mono text-control text-muted-foreground">{codeName}</span>}
            <Button variant="ghost" size="icon-sm" className="shrink-0 text-muted-foreground" onClick={actions.copyName} aria-label={tr("Copy name", "复制英文名")} title={tr("Copy name", "复制英文名")}>
              <RiFileCopyLine />
            </Button>
            <button type="button" onClick={actions.copyColor} aria-label={tr(`Copy color ${hex}`, `复制色值 ${hex}`)} title={tr("Copy color", "复制色值")} className={cn("tap absolute -top-1 right-0 flex h-7 shrink-0 items-center gap-1.5 rounded-control border px-2 font-mono text-caption sm:relative sm:top-0 sm:ml-auto", quietLink)}>
              <span aria-hidden className="size-3 rounded-pill" style={{ background: color }} />
              {hex}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 max-[359px]:grid-cols-2 max-[359px]:[&>*]:w-full sm:grid-cols-[1fr_auto_auto_auto_auto]">
          <Button size="xl" className="col-span-4 has-data-[icon=inline-start]:pl-5 max-[359px]:col-span-2 sm:col-span-1" onClick={actions.copySvg}><RiFileCopyLine data-icon="inline-start" />{tr("Copy SVG", "复制 SVG")}</Button>
          <Button size="xl" variant="outline" onClick={actions.svg}><RiDownloadLine data-icon="inline-start" />SVG</Button>
          <Button size="xl" variant="outline" onClick={actions.png}><RiDownloadLine data-icon="inline-start" />PNG</Button>
          <Button size="icon-xl" variant="outline" onClick={() => toggleSaved({ name: meta.name, color, variant, badge: mainBc })} aria-pressed={saved} aria-label={tr("Save to collection", "加入收藏夹")} title={saved ? tr("Remove from collection", "移出收藏夹") : tr("Save to collection", "加入收藏夹")}>
            {saved ? <RiBookmarkFill /> : <RiBookmarkLine />}
          </Button>
          <Button size="icon-xl" variant="outline" render={<a href={source} target="_blank" rel="noreferrer" />} aria-label={tr("View source on GitHub", "在 GitHub 上查看源码")} title={tr("View source on GitHub", "在 GitHub 上查看源码")}>
            <RiGithubLine />
          </Button>
        </div>
    
        {variants.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <Label>{tr("Badges", "角标")}</Label>
              <Segmented
                value={badge}
                onChange={onBadge}
                label={tr("Badge color", "角标颜色")}
                options={[
                  { value: "mono", label: tr("Mono", "单色") },
                  { value: "semantic", label: tr("Color", "彩色") },
                ]}
              />
            </div>
            <div className="relative isolate flex flex-wrap gap-2">
              <Glide selector="[aria-current=true]" className="rounded-card bg-surface-hover ring-1 ring-foreground/20" />
              {root && <VariantChip meta={root} active={root.name === meta.name} color={color} variant={variant} onOpen={onOpen} />}
              {variants.map((r) => (
                <VariantChip key={r.name} meta={r} active={r.name === meta.name} color={color} variant={variant} badge={bc} onOpen={onOpen} />
              ))}
            </div>
          </section>
        )}
    
        {snippets && (
          <Tabs value={lang} onValueChange={pickLang} className="min-w-0 gap-2">
            <TabsList>
              <TabsTrigger value="react">React</TabsTrigger>
              <TabsTrigger value="vue">Vue</TabsTrigger>
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="js">JS</TabsTrigger>
            </TabsList>
            {/* Every snippet reserves its space, so the panel keeps its height across tabs. */}
            <div className="grid">
              {(Object.keys(snippets) as (keyof typeof snippets)[]).map((k) => (
                <CodeBlock key={k} code={snippets[k]} className="invisible [grid-area:1/1]" />
              ))}
              {(Object.keys(snippets) as (keyof typeof snippets)[]).map((k) => (
                <TabsContent key={k} value={k} className="swap-in [grid-area:1/1]">
                  <CodeBlock code={snippets[k]} className="h-full" onCopy={() => { track("icon_copy", { icon: meta.name, format: k }); nudgeSponsor(); }} />
                </TabsContent>
              ))}
            </div>
          </Tabs>
        )}

        {keywords && (
          <section>
            <button type="button" aria-expanded={showKeywords} onClick={() => setShowKeywords((v) => !v)} className={cn("tap relative flex items-center gap-0.5 text-caption font-medium", quietLink)}>
              {tr("Keywords", "关键词")}
              <RiArrowRightSLine aria-hidden className={cn("size-4 transition-transform duration-200 motion-reduce:transition-none", showKeywords && "rotate-90")} />
            </button>
            <div className={cn("grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none", showKeywords ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="min-h-0 overflow-hidden" inert={!showKeywords}>
            <dl className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-2 pt-3">
              {facets.map(({ key, label, zh }) => (
                <Fragment key={key}>
                  <dt className="flex h-6 items-center text-caption text-muted-foreground pointer-coarse:h-8">{tr(label, zh)}</dt>
                  <dd className="flex flex-wrap gap-1">
                    {keywords[key].map((word) => (
                      <Tooltip key={word}>
                        <TooltipTrigger
                          delay={200}
                          render={
                            <a
                              href={asset(loc(`/icons/?q=${encodeURIComponent(word)}`))}
                              onClick={(e) => { if (onKeyword && !e.metaKey && !e.ctrlKey && !e.shiftKey) { e.preventDefault(); onKeyword(word); } }}
                              className="inline-flex h-6 items-center rounded-control bg-surface px-2 text-caption text-muted-foreground no-underline transition-colors hover:bg-surface-hover hover:text-foreground pointer-coarse:h-8"
                            />
                          }
                        >
                          {word}
                        </TooltipTrigger>
                        <TooltipContent>{tr(`Search for “${word}”`, `搜索“${word}”`)}</TooltipContent>
                      </Tooltip>
                    ))}
                  </dd>
                </Fragment>
              ))}
            </dl>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function VariantChip({ meta, active, color, variant, badge, onOpen }: { meta: IconMeta; active: boolean; color: string; variant: "color" | "soft"; badge?: string; onOpen: (m: IconMeta) => void }) {
  const icon = useIcon(meta);
  const zh = useZhName(meta);
  return (
    <button
      type="button"
      title={zh ?? meta.name}
      aria-current={active}
      data-kubai-trigger
      onClick={() => onOpen(meta)}
      onPointerEnter={() => { if (icon) prefetchIcon(icon, { color, variant, badgeColor: badge }, PREVIEW_SIZE); }}
      className={cn(tile({ active }), "size-12 rounded-card")}
    >
      {icon ? <HoverIcon icon={icon} size={28} color={color} variant={variant} badgeColor={badge} /> : null}
    </button>
  );
}

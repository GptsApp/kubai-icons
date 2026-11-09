"use client";
import { memo, useEffect, useState, useSyncExternalStore } from "react";
import { RiBookmarkFill, RiBookmarkLine, RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "@remixicon/react";
import { HoverIcon, prefetchIcon } from "@/components/kit/icon-image";
import { PREVIEW_SIZE } from "./prefs";
import { tile } from "@/components/kit/styles";
import { toggleSaved, useSaved } from "@/lib/collection";
import { loadIcon, loadKeywordsLater, localName, onKeywords, peekIcon, peekKeywords, type IconMeta } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useLocale, useTr } from "@/lib/use-locale";

/** The live icon for a name, loading its chunk on first use. */
export function useIcon(meta: IconMeta | null) {
  const [, force] = useState(0);
  const icon = meta ? peekIcon(meta.name) : undefined;
  useEffect(() => {
    if (!meta || icon) return;
    let live = true;
    loadIcon(meta).then(() => live && force((n) => n + 1));
    return () => { live = false; };
  }, [meta, icon]);
  return icon;
}

const noKeywords = () => null;

/** An icon's name in the page's language, once the keywords have loaded. */
export function useLocalName(meta: IconMeta | undefined) {
  const locale = useLocale();
  const named = locale !== "en";
  const keywords = useSyncExternalStore(onKeywords, () => (named ? peekKeywords(locale) : null), noKeywords);
  useEffect(() => { if (named) loadKeywordsLater(locale); }, [named, locale]);
  return keywords && meta ? localName(meta, keywords, locale) : undefined;
}

type TileProps = { meta: IconMeta; size: number; raster?: number; color: string; variant: "color" | "soft"; selecting: boolean; hit?: string | null; onOpen: (m: IconMeta, color: string) => void };

export const IconTile = memo(function IconTile({ meta, size, raster, color, variant, selecting, hit, onOpen }: TileProps) {
  const icon = useIcon(meta);
  const saved = useSaved(meta.name);
  const tr = useTr();
  const local = useLocalName(meta);
  const toggle = () => toggleSaved({ name: meta.name, color, variant });
  return (
    <div className="group/tile relative">
      <button
        type="button"
        onClick={selecting ? toggle : () => onOpen(meta, color)}
        aria-pressed={selecting ? saved : undefined}
        // The detail preview is drawn while the pointer rests here, so it is ready on click.
        onPointerEnter={() => { if (icon) prefetchIcon(icon, { color, variant }, PREVIEW_SIZE); }}
        data-kubai-trigger
        title={local ? `${local} ${meta.name}` : meta.name}
        className={cn(tile({ active: selecting && saved }), "group relative aspect-square w-full")}
      >
        {icon ? (
          <HoverIcon icon={icon} size={size} raster={raster} color={color} variant={variant} />
        ) : (
          <span className="block rounded-control bg-muted-foreground/10" style={{ width: size * 0.8, height: size * 0.8 }} />
        )}
        <span className="absolute inset-x-2 bottom-2 truncate text-center text-caption text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          {local ?? meta.name}
        </span>
        {hit && <span className="absolute inset-x-2 bottom-2 truncate text-center text-caption text-muted-foreground transition-opacity group-hover:opacity-0">{hit}</span>}
      </button>
      {selecting ? (
        <span aria-hidden className="pointer-events-none absolute top-2 end-2">
          {saved ? <RiCheckboxCircleFill className="size-4 text-foreground" /> : <RiCheckboxBlankCircleLine className="size-4 text-muted-foreground/50" />}
        </span>
      ) : (
        // Keyboard users save from the select mode or the detail panel, so tiles stay one tab stop.
        <button
          type="button"
          tabIndex={-1}
          onClick={toggle}
          aria-pressed={saved}
          aria-label={tr("Save {name} to collection", "将 {name} 加入收藏夹", { name: local ?? meta.name })}
          title={saved ? tr("Remove from collection", "移出收藏夹") : tr("Save to collection", "加入收藏夹")}
          className={cn(
            "absolute top-1 end-1 grid size-6 place-items-center rounded-control transition-opacity hover:text-foreground",
            saved ? "text-foreground" : "pointer-events-none text-muted-foreground opacity-0 group-hover/tile:pointer-events-auto group-hover/tile:opacity-100",
          )}
        >
          {saved ? <RiBookmarkFill className="size-3.5" /> : <RiBookmarkLine className="size-3.5" />}
        </button>
      )}
    </div>
  );
});

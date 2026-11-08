"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RiBookmarkFill, RiCloseLine, RiDownloadLine, RiLinkM } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { copyText } from "@/components/copy-button";
import { IconImage } from "@/components/kit/icon-image";
import { Segmented } from "@/components/kit/segmented";
import { Swatches } from "@/components/kit/swatches";
import { tile } from "@/components/kit/styles";
import { track } from "@/lib/analytics";
import {
  addSaved, downloadCollection, recolorSaved, removeSaved, replaceSaved, restyleSaved, savedIcons, shareLink, takeSharedIcons, useCollection,
  type CollectionFormat, type SavedIcon,
} from "@/lib/collection";
import { loadIndex, type IconMeta } from "@/lib/icons";
import { nudgeSponsor } from "@/lib/sponsor-nudge";
import { cn } from "@/lib/utils";
import { useTr } from "@/lib/use-locale";
import { useIcon } from "./icon-tile";
import { MIXED, MIXED_FILL, SWATCHES, mixedColor } from "./prefs";


/** The bar that appears once something is saved, and the panel it opens. */
export function CollectionDock() {
  const items = useCollection();
  const tr = useTr();
  const plural = (n: number) => tr(`${n} icon${n === 1 ? "" : "s"}`, `${n} 个图标`);
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<CollectionFormat>("svg");
  const [busy, setBusy] = useState(false);
  const [known, setKnown] = useState<Map<string, IconMeta> | null>(null);

  useEffect(() => {
    const receive = async () => {
      const shared = takeSharedIcons();
      if (!shared.length) return;
      const names = new Set((await loadIndex()).icons.map((i) => i.name));
      const before = savedIcons();
      const added = addSaved(shared.filter((i) => names.has(i.name)));
      if (added) toast.success(tr(`Added ${plural(added)} to your collection`, `已将 ${added} 个图标加入收藏夹`), { action: { label: tr("Undo", "撤销"), onClick: () => replaceSaved(before) } });
      else toast(tr("These icons are already in your collection", "图标已在收藏夹中"));
    };
    const receiveSafely = () => receive().catch(() => toast.error(tr("The shared icons could not be added", "添加图标失败")));
    receiveSafely();
    window.addEventListener("hashchange", receiveSafely);
    return () => window.removeEventListener("hashchange", receiveSafely);
  }, []);

  useEffect(() => {
    if (open && !known) loadIndex().then((ix) => setKnown(new Map(ix.icons.map((i) => [i.name, i])))).catch(() => toast.error(tr("The collection could not be loaded", "收藏夹加载失败")));
  }, [open, known]);

  const count = items.length;
  const save = async () => {
    setBusy(true);
    try {
      const saved = await downloadCollection(items, format);
      track("collection_download", { count: saved, format });
      nudgeSponsor();
    } catch {
      toast.error(tr("Download failed", "下载失败"));
    } finally {
      setBusy(false);
    }
  };
  const clear = () => {
    const before = items;
    replaceSaved([]);
    setOpen(false);
    toast(tr("Collection cleared", "收藏夹已清空"), { action: { label: tr("Undo", "撤销"), onClick: () => replaceSaved(before) } });
  };
  const colors = new Set(items.map((i) => i.color.toLowerCase()));
  const variants = new Set(items.map((i) => i.variant));
  const label = tr(`Download ${format.toUpperCase()}`, `下载 ${format.toUpperCase()}`);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-gutter">
        <div
          inert={!count}
          className={cn(
            "flex items-center gap-1 rounded-pill border bg-popover p-1 shadow-lg transition-[opacity,translate,filter] duration-200 ease-out motion-reduce:transition-none",
            count ? "pointer-events-auto" : "translate-y-3 opacity-0 blur-sm",
          )}
        >
          <Button variant="ghost" className="rounded-pill" onClick={() => setOpen(true)}>
            <RiBookmarkFill data-icon="inline-start" />
            <span key={count} className="swap-in tabular-nums">{tr(`${count} saved`, `已收藏 ${count} 个`)}</span>
          </Button>
          <Button className="rounded-pill" disabled={busy} onClick={save}>
            <RiDownloadLine data-icon="inline-start" />
            {busy ? tr("Preparing", "准备中") : label}
          </Button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="gap-0 data-[side=right]:w-11/12">
          <SheetHeader className="space-y-1 p-panel pb-4">
            <SheetTitle>{tr("Collection", "收藏夹")}</SheetTitle>
            <SheetDescription>{count ? tr(`${plural(count)}, kept in this browser.`, `${count} 个图标，保存在此浏览器中`) : tr("Nothing saved yet.", "暂无收藏")}</SheetDescription>
          </SheetHeader>
          {count > 0 && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-panel pb-4">
                <Swatches
                  value={colors.size === 1 ? items[0].color : MIXED}
                  options={[{ value: MIXED, name: tr("Mixed", "多色"), fill: MIXED_FILL }, ...SWATCHES.map((s) => ({ value: s.value, name: s.name }))]}
                  onChange={(color) => recolorSaved((i) => (color === MIXED ? mixedColor(i.name) : color))}
                  label={tr("Color of all saved icons", "所有收藏图标的颜色")}
                  customLabel={tr("Custom color", "自定义颜色")}
                  hexLabel={tr("Hex color", "十六进制颜色")}
                />
                {/* Nothing is highlighted while the saved icons differ. */}
                <Segmented
                  value={variants.size === 1 ? items[0].variant : ("" as SavedIcon["variant"])}
                  onChange={restyleSaved}
                  label={tr("Variant of all saved icons", "所有收藏图标的样式")}
                  options={[{ value: "color", label: tr("Color", "彩色") }, { value: "soft", label: tr("Soft", "柔和") }]}
                />
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-panel pb-4">
                <div className="grid grid-cols-5 gap-2">
                  {items.map((item) => {
                    const meta = known?.get(item.name);
                    return meta ? <SavedTile key={item.name} item={item} meta={meta} /> : null;
                  })}
                </div>
              </div>
              <SheetFooter className="border-t p-panel">
                <div className="flex items-center gap-2">
                  <Segmented value={format} onChange={setFormat} label={tr("File format", "文件格式")} options={[{ value: "svg", label: "SVG" }, { value: "png", label: "PNG" }]} />
                  <Button className="flex-1" disabled={busy} onClick={save}>
                    <RiDownloadLine data-icon="inline-start" />
                    {busy ? tr("Preparing", "准备中") : tr("Download ZIP", "下载 ZIP")}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => copyText(shareLink(items))} title={tr("Open this link on another device to add these icons there", "在其他设备上打开此链接，即可添加这些图标")}>
                    <RiLinkM data-icon="inline-start" />{tr("Copy link", "复制链接")}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={clear}>{tr("Clear", "清空")}</Button>
                </div>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

function SavedTile({ item, meta }: { item: SavedIcon; meta: IconMeta }) {
  const tr = useTr();
  const icon = useIcon(meta);
  return (
    <div title={item.name} className={cn(tile({ interactive: false }), "group relative aspect-square")}>
      {icon ? <IconImage icon={icon} size={28} color={item.color} variant={item.variant} badgeColor={item.badge} /> : null}
      <button
        type="button"
        onClick={() => removeSaved(item.name)}
        aria-label={tr(`Remove ${item.name}`, `移除 ${item.name}`)}
        className="tap absolute top-0.5 right-0.5 grid size-5 place-items-center rounded-control text-muted-foreground transition-opacity hover:text-foreground focus-visible:opacity-100 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100"
      >
        <RiCloseLine className="size-3.5" />
      </button>
    </div>
  );
}

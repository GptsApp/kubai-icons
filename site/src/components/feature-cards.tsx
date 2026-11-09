"use client";
import { useState, type ReactNode } from "react";
import { Bell, Download, Folder, FolderCheck, FolderLock, FolderPlus, FolderX, Gift, Heart, Lock, Mail, Star, Trash } from "kubai-icons-react";
import { Segmented } from "@/components/kit/segmented";
import { Swatches } from "@/components/kit/swatches";
import { tile } from "@/components/kit/styles";
import { SWATCHES } from "@/lib/palette";
import { MODULE_DEMO } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useTr } from "@/lib/use-locale";

/** In the order of MODULE_DEMO. */
const MODULE_COMPONENTS = [Folder, Bell, Lock, Mail];

const ICON = 36;

function Card({ title, body, children }: { title: string; body: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5 bg-background p-panel">
      <div className="flex min-h-22 flex-col justify-between gap-3">{children}</div>
      <div className="space-y-1.5">
        <h2 className="font-medium">{title}</h2>
        <p className="text-body text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

const Row = ({ children }: { children: ReactNode }) => <div className="flex items-center gap-3">{children}</div>;

function MotionCard() {
  const tr = useTr();
  return (
    <Card title={tr("Motion", "动效")} body={tr("Animates on interaction and respects reduced motion.", "随交互播放，并遵循系统的“减弱动态效果”设置")}>
      <Row>
        <Mail size={ICON} color="#5393FF" />
        <Trash size={ICON} color="#F43F5E" />
        <Gift size={ICON} color="#22C55E" />
        <Download size={ICON} color="#F97316" />
      </Row>
      <p className="flex h-8 items-center text-caption text-muted-foreground">{tr("Hover or tap to play", "悬停或点击播放")}</p>
    </Card>
  );
}

function ColorCard() {
  const tr = useTr();
  const [color, setColor] = useState(SWATCHES[0].value);
  return (
    <Card title={tr("Color", "配色")} body={tr("All tones are derived from a single accent color.", "所有色调均由同一主色派生")}>
      <Row>
        <Folder size={ICON} color={color} />
        <Heart size={ICON} color={color} />
        <Star size={ICON} color={color} />
        <Bell size={ICON} color={color} />
      </Row>
      <Swatches className="min-h-8" value={color} options={SWATCHES.slice(0, 4)} onChange={setColor} label={tr("Accent color", "主色")} customLabel={tr("Custom color", "自定义颜色")} hexLabel={tr("Hex color", "十六进制颜色")} />
    </Card>
  );
}

function BadgesCard() {
  const tr = useTr();
  const [tone, setTone] = useState<"mono" | "semantic">("semantic");
  const badgeColor = tone === "semantic" ? "semantic" : undefined;
  return (
    <Card title={tr("Badges", "角标")} body={tr("Common states are provided as badged variants.", "常用状态均提供对应角标")}>
      <Row>
        {[FolderPlus, FolderCheck, FolderX, FolderLock].map((Icon, i) => <Icon key={i} size={ICON} color="#5393FF" badgeColor={badgeColor} />)}
      </Row>
      <Segmented value={tone} onChange={setTone} label={tr("Badge color", "角标颜色")} options={[{ value: "mono", label: tr("Mono", "单色") }, { value: "semantic", label: tr("Color", "彩色") }]} />
    </Card>
  );
}

function ModulesCard({ bytes }: { bytes: number[] }) {
  const tr = useTr();
  const [picked, setPicked] = useState([0]);
  const toggle = (i: number) => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  const total = picked.reduce((sum, i) => sum + bytes[i], 0);
  const known = bytes.every(Boolean);
  const size = (total / 1000).toFixed(1);
  const summary = known ? tr("{count} imported, {size} KB gzipped", "已引入 {count} 个，gzip 后 {size} KB", { count: picked.length, size }) : tr("{count} imported", "已引入 {count} 个", { count: picked.length });
  return (
    <Card title={tr("Modules", "模块")} body={tr("Icons are separate ES modules, bundled on import.", "每个图标均为独立的 ES 模块，仅在导入时打包")}>
      <div className="flex items-center gap-1.5">
        {MODULE_COMPONENTS.map((Icon, i) => {
          const on = picked.includes(i);
          return (
            <button key={i} type="button" aria-pressed={on} aria-label={tr("Import {name}", "引入 {name}", { name: MODULE_DEMO[i] })} data-kubai-trigger onClick={() => toggle(i)} className={cn(tile({ active: on }), "size-11 rounded-card")}>
              <Icon size={26} color="#8B5CF6" trigger="parent" />
            </button>
          );
        })}
      </div>
      <p key={summary} className="swap-in flex h-8 items-center text-caption text-muted-foreground tabular-nums">{summary}</p>
    </Card>
  );
}

/** What sets the library apart, each point with something to try. */
export function FeatureCards({ moduleBytes, className }: { moduleBytes: number[]; className?: string }) {
  return (
    <section className={cn("grid gap-px overflow-hidden rounded-panel border bg-border sm:grid-cols-2 xl:grid-cols-4", className)}>
      <MotionCard />
      <ColorCard />
      <BadgesCard />
      <ModulesCard bytes={moduleBytes} />
    </section>
  );
}

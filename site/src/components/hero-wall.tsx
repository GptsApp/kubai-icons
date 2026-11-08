"use client";
import { memo, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Folder, Mail, Calendar, Lock, Settings, Trash, Bell, Camera, Bookmark, AlarmClock, Notebook, Compass,
  Download, CloudUpload, Gift, Package, Heart, Star, Key, Smartphone,
} from "kubai-icons-react";
import { tile } from "@/components/kit/styles";
import { cn } from "@/lib/utils";

const WALL = [Folder, Mail, Calendar, Lock, Settings, Trash, Bell, Camera, Bookmark, AlarmClock, Notebook, Compass, Download, CloudUpload, Gift, Package, Heart, Star, Key, Smartphone];
const COLORS = ["#5393FF", "#6366F1", "#EC4899", "#F97316", "#22C55E", "#06B6D4", "#8B5CF6", "#F43F5E", "#14B8A6", "#0284C7"];

/** The tiles the headline talks about, in the order of its lines. */
export const STORY = [Folder, Bell, Lock].map((Icon) => ({ Icon, color: COLORS[WALL.indexOf(Icon) % COLORS.length] }));

/** How long each line of the headline plays, in milliseconds. */
const BEAT = 1800;
/** The headline and the tiles arrive first. */
const STORY_START = 1100;

/**
 * Which line of the headline is playing, or null when none is. It is read from the page
 * clock, so the headline and the wall agree without being connected.
 */
export function useHeroBeat(active: boolean) {
  const [beat, setBeat] = useState<number | null>(null);
  useEffect(() => {
    if (!active) return;
    let timer = 0;
    const tick = () => {
      const now = performance.now();
      if (now < STORY_START) { timer = window.setTimeout(tick, STORY_START - now); return; }
      setBeat(Math.floor(now / BEAT) % STORY.length);
      timer = window.setTimeout(tick, BEAT - (now % BEAT) + 1);
    };
    tick();
    return () => { window.clearTimeout(timer); setBeat(null); };
  }, [active]);
  return beat;
}

/** Length of one tile's loop, in milliseconds. */
const PERIOD = 7200;
/** Part of the loop a tile spends in its hover pose, including the move there. */
const HOLD = 1400;
/**
 * When a tile's turn comes within the loop. Stepping by 9 through 20 slots on a five-column
 * grid keeps touching tiles at least a fifth of a loop apart, so the motion never reads as
 * a wave across rows or columns.
 */
const offsetOf = (i: number) => (((i * 9) % WALL.length) / WALL.length) * PERIOD;

type TileProps = { Icon: (typeof WALL)[number]; color: string; offset: number; running: boolean; index: number; told: boolean; playing: boolean };

const WallTile = memo(function WallTile({ Icon, color, offset, running, index, told, playing }: TileProps) {
  const [turn, setTurn] = useState(false);
  const [held, setHeld] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!running || held || told) return;
    // Every turn is read from the page clock, so throttled timers cannot bring tiles into step.
    const phase = () => (performance.now() + PERIOD - offset) % PERIOD;
    let timer = 0;
    const play = () => { setTurn(true); timer = window.setTimeout(rest, Math.max(0, HOLD - phase())); };
    const rest = () => { setTurn(false); timer = window.setTimeout(play, PERIOD - phase() + 1); };
    timer = window.setTimeout(play, PERIOD - phase() + 1);
    return () => { window.clearTimeout(timer); setTurn(false); };
  }, [running, held, offset, told]);

  const toggles = Icon === Bookmark;
  return (
    <div
      className={cn(tile(), "rise-in aspect-square", playing && "bg-surface-hover")}
      // Tiles arrive along the diagonals, after the headline.
      style={{ "--i": 2 + (index % 5) + Math.floor(index / 5) } as CSSProperties}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") setHeld(true); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") setHeld(false); }}
      onClick={toggles ? () => setSaved((v) => !v) : undefined}
    >
      <Icon size={36} color={color} trigger="none" hover={turn || held || playing} active={toggles ? saved : undefined} />
    </div>
  );
});

/** The homepage icon grid: each icon loops its motion on its own beat while on screen. */
export function HeroWall() {
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const beat = useHeroBeat(running);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting));
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mx-auto grid w-full max-w-xl grid-cols-5 gap-tiles lg:max-w-none">
      {WALL.map((Icon, i) => {
        const line = STORY.findIndex((s) => s.Icon === Icon);
        return <WallTile key={i} Icon={Icon} color={COLORS[i % COLORS.length]} offset={offsetOf(i)} running={running} index={i} told={line >= 0} playing={line >= 0 && line === beat} />;
      })}
    </div>
  );
}

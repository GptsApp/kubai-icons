"use client";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { RiAddLine } from "@remixicon/react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Hsv = { h: number; s: number; v: number };

function hexToHsv(hex: string, hue = 0): Hsv {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => c / 255);
  const max = Math.max(r, g, b), d = max - Math.min(r, g, b);
  let h = hue;
  if (d) {
    h = max === r ? ((g - b) / d + 6) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
  }
  return { h, s: max ? d / max : 0, v: max };
}
function hsvToHex({ h, s, v }: Hsv) {
  const channel = (k: number) => {
    const a = (k + h / 60) % 6;
    const c = Math.round((v - v * s * Math.max(0, Math.min(a, 4 - a, 1))) * 255);
    return c.toString(16).padStart(2, "0");
  };
  return `#${channel(5)}${channel(3)}${channel(1)}`.toUpperCase();
}
const clamp = (n: number) => Math.max(0, Math.min(1, n));

/** Reports the pointer's position inside the element, from 0 to 1, for as long as it is held. */
const dragHandlers = (onMove: (x: number, y: number) => void) => {
  const report = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    onMove(clamp((e.clientX - r.left) / r.width), clamp((e.clientY - r.top) / r.height));
  };
  return {
    onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => { e.currentTarget.setPointerCapture(e.pointerId); report(e); },
    onPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) report(e); },
  };
};

const Knob = ({ color, style }: { color: string; style: React.CSSProperties }) => (
  <span className="pointer-events-none absolute size-3.5 -translate-1/2 rounded-pill border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0/0.2)]" style={{ ...style, background: color }} />
);

// Applying a colour redraws every icon on screen, so a drag applies it a few times a second.
const APPLY_EVERY = 90;

function Panel({ value, onChange, hexLabel }: { value: string; onChange: (hex: string) => void; hexLabel: string }) {
  const [hsv, setHsv] = useState(() => hexToHsv(value));
  const [text, setText] = useState(value.toUpperCase());
  const latest = useRef(value);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const apply = (hex: string) => {
    latest.current = hex;
    if (timer.current) return;
    timer.current = setTimeout(() => { timer.current = null; onChange(latest.current); }, APPLY_EVERY);
  };
  const pick = (next: Hsv) => {
    const hex = hsvToHex(next);
    setHsv(next);
    setText(hex);
    apply(hex);
  };
  const type = (raw: string) => {
    setText(raw);
    const hex = (raw.startsWith("#") ? raw : `#${raw}`).toUpperCase();
    if (/^#[0-9A-F]{6}$/.test(hex)) { setHsv(hexToHsv(hex, hsv.h)); apply(hex); }
  };
  const hex = hsvToHex(hsv), pure = `hsl(${hsv.h} 100% 50%)`;
  return (
    <>
      <div
        aria-hidden
        {...dragHandlers((x, y) => pick({ ...hsv, s: x, v: 1 - y }))}
        className="relative h-36 cursor-crosshair touch-none rounded-control"
        style={{ background: `linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,transparent),${pure}` }}
      >
        <Knob color={hex} style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }} />
      </div>
      <div
        aria-hidden
        {...dragHandlers((x) => pick({ ...hsv, h: Math.min(359.9, x * 360) }))}
        className="relative h-3 cursor-pointer touch-none rounded-pill pointer-coarse:h-6"
        style={{ background: "linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)" }}
      >
        <Knob color={pure} style={{ left: `${(hsv.h / 360) * 100}%`, top: "50%" }} />
      </div>
      <Input value={text} onChange={(e) => type(e.target.value)} maxLength={7} spellCheck={false} aria-label={hexLabel} className="h-8 font-mono text-code pointer-coarse:h-10 pointer-coarse:text-field" />
    </>
  );
}

/** A round button that opens a colour panel: saturation and brightness, hue, and a hex field. */
export function ColorPicker({ value, active, onChange, label, hexLabel }: {
  value: string;
  active: boolean;
  onChange: (hex: string) => void;
  label: string;
  hexLabel: string;
}) {
  return (
    <Popover>
      <PopoverTrigger
        aria-label={label}
        title={label}
        className={cn("focus-inset grid size-8 shrink-0 place-items-center rounded-pill text-muted-foreground ring-inset transition-shadow hover:ring-2 hover:ring-foreground/20 pointer-coarse:size-9", active && "ring-2 ring-foreground/60 hover:ring-foreground/60")}
      >
        <span className={cn("grid size-6 place-items-center rounded-pill pointer-coarse:size-7", !active && "border")} style={active ? { background: value } : undefined}>
          {!active && <RiAddLine className="size-3.5" />}
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={10} className="w-56 gap-3 rounded-card p-3">
        <Panel value={value} onChange={onChange} hexLabel={hexLabel} />
      </PopoverContent>
    </Popover>
  );
}

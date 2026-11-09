"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Glide } from "@/components/kit/glide";
import { cn } from "@/lib/utils";

/** A pixel size set by a common preset, by dragging, or by typing a number. */
export function SizeControl({ value, onChange, min, max, presets, label, commonLabel, pixelsLabel, className }: {
  value: number;
  onChange: (size: number) => void;
  min: number;
  max: number;
  presets: number[];
  label: string;
  commonLabel: string;
  pixelsLabel: string;
  className?: string;
}) {
  // What is being typed, which may be unfinished or out of range. Null when not typing.
  const [draft, setDraft] = useState<string | null>(null);
  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  const type = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 3);
    setDraft(digits);
    const n = Number(digits);
    if (digits && n >= min && n <= max) onChange(n);
  };
  const finish = () => {
    if (draft) onChange(clamp(Number(draft)));
    setDraft(null);
  };
  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") e.currentTarget.blur();
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      setDraft(null);
      onChange(clamp(value + (e.key === "ArrowUp" ? 1 : -1) * (e.shiftKey ? 10 : 1)));
    }
  };

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div role="group" aria-label={commonLabel} className="relative isolate flex shrink-0">
        <Glide selector="[aria-pressed=true]" className="rounded-control bg-muted" />
        {presets.map((size) => {
          const on = size === value;
          return (
            <button
              key={size}
              type="button"
              aria-pressed={on}
              onClick={() => { setDraft(null); onChange(size); }}
              className={cn(
                "h-7 min-w-7 rounded-control px-1 text-caption tabular-nums transition-colors pointer-coarse:h-9 pointer-coarse:min-w-9",
                on ? "bg-muted text-foreground in-[[data-glide]]:bg-transparent" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {size}
            </button>
          );
        })}
      </div>
      <div className="min-w-16 flex-1 lg:w-28 lg:flex-none">
        <Slider aria-label={label} value={[value]} min={min} max={max} step={1} onValueChange={(v) => { setDraft(null); onChange(Array.isArray(v) ? v[0] : (v as number)); }} />
      </div>
      <Input
        value={draft ?? String(value)}
        onChange={(e) => type(e.target.value)}
        onBlur={finish}
        onKeyDown={onKey}
        onFocus={(e) => e.target.select()}
        inputMode="numeric"
        aria-label={pixelsLabel}
        className="h-7 w-11 shrink-0 px-1 text-center text-caption tabular-nums pointer-coarse:h-9 pointer-coarse:w-12 pointer-coarse:text-field"
      />
    </div>
  );
}

"use client";
import { ColorPicker } from "@/components/kit/color-picker";
import { Glide } from "@/components/kit/glide";
import { cn } from "@/lib/utils";

/** Colour swatches with a custom colour panel at the end. Each button's edge is where its selection ring sits, so the ring stays inside the group. */
export function Swatches({ value, options, onChange, label, customLabel, hexLabel, className }: {
  value: string;
  options: { value: string; name: string; fill?: string }[];
  onChange: (v: string) => void;
  label: string;
  customLabel: string;
  hexLabel: string;
  className?: string;
}) {
  const cur = value.toLowerCase();
  const custom = !options.some((o) => o.value.toLowerCase() === cur);
  return (
    <div className={cn("relative isolate flex flex-wrap items-center", className)} role="radiogroup" aria-label={label}>
      {options.map((o) => {
        const on = o.value.toLowerCase() === cur;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={o.name}
            title={o.name}
            onClick={() => onChange(o.value)}
            className={cn("focus-inset size-8 shrink-0 rounded-pill p-1 ring-inset transition-shadow pointer-coarse:size-10", on ? "ring-2 ring-foreground/60 in-[[data-glide]]:ring-0" : "hover:ring-2 hover:ring-foreground/20")}
            style={{ background: `${o.fill ?? o.value} content-box` }}
          />
        );
      })}
      <Glide selector="[aria-checked=true]" className="rounded-pill ring-2 ring-foreground/60 ring-inset in-[[role=radiogroup]:has([aria-checked=true]:focus-visible)]:ring-foreground" />
      <ColorPicker value={value.startsWith("#") ? value : "#5393FF"} active={custom} onChange={onChange} label={customLabel} hexLabel={hexLabel} />
    </div>
  );
}

// The accent colours. Free of React, so the server can colour icon images the same way the
// browser colours the grid.
export const SWATCHES = [
  { name: "Blue", value: "#5393FF" },
  { name: "Violet", value: "#8B5CF6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Orange", value: "#F97316" },
  { name: "Green", value: "#22C55E" },
  { name: "Ink", value: "#2E3036" },
];
const HUES = SWATCHES.slice(0, 5).map((s) => s.value);
/** The swatch that stands for the mixed colours. */
export const MIXED_FILL = `conic-gradient(${HUES.map((c, i) => `${c} ${(i * 100) / HUES.length}% ${((i + 1) * 100) / HUES.length}%`).join(",")})`;

const hueIndex = (name: string) => {
  let h = 2166136261;
  for (let i = 0; i < name.length; i++) h = Math.imul(h ^ name.charCodeAt(i), 16777619);
  return (h >>> 0) % HUES.length;
};
/** An icon's colour in mixed mode when it is not shown in the grid. */
export const mixedColor = (name: string) => HUES[hueIndex(name)];
/** One colour per icon in grid order; an icon never matches the one beside or above it. */
export function mixedColors(names: string[], cols: number) {
  const picks: number[] = [];
  names.forEach((name, i) => {
    const left = i % cols ? picks[i - 1] : -1, above = i >= cols ? picks[i - cols] : -1;
    let pick = hueIndex(name);
    while (pick === left || pick === above) pick = (pick + 1) % HUES.length;
    picks.push(pick);
  });
  return picks.map((p) => HUES[p]);
}

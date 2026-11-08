// Downloads and copies. The live markup takes its colours from CSS (color-mix over
// currentColor); for files that work in design tools, every colour is read back from the
// browser's computed styles and written as a plain hex attribute.
import { portableShadow, toSvg, type KubaiIconData } from "kubai-icons";

const toHex = (c: string) => {
  const m = c.match(/[\d.]+/g);
  if (!m) return c;
  const isFloat = c.startsWith("color(");
  const v = m.slice(0, 3).map((n) => Math.round(isFloat ? Number(n) * 255 : Number(n)));
  return "#" + v.map((n) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0")).join("").toUpperCase();
};
const PROPS = ["fill", "stroke", "stop-color", "flood-color"] as const;

/** A standalone SVG with exact colours for one accent and variant. */
export function resolvedSvg(icon: KubaiIconData, { color, variant, badgeColor, size = 96, pad = 2.5 }: { color: string; variant: "color" | "soft"; badgeColor?: string; size?: number; pad?: number }) {
  const host = document.createElement("div");
  host.style.cssText = "position:fixed;left:-9999px;top:0;visibility:hidden";
  host.innerHTML = toSvg(icon, { color, variant, badgeColor, size, id: `x${`${icon.name}${variant}${color}${badgeColor ?? ""}`.replace(/[^a-zA-Z0-9]/g, "")}` });
  document.body.append(host);
  const svg = host.querySelector("svg")!;
  for (const el of svg.querySelectorAll<SVGElement>("[style]")) {
    const cs = getComputedStyle(el);
    for (const p of PROPS) {
      if (el.style.getPropertyValue(p)) el.setAttribute(p, toHex(cs.getPropertyValue(p)));
    }
    el.removeAttribute("style");
  }
  svg.removeAttribute("style");
  svg.removeAttribute("class");
  svg.removeAttribute("overflow");
  svg.removeAttribute("aria-hidden");
  for (const el of svg.querySelectorAll("[data-n]")) el.removeAttribute("data-n");
  const shadow = svg.querySelector('filter[id^="sh-"]');
  const flood = shadow?.querySelector("feFlood");
  if (shadow && flood) shadow.innerHTML = portableShadow(flood.getAttribute("flood-color")!, Number(flood.getAttribute("flood-opacity")));
  const side = 31 + pad * 2;
  svg.setAttribute("viewBox", `${15.5 - side / 2} ${12.5 - side / 2} ${side} ${side}`);
  const text = svg.outerHTML;
  host.remove();
  return text;
}

export function download(name: string, blob: Blob) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  // Safari reads the blob after the click returns, sometimes well after.
  setTimeout(() => URL.revokeObjectURL(a.href), 60_000);
}

/** Loads an SVG data URL into an image. Safari can reject decode() for images that still load. */
export async function loadSvgImage(url: string) {
  const img = new Image();
  img.src = url;
  try {
    await img.decode();
  } catch {
    if (!img.complete || !img.naturalWidth) {
      await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
    }
  }
  return img;
}

export async function svgToPng(svg: string, size: number): Promise<Blob> {
  // The image's intrinsic size has to be the output size; see iconUrl in kit/icon-image.
  const sized = svg.replace(/^<svg\b[^>]*>/, (tag) => tag.replace(/\swidth="[^"]*"/, ` width="${size}"`).replace(/\sheight="[^"]*"/, ` height="${size}"`));
  const img = await loadSvgImage("data:image/svg+xml;charset=utf-8," + encodeURIComponent(sized));
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  canvas.getContext("2d")!.drawImage(img, 0, 0, size, size);
  return new Promise((res) => canvas.toBlob((b) => res(b!), "image/png"));
}

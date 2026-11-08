import * as library from "kubai-icons";
import type { KubaiIconData } from "kubai-icons";
import { baseIcons } from "@/lib/catalog";
import { pascal } from "@/lib/icons";
import { mixedColor } from "@/lib/palette";

export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => baseIcons().map((i) => ({ name: i.name }));

// A standalone image of the icon at rest, in the colour the grid gives it.
export async function GET(_: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const icon = (library as unknown as Record<string, KubaiIconData>)[pascal(name)];
  // WebKit renders masks in an SVG image at its intrinsic size, so that size stays generous.
  const svg = library.toSvg(icon, { color: mixedColor(name), size: 512, id: "k" });
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
}

import { pageMeta } from "@/lib/seo";
import { Prose, Title } from "@/components/docs/prose";
import { REPO } from "@/lib/site";

export const metadata = pageMeta({ title: "Icon design language", path: "/docs/design/", description: "The canvas, keylines, layers, outlines, color and motion rules behind Kubai Icons, for designers and contributors." });

export default function Page() {
  return (
    <Prose>
      <Title lead={"The canvas, layers, outlines, color, marks and motion shared by all icons. Measurements are in canvas units."}>
        Design language
      </Title>
      <div className="my-5 space-y-5">
          <h2>Canvas</h2>
          <p>Icons are drawn on a canvas of 31×29 units, with the artwork centered on (15.5, 12.5). Four keylines, which are guide shapes that keep icons the same visual size, set the outer bounds: a circle 23 units across, a 20.6-unit square, a 23×18.4 landscape rectangle and an 18.4×23 portrait rectangle. Icons are centered, not bottom-aligned.</p>
          <h2>Layers</h2>
          <p>An icon has a mid-tone back piece with a drop shadow, and usually a lighter front piece with a soft highlight along its top edge. White content, such as a symbol or lines, can sit between the two. An icon with no front piece has white content large enough to form a second layer. The top corners of the front piece are rounded separately, which exposes the back piece at the corners.</p>
          <h2>Outlines and corners</h2>
          <p>Outlines are 1 unit wide and sit outside the fill. The corner radius is 2.2 for the body of an icon (3.2 including the outline) and 1.2 for content. A colored band inside an outline is at least 2 units wide, or is left out.</p>
          <h2>Color</h2>
          <p>Each tone is designed against a reference blue, then shifted to the accent color while keeping its lightness relative to that accent. Marks are white on mid-tone pieces and dark on light pieces.</p>
          <h2>Marks</h2>
          <p>Marks are the lines and symbols drawn on an icon. Content lines use a stroke of 1.6, directional marks such as arrows use 2.2, and outlines use 1. Pointer-like parts are an exception and use 2.6 or 2.0. The smallest element is 2.4 units. Arrowheads are solid triangles.</p>
          <h2>Motion</h2>
          <p>Motion has two keyframes, the rest pose and the hover pose, and runs for 460ms. An icon acts out only what the real object does: a folder opens, an envelope unseals, a calendar turns a page. Motion does not stand in for an abstract idea.</p>
          <p>The complete rules are in <a href={`${REPO}/blob/master/PROMPT.md`}>PROMPT.md</a>, which is written in Simplified Chinese.</p>
        </div>
    </Prose>
  );
}

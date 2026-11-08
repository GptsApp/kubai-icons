// Class merging that knows the site's design tokens. Without this, a token such as
// `text-caption` would read as a colour and be dropped next to `text-muted-foreground`.
import { createCn } from "cn/config";

const TEXT = ["display", "title", "heading", "subheading", "lead", "body", "field", "control", "code", "caption"];
const SPACING = ["gutter", "section", "header", "panel", "card", "tiles"];
const RADIUS = ["control", "card", "tile", "panel", "pill"];

export const cn = createCn({
  extend: {
    theme: { spacing: SPACING, radius: RADIUS, text: TEXT },
    classGroups: { "font-size": [{ text: TEXT }] },
  },
});

// Shared class recipes. Every surface, list item and chip on the site comes from here, so
// spacing, radius and colour change in one place.
import { cva } from "class-variance-authority";

/** The soft square behind an icon: grid tiles, previews, the home page wall. */
export const tile = cva("grid place-items-center rounded-tile bg-surface outline-none transition-[background-color,box-shadow,scale] duration-150 focus-visible:ring-2 focus-visible:ring-ring", {
  variants: {
    interactive: { true: "hover:bg-surface-hover active:scale-[.97] motion-reduce:active:scale-100", false: "" },
    active: { true: "bg-surface-hover ring-1 ring-foreground/20 in-[[data-glide]]:bg-transparent in-[[data-glide]]:ring-0", false: "" },
  },
  defaultVariants: { interactive: true, active: false },
});

/** A row in a side list: icon categories, docs pages. */
export const navItem = cva("flex w-full items-center gap-2 rounded-control px-2.5 py-1.5 text-left text-control transition-colors", {
  variants: {
    active: {
      true: "bg-muted text-foreground in-[[data-glide]]:bg-transparent",
      false: "text-muted-foreground hover:bg-surface hover:text-foreground",
    },
  },
  defaultVariants: { active: false },
});

/** A small rounded filter button. */
export const chip = cva("inline-flex h-7 shrink-0 items-center rounded-pill border px-3 text-caption transition-colors pointer-coarse:h-9", {
  variants: {
    active: { true: "border-foreground/30 bg-muted text-foreground in-[[data-glide]]:border-transparent in-[[data-glide]]:bg-transparent", false: "text-muted-foreground hover:text-foreground" },
  },
  defaultVariants: { active: false },
});

/** A bordered block: code, install commands, small cards. */
export const card = "rounded-card border bg-muted/40";
/** A large bordered area: toolbars, feature grids. */
export const panel = "rounded-panel border bg-background";
/** A control that stands off the page: the moving thumb of a switch or slider. */
export const raised = "border border-(--button-raised-border) bg-[image:var(--button-raised)] bg-clip-border [background-origin:border-box] shadow-(--button-raised-shadow)";
/** The recessed track a raised thumb sits in. */
export const well = "bg-(--control-well) shadow-(--control-well-shadow)";
/** A quiet text link. */
export const quietLink = "text-muted-foreground transition-colors hover:text-foreground";

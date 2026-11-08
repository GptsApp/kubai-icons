import { createElement } from "react";
import { Heart } from "kubai-icons-react";
import { toast } from "sonner";
import { asset } from "./site";

const KEY = "kubai-sponsor-nudged";
/** Lets the copy or download confirmation appear first. */
const DELAY = 1200;

let host: (() => boolean) | null = null;

/**
 * Lets an open surface show the message itself. `show` returns false when it has no room,
 * and the message falls back to a toast. Returns a function that removes the host.
 */
export function hostSponsorNudge(show: () => boolean) {
  host = show;
  return () => {
    if (host === show) host = null;
  };
}

/** Mentions sponsorship after someone takes an icon, once per browser session. */
export function nudgeSponsor() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, "1");
  } catch {
    return;
  }
  window.setTimeout(() => {
    if (host?.()) return;
    toast("Kubai Icons is free to use.", {
      icon: createElement(Heart, { size: 16, color: "#EC4899" }),
      action: { label: "Sponsor", onClick: () => window.open(asset("/sponsor/"), "_blank", "noopener") },
    });
  }, DELAY);
}

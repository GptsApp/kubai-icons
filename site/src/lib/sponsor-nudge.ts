import { createElement } from "react";
import { Heart } from "kubai-icons-react";
import { toast } from "sonner";
import { browserLocale, localize, pick } from "./i18n";
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
    const locale = browserLocale();
    toast(pick(locale, "Kubai Icons is free to use.", "Kubai Icons 免费使用"), {
      icon: createElement(Heart, { size: 16, color: "#EC4899" }),
      action: { label: pick(locale, "Sponsor", "赞助"), onClick: () => window.open(asset(localize("/sponsor/", locale)), "_blank", "noopener") },
    });
  }, DELAY);
}

"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { RiGithubLine } from "@remixicon/react";
import { Star } from "kubai-icons-react";
import { Button } from "./ui/button";
import { REPO, fetchStars } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useTr } from "@/lib/use-locale";

const KEY = "kubai-github-stars";
/** How long a reading is reused. GitHub allows each visitor 60 unauthenticated requests an hour. */
const FRESH = 5 * 60 * 1000;
/** The count at build time, so the first paint already has a number. */
const AT_BUILD = Number(process.env.NEXT_PUBLIC_GITHUB_STARS) || null;

type Reading = { stars: number | null; at: number };

const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

function load(): Reading | null {
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
}
function save(reading: Reading) {
  try { localStorage.setItem(KEY, JSON.stringify(reading)); } catch { /* ignore */ }
}

/** A link to the repository showing its current star count. */
export function GitHubStars({ className }: { className?: string }) {
  const tr = useTr();
  const [stars, setStars] = useState(AT_BUILD);

  // A saved count is shown before the first paint of the app, so it never visibly swaps.
  useLayoutEffect(() => {
    const saved = load();
    if (saved?.stars != null) setStars(saved.stars);
  }, []);

  useEffect(() => {
    let live = true;
    const refresh = async () => {
      const saved = load();
      if (document.hidden || (saved && Date.now() - saved.at < FRESH)) return;
      // Stamped before asking, so other tabs wait and a failed request is not repeated at once.
      save({ stars: saved?.stars ?? null, at: Date.now() });
      const next = await fetchStars();
      if (next === null) return;
      save({ stars: next, at: Date.now() });
      if (live) setStars(next);
    };
    refresh();
    const timer = window.setInterval(refresh, FRESH);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      live = false;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  const label = stars === null ? "GitHub" : tr("{count} stars on GitHub", "GitHub 星标数：{count}", { count: stars.toLocaleString("en") });
  return (
    <Button
      variant="outline"
      data-kubai-trigger
      aria-label={label}
      title={label}
      className={cn("gap-0 px-2 text-muted-foreground tabular-nums", className)}
      render={<a href={REPO} target="_blank" rel="noreferrer" />}
    >
      {/* Narrow bars keep the count, which says more than the logo does. */}
      <RiGithubLine className="size-[18px] max-sm:hidden" />
      <span className="inline-flex h-4 items-center gap-1 sm:ms-2 sm:border-s sm:ps-2">
        <Star size={16} color="#F59E0B" trigger="parent" className="size-4" />
        {/* Three digits of room are held even before a count is known. */}
        <span className="inline-block min-w-[3ch]">{stars === null ? "" : compact.format(stars)}</span>
      </span>
    </Button>
  );
}

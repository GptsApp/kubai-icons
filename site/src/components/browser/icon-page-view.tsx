"use client";
import { useState } from "react";
import type { Category, IconMeta } from "@/lib/icons";
import { iconLabel } from "@/lib/seo";
import { asset } from "@/lib/site";
import { IconDetail } from "./icon-detail";
import { MIXED, mixedColor, usePrefs } from "./prefs";

/** The icon's page: the panel from the browser, showing the icon or one of its badged versions. */
export function IconPageView({ meta, related, categories }: { meta: IconMeta; related: IconMeta[]; categories: Category[] }) {
  const [prefs, setPrefs] = usePrefs();
  const [current, setCurrent] = useState(meta);
  return (
    <div className="max-w-3xl overflow-hidden rounded-panel border">
      <IconDetail
        meta={current}
        related={related}
        categories={categories}
        color={prefs.color === MIXED ? mixedColor(meta.name) : prefs.color}
        variant={prefs.variant}
        badge={prefs.badge}
        onBadge={(badge) => setPrefs({ badge })}
        onOpen={setCurrent}
        title="h1"
        description="p"
        // Shown in the page's HTML until the live icon has loaded.
        placeholder={current.name === meta.name ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(`/icons/${meta.name}/preview.svg`)} alt={`${iconLabel(meta.name)} icon`} width={128} height={128} />
        ) : null}
      />
    </div>
  );
}

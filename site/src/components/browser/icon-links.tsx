import Link from "next/link";
import { tile } from "@/components/kit/styles";
import type { IconMeta } from "@/lib/icons";
import { iconLabel } from "@/lib/seo";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";

/** A grid of plain links to icon pages. Each icon is an image, so a long list stays light. */
export function IconLinks({ icons }: { icons: IconMeta[] }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-tiles">
      {icons.map((i) => (
        <li key={i.name}>
          <Link href={`/icons/${i.name}/`} prefetch={false} className={cn(tile(), "aspect-[4/3] w-full content-center sm:aspect-square gap-2 p-2 text-center")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(`/icons/${i.name}/preview.svg`)} alt={`${iconLabel(i.name)} icon`} width={40} height={40} loading="lazy" decoding="async" />
            <span className="w-full truncate font-mono text-caption text-muted-foreground">{i.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

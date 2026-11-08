import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";
import { RiTwitterXLine } from "@remixicon/react";
import { AuthorLink } from "@/components/author-link";
import { JsonLd } from "@/components/json-ld";
import { SkillPrompt } from "@/components/skill-prompt";
import { absolute, HOME_DESCRIPTION, HOME_TITLE, pageMeta, SITE_NAME } from "@/lib/seo";
import { AUTHOR, MODULE_DEMO, REPO } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { InstallTabs } from "@/components/install-tabs";
import { Container } from "@/components/kit/layout";
import { HeroWall } from "@/components/hero-wall";
import { HeroBadge } from "@/components/hero-badge";
import { HeroHeadline } from "@/components/hero-headline";
import { FeatureCards } from "@/components/feature-cards";
import { iconCount, moduleBytes } from "@/lib/catalog";

export const metadata = pageMeta({ fullTitle: HOME_TITLE, path: "/", description: HOME_DESCRIPTION });

export default function Home() {
  return (
    <Container>
      <JsonLd
        data={[
          { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: absolute("/") },
          {
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: SITE_NAME,
            description: HOME_DESCRIPTION,
            url: absolute("/"),
            codeRepository: REPO,
            programmingLanguage: ["JavaScript", "TypeScript"],
            license: "https://opensource.org/license/mit",
            author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.x },
          },
        ]}
      />
      <section className="grid gap-12 py-section lg:min-h-[calc(100svh-var(--header))] lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="space-y-7">
          <div className="space-y-4">
            <div className="rise-in"><HeroBadge count={iconCount()} /></div>
            <HeroHeadline className="rise-in font-heading text-display font-semibold [--i:1]" />
            <p className="rise-in max-w-xl text-lead text-muted-foreground text-pretty [--i:2]">
              Hover or tap any icon to see it move. Open-source animated icons for React, Vue and the web.
            </p>
            <p className="rise-in text-control text-muted-foreground [--i:2]">
              Designed by{" "}
              <AuthorLink place="home" className="tap relative inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline">
                <RiTwitterXLine className="size-3.5" aria-hidden />{AUTHOR.name}
              </AuthorLink>
            </p>
          </div>
          <div className="rise-in flex flex-wrap gap-3 [--i:3]">
            <Button size="xl" render={<Link href="/icons/" />}>
              Browse icons
              <RiArrowRightLine data-icon="inline-end" className="transition-[translate] duration-200 group-hover/button:translate-x-0.5 motion-reduce:transition-none" />
            </Button>
            <Button size="xl" variant="outline" render={<Link href="/docs/" />}>Documentation</Button>
          </div>
          <div className="rise-in [--i:4]"><InstallTabs /></div>
        </div>
        <HeroWall />
      </section>

      <FeatureCards className="reveal" moduleBytes={moduleBytes(MODULE_DEMO)} />
      <SkillPrompt className="reveal mt-6 rounded-panel px-panel py-5" />
    </Container>
  );
}

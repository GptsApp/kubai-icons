import Link from "next/link";
import { RiArrowRightSLine, RiTwitterXLine } from "@remixicon/react";
import { AuthorLink } from "@/components/author-link";
import { JsonLd } from "@/components/json-ld";
import { SkillPrompt } from "@/components/skill-prompt";
import { absolute, HOME_DESCRIPTION, HOME_DESCRIPTION_ZH, SITE_NAME } from "@/lib/seo";
import { localize, pick, type Locale } from "@/lib/i18n";
import { AUTHOR, MODULE_DEMO, REPO } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { InstallTabs } from "@/components/install-tabs";
import { Container } from "@/components/kit/layout";
import { HeroWall } from "@/components/hero-wall";
import { HeroBadge } from "@/components/hero-badge";
import { HeroHeadline } from "@/components/hero-headline";
import { FeatureCards } from "@/components/feature-cards";
import { iconCount, moduleBytes } from "@/lib/catalog";

/** The home page, in either language. */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <Container>
      <JsonLd
        data={[
          { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: absolute(localize("/", locale)) },
          {
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: SITE_NAME,
            description: pick(locale, HOME_DESCRIPTION, HOME_DESCRIPTION_ZH),
            url: absolute(localize("/", locale)),
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
              {pick(locale, "Hover or tap any icon to see it move. Open-source animated icons for React, Vue and the web.", "开源图标库，每个图标都有专属动效")}
            </p>
            <p className="rise-in flex items-center gap-1.5 text-control text-muted-foreground [--i:2]">
              {pick(locale, "Designed by", "设计")}
              <AuthorLink place="home" className="tap relative inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline">
                <RiTwitterXLine className="size-3.5" aria-hidden />{AUTHOR.name}
              </AuthorLink>
            </p>
          </div>
          <div className="rise-in flex flex-wrap gap-3 [--i:3]">
            <Button size="xl" render={<Link href={localize("/icons/", locale)} />}>
              {pick(locale, "Browse icons", "浏览图标")}
              <RiArrowRightSLine data-icon="inline-end" className="transition-[translate] duration-200 group-hover/button:translate-x-0.5 motion-reduce:transition-none" />
            </Button>
            <Button size="xl" variant="outline" render={<Link href={localize("/docs/", locale)} />}>{pick(locale, "Documentation", "查看文档")}</Button>
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

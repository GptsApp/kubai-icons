import { DocsFooter } from "@/components/docs/docs-footer";
import { DocsNav } from "@/components/docs/docs-nav";
import { Container } from "@/components/kit/layout";
import { PageFade } from "@/components/kit/page-fade";

// Docs, Skill and License share this frame, so moving between them changes only the
// article. The minimum height keeps the footer below the fold on short pages.
export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="min-h-[calc(100dvh-var(--header))] pt-2 md:grid md:grid-cols-[200px_1fr] md:content-start md:gap-10 md:pt-10">
      <aside className="sticky top-header z-20 -mx-gutter min-w-0 bg-background/80 px-gutter py-2 backdrop-blur-xl max-md:mb-4 md:top-[calc(var(--header)+2.5rem)] md:mx-0 md:max-h-[calc(100dvh-var(--header)-3.5rem)] md:self-start md:overflow-y-auto md:bg-transparent md:p-0 md:backdrop-blur-none">
        <DocsNav />
      </aside>
      <div className="min-w-0"><PageFade>{children}<DocsFooter /></PageFade></div>
    </Container>
  );
}

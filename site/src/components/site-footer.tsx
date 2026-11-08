import Link from "next/link";
import { AuthorLink } from "@/components/author-link";
import { FeedbackLink } from "@/components/feedback-link";
import { AUTHOR, REPO } from "@/lib/site";
import { Container } from "@/components/kit/layout";
import { quietLink } from "@/components/kit/styles";
import { cn } from "@/lib/utils";

const link = cn("tap relative", quietLink);

export function SiteFooter() {
  return (
    <footer className="mt-section border-t">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-6 text-caption text-muted-foreground">
        <span>Kubai Icons by <AuthorLink place="footer" className={cn(link, "font-medium text-foreground")}>{AUTHOR.name}</AuthorLink></span>
        <nav className="flex flex-wrap gap-x-5 gap-y-3">
          <Link href="/sponsor/" className={link}>Sponsor</Link>
          <FeedbackLink className={link}>Feedback</FeedbackLink>
          <Link href="/license/" className={link}>License</Link>
          <a href={`${REPO}/releases`} className={link}>Releases</a>
          <a href={REPO} className={link}>GitHub</a>
        </nav>
      </Container>
    </footer>
  );
}

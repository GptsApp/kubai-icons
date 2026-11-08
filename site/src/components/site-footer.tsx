import type { ReactNode } from "react";
import Link from "next/link";
import { RiGithubLine } from "@remixicon/react";
import { AuthorLink } from "@/components/author-link";
import { FeedbackLink } from "@/components/feedback-link";
import { Logo } from "@/components/logo";
import { AUTHOR, REPO } from "@/lib/site";
import { Container } from "@/components/kit/layout";
import { quietLink } from "@/components/kit/styles";
import { cn } from "@/lib/utils";

const link = cn("block w-fit py-1 pointer-coarse:py-2", quietLink);

const GITHUB = "https://github.com/kubai087";
const MORE = [
  { name: "Lumno", site: "https://lumno.kubai.design/", repo: `${GITHUB}/lumno-extension` },
  { name: "Lumno Web", site: "https://lumno.kubai.design/", repo: `${GITHUB}/lumno-web` },
  { name: "PRO Threads", site: "https://www.kubai.design/pro-threads/", repo: `${GITHUB}/pro-threads` },
  { name: "Glasswork", site: "https://www.kubai.design/glasswork/", repo: `${GITHUB}/glasswork` },
];

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <nav aria-label={title} className="space-y-2">
      <p className="text-caption font-medium text-foreground">{title}</p>
      <div className="text-control">{children}</div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-section border-t">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-8 py-12 md:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]">
        <div className="col-span-2 space-y-3 md:col-span-1">
          <Link href="/" className="flex w-fit items-center gap-2 text-subheading font-semibold">
            <Logo size={24} />
            Kubai Icons
          </Link>
          <p className="max-w-64 text-control text-pretty text-muted-foreground">Open-source animated icons for React, Vue and the web.</p>
        </div>
        <Column title="Library">
          <Link href="/icons/" className={link}>Icons</Link>
          <Link href="/icons/submit/" className={link}>Submit an icon</Link>
          <Link href="/docs/" className={link}>Docs</Link>
          <Link href="/skill/" className={link}>Skill</Link>
        </Column>
        <Column title="Project">
          <a href={REPO} className={link}>GitHub</a>
          <a href={`${REPO}/releases`} className={link}>Releases</a>
          <FeedbackLink className={link}>Feedback</FeedbackLink>
          <Link href="/sponsor/" className={link}>Sponsor</Link>
        </Column>
        <Column title="Legal">
          <Link href="/license/" className={link}>License</Link>
          <Link href="/docs/analytics/" className={link}>Privacy</Link>
        </Column>
        <Column title="More by Kubai087">
          {MORE.map((p) => (
            <div key={p.name} className="flex items-center gap-1.5">
              <a href={p.site} className={link}>{p.name}</a>
              <a href={p.repo} aria-label={`${p.name} on GitHub`} title={`${p.name} on GitHub`} className={cn("grid size-5 place-items-center pointer-coarse:size-8", quietLink)}>
                <RiGithubLine className="size-3.5" />
              </a>
            </div>
          ))}
          <a href="https://www.kubai.design/" className={link}>kubai.design</a>
        </Column>
      </Container>
      <div className="border-t">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-5 text-caption text-muted-foreground">
          <span>Icons and packages are MIT licensed.</span>
          <span>
            © {new Date().getFullYear()}{" "}
            <AuthorLink place="footer" className="tap relative font-medium text-foreground underline-offset-4 hover:underline">{AUTHOR.name}</AuthorLink>
          </span>
        </Container>
      </div>
    </footer>
  );
}

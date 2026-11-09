import type { ReactNode } from "react";
import { CodeBlock } from "@/components/code-block";

export function Prose({ children }: { children: ReactNode }) {
  return (
    <article className="max-w-3xl space-y-5 text-body text-foreground/90 [&_a:not([data-slot])]:font-medium [&_a:not([data-slot])]:text-foreground [&_a:not([data-slot])]:underline [&_a:not([data-slot])]:underline-offset-4 [&_code:not(pre_code)]:rounded-sm [&_code:not(pre_code)]:bg-muted [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-code [&_code:not(pre_code)]:[overflow-wrap:anywhere] [&_h2]:mt-12 [&_h2]:scroll-mt-28 md:[&_h2]:scroll-mt-20 [&_h2]:text-heading [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:text-subheading [&_h3]:font-semibold [&_li]:ms-5 [&_li]:list-disc [&_li]:ps-1 [&_table]:w-full [&_table]:text-control [&_td]:[overflow-wrap:anywhere] [&_td]:border-t [&_td]:py-2 [&_td]:pe-4 [&_td]:align-top [&_th]:pb-2 [&_th]:pe-4 [&_th]:text-start [&_th]:font-medium">
      {children}
    </article>
  );
}
export function Title({ children, lead }: { children: ReactNode; lead?: ReactNode }) {
  return (
    <header className="mb-8 space-y-3">
      <h1 className="font-heading text-title font-semibold">{children}</h1>
      {lead ? <p className="text-lead text-muted-foreground">{lead}</p> : null}
    </header>
  );
}
export const Code = ({ code, lang }: { code: string; lang?: string }) => <CodeBlock code={code} lang={lang} />;

import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";
import { card } from "./kit/styles";

export function CodeBlock({ code, lang, className, onCopy }: { code: string; lang?: string; className?: string; onCopy?: () => void }) {
  return (
    <div dir="ltr" className={cn("group relative", card, className)}>
      {lang ? <div className="border-b px-4 py-2 font-mono text-caption uppercase tracking-wider text-muted-foreground">{lang}</div> : null}
      <pre className="py-3.5 pe-12 ps-4 font-mono text-code whitespace-pre-wrap [overflow-wrap:anywhere]">
        <code>{code}</code>
      </pre>
      <CopyButton text={code} className="absolute top-2.5 end-2.5" />
    </div>
  );
}

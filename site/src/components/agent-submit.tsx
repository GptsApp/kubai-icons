"use client";
import Link from "next/link";
import { RiFileCopyLine } from "@remixicon/react";
import { copyText } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { submitPrompt } from "@/lib/site";
import { useLocale, useLocalize, useTr } from "@/lib/use-locale";

/** For people working with a coding agent: install the skill, or have the agent post the icon. */
export function AgentSubmit() {
  const locale = useLocale();
  const tr = useTr();
  const loc = useLocalize();
  return (
    <aside className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 rounded-card border px-5 py-4">
      <p className="text-body">
        {tr("Hand it to an AI agent", "交给 AI / Agent")}
        <Link href={`${loc("/docs/contributing/")}#submit-an-icon`} target="_blank" rel="noreferrer" className="tap relative ml-3 text-control text-muted-foreground underline underline-offset-4 hover:text-foreground">{tr("Guide", "说明")}</Link>
      </p>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" render={<Link href={loc("/skill/")} />}>{tr("Install the skill", "安装 Skill")}</Button>
        <Button variant="outline" onClick={() => { copyText(submitPrompt(locale)); track("icon_submit", { via: "agent_prompt" }); }}>
          <RiFileCopyLine data-icon="inline-start" />
          {tr("Copy submit prompt", "复制提交提示词")}
        </Button>
      </div>
    </aside>
  );
}

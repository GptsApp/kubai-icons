"use client";
import { useState } from "react";
import { RiFileCopyLine } from "@remixicon/react";
import { copyText } from "@/components/copy-button";
import { Segmented } from "@/components/kit/segmented";
import { card } from "@/components/kit/styles";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { track } from "@/lib/analytics";
import { productPrompt, slidesPrompt } from "@/lib/site";
import { useLocale, useTr } from "@/lib/use-locale";
import { cn } from "@/lib/utils";

type Use = "product" | "slides";

/** Opens the prompts that hand the icons to an agent, one for each way of using them. */
export function AgentGuide() {
  const locale = useLocale();
  const tr = useTr();
  const [use, setUse] = useState<Use>("product");
  const prompts: Record<Use, string> = { product: productPrompt(locale), slides: slidesPrompt(locale) };
  const copy = () => {
    copyText(prompts[use]);
    track("install_copy", { pkg: `agent_${use}` });
  };
  return (
    <Dialog>
      <DialogTrigger render={<Button size="xl" variant="outline" data-kubai-trigger />}>
        {tr("Ask your agent", "交给 Agent")}
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-4 overflow-y-auto p-panel sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-subheading font-semibold">{tr("Ask your agent", "交给 Agent")}</DialogTitle>
          <DialogDescription>{tr("Copy this and send it to your agent.", "复制下面的提示词，发给你的 Agent")}</DialogDescription>
        </DialogHeader>
        <Segmented
          value={use}
          onChange={setUse}
          label={tr("What the icons are for", "图标的用途")}
          options={[
            { value: "product", label: tr("In my product", "用在产品里") },
            { value: "slides", label: tr("Slides or documents", "用在 PPT 或文档") },
          ]}
        />
        {/* Both prompts hold their space, so the dialog keeps its height between them. */}
        <div className="grid *:[grid-area:1/1]">
          {(Object.keys(prompts) as Use[]).map((key) => (
            <pre key={key} className={cn(card, "px-4 py-3.5 font-mono text-code whitespace-pre-wrap [overflow-wrap:anywhere]", key !== use && "invisible")}>
              {prompts[key]}
            </pre>
          ))}
        </div>
        <Button size="xl" onClick={copy}>
          <RiFileCopyLine data-icon="inline-start" />
          {tr("Copy prompt", "复制提示词")}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

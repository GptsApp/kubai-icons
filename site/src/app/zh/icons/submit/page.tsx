import type { Metadata } from "next";
import { AgentSubmit } from "@/components/agent-submit";
import { Heading, NarrowPage } from "@/components/kit/layout";
import { SubmitForm } from "@/components/submit-form";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "提交图标",
  path: "/zh/icons/submit/",
  description: "提交使用 Kubai Icons Skill 或手工绘制的图标。收录后加入开源图标库并署名。",
});

export default function SubmitPage() {
  return (
    <NarrowPage>
      <Heading level={1} title="提交图标" />
      <SubmitForm />
      <AgentSubmit />
    </NarrowPage>
  );
}

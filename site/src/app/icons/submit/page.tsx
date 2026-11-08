import type { Metadata } from "next";
import { AgentSubmit } from "@/components/agent-submit";
import { Heading, NarrowPage } from "@/components/kit/layout";
import { SubmitForm } from "@/components/submit-form";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Submit an icon",
  path: "/icons/submit/",
  description: "Submit an icon you drew with the Kubai Icons skill or by hand. Accepted icons join the open-source library with credit to you.",
});

export default function SubmitPage() {
  return (
    <NarrowPage>
      <Heading level={1} title="Submit an icon" />
      <SubmitForm />
      <AgentSubmit />
    </NarrowPage>
  );
}

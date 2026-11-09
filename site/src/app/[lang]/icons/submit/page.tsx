import type { Metadata } from "next";
import { AgentSubmit } from "@/components/agent-submit";
import { Heading, NarrowPage } from "@/components/kit/layout";
import { SubmitForm } from "@/components/submit-form";
import { localize, translated } from "@/lib/i18n";
import { pageLanguage } from "@/lib/page-language";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await pageLanguage(params);
  return pageMeta({
    title: translated(locale, "Submit an icon"),
    path: localize("/icons/submit/", locale),
    description: translated(locale, "Submit an icon you drew with the Kubai Icons skill or by hand. Accepted icons join the open-source library with credit to you."),
  });
}

export default async function SubmitPage({ params }: Props) {
  const locale = await pageLanguage(params);
  return (
    <NarrowPage>
      <Heading level={1} title={translated(locale, "Submit an icon")} />
      <SubmitForm />
      <AgentSubmit />
    </NarrowPage>
  );
}

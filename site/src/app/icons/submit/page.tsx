import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, Heading } from "@/components/kit/layout";
import { SubmitForm } from "@/components/submit-form";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Submit an icon",
  path: "/icons/submit/",
  description: "Submit an icon you drew with the Kubai Icons skill or by hand. Accepted icons join the open-source library with credit to you.",
});

export default function SubmitPage() {
  return (
    <Container className="max-w-4xl space-y-8 pt-8 pb-section">
      <Breadcrumbs trail={[{ name: "Icons", path: "/icons/" }, { name: "Submit", path: "/icons/submit/" }]} />
      <Heading level={1} title="Submit an icon" lead="Drew an icon with the skill or by hand? Send it in. Accepted icons join the open-source library under the MIT License, credited to you." />
      <SubmitForm />
      <section className="space-y-2 text-control text-muted-foreground">
        <p>Export the drawing with <code className="font-mono text-code">node scripts/export.mjs</code>, and add the icon&apos;s source file if you want its motion reviewed too.</p>
        <p>Each submission is reviewed against the design rules. Logos, trademarks and anything traced from another icon set can&apos;t be accepted.</p>
      </section>
    </Container>
  );
}

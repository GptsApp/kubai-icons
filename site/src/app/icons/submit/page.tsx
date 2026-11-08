import type { Metadata } from "next";
import Link from "next/link";
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
      <Heading level={1} title="Submit an icon" lead="Drew an icon with the skill or by hand? Send it in." />
      <SubmitForm />
      <p className="text-control text-muted-foreground">
        <Link href="/docs/contributing/#submit-an-icon" className="font-medium text-foreground underline underline-offset-4">How to prepare your icon</Link>
      </p>
    </Container>
  );
}

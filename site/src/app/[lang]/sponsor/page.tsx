import type { Metadata } from "next";
import { Heading, NarrowPage } from "@/components/kit/layout";
import { localize, translated } from "@/lib/i18n";
import { pageLanguage } from "@/lib/page-language";
import { pageMeta } from "@/lib/seo";
import { asset } from "@/lib/site";

const METHODS = [
  { name: "Alipay", src: "/sponsor/alipay.png" },
  { name: "WeChat Pay", src: "/sponsor/wechat.png" },
];

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await pageLanguage(params);
  return pageMeta({
    title: translated(locale, "Sponsor"),
    path: localize("/sponsor/", locale),
    description: translated(locale, "Support the development of Kubai Icons, a free and open-source icon library, with Alipay or WeChat Pay."),
  });
}

export default async function Page({ params }: Props) {
  const locale = await pageLanguage(params);
  return (
    <NarrowPage>
      <Heading level={1} title={translated(locale, "Sponsor Kubai Icons")} />
      <div className="grid gap-4 sm:grid-cols-2">
        {METHODS.map((m) => (
          <figure key={m.name} className="space-y-3 rounded-card border p-5">
            <div className="mx-auto w-full max-w-56 overflow-hidden rounded-lg bg-white">
              <img src={asset(m.src)} alt={translated(locale, "{name} payment QR code", { name: m.name })} width={448} height={448} className="block h-auto w-full" />
            </div>
            <figcaption className="text-center font-medium">{m.name}</figcaption>
          </figure>
        ))}
      </div>
    </NarrowPage>
  );
}

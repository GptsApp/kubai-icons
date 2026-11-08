import { Heading, NarrowPage } from "@/components/kit/layout";
import { pageMeta } from "@/lib/seo";
import { asset } from "@/lib/site";

export const metadata = pageMeta({ title: "Sponsor", path: "/sponsor/", description: "Support the development of Kubai Icons, a free and open-source icon library, with Alipay or WeChat Pay." });

const METHODS = [
  { name: "Alipay", src: "/sponsor/alipay.png" },
  { name: "WeChat Pay", src: "/sponsor/wechat.png" },
];

export default function Page() {
  return (
    <NarrowPage>
      <Heading level={1} title="Sponsor Kubai Icons" />
      <div className="grid gap-4 sm:grid-cols-2">
        {METHODS.map((m) => (
          <figure key={m.name} className="space-y-3 rounded-card border p-5">
            <div className="mx-auto w-full max-w-56 overflow-hidden rounded-lg bg-white">
              <img src={asset(m.src)} alt={`${m.name} payment QR code`} width={448} height={448} className="block h-auto w-full" />
            </div>
            <figcaption className="text-center font-medium">{m.name}</figcaption>
          </figure>
        ))}
      </div>
    </NarrowPage>
  );
}

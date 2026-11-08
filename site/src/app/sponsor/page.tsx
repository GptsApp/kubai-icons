import { Title } from "@/components/docs/prose";
import { Container } from "@/components/kit/layout";
import { pageMeta } from "@/lib/seo";
import { asset } from "@/lib/site";

export const metadata = pageMeta({ title: "Sponsor", path: "/sponsor/", description: "Support the development of Kubai Icons, a free and open-source icon library, with Alipay or WeChat Pay." });

const METHODS = [
  { name: "Alipay", src: "/sponsor/alipay.png" },
  { name: "WeChat Pay", src: "/sponsor/wechat.png" },
];

export default function Page() {
  return (
    <Container className="min-h-[calc(100dvh-var(--header))] pt-10">
      <div className="mx-auto max-w-2xl">
        <Title lead={"The icons are free to use. If they help your work, you can support their development with a sponsorship of any amount."}>
          Sponsor Kubai Icons
        </Title>
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
        <p className="mt-4 text-body text-muted-foreground">On a phone, save the code to your photos, then open it from the scanner in Alipay or WeChat.</p>
      </div>
    </Container>
  );
}

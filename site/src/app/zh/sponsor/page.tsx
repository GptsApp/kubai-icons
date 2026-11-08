import { Title } from "@/components/docs/prose";
import { Container } from "@/components/kit/layout";
import { pageMeta } from "@/lib/seo";
import { asset } from "@/lib/site";

export const metadata = pageMeta({ title: "赞助", path: "/zh/sponsor/", description: "通过支付宝或微信支付，支持免费开源图标库 Kubai Icons 的开发。" });

const METHODS = [
  { name: "支付宝", src: "/sponsor/alipay.png" },
  { name: "微信支付", src: "/sponsor/wechat.png" },
];

export default function Page() {
  return (
    <Container className="min-h-[calc(100dvh-var(--header))] pt-10">
      <div className="mx-auto max-w-2xl">
        <Title>赞助 Kubai Icons</Title>
        <div className="grid gap-4 sm:grid-cols-2">
          {METHODS.map((m) => (
            <figure key={m.name} className="space-y-3 rounded-card border p-5">
              <div className="mx-auto w-full max-w-56 overflow-hidden rounded-lg bg-white">
                <img src={asset(m.src)} alt={`${m.name}收款二维码`} width={448} height={448} className="block h-auto w-full" />
              </div>
              <figcaption className="text-center font-medium">{m.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Container>
  );
}

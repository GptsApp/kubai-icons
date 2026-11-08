import { HomePage } from "@/components/home-page";
import { HOME_DESCRIPTION_ZH, HOME_TITLE_ZH, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ fullTitle: HOME_TITLE_ZH, path: "/zh/", description: HOME_DESCRIPTION_ZH });

export default function Home() {
  return <HomePage locale="zh" />;
}

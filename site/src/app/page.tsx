import { HomePage } from "@/components/home-page";
import { HOME_DESCRIPTION, HOME_TITLE, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ fullTitle: HOME_TITLE, path: "/", description: HOME_DESCRIPTION });

export default function Home() {
  return <HomePage locale="en" />;
}

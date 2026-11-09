import { CATALOG_LOCALES } from "@/lib/i18n";

export const dynamicParams = false;
export const generateStaticParams = () => CATALOG_LOCALES.map((lang) => ({ lang }));

export default function LanguageLayout({ children }: { children: React.ReactNode }) {
  return children;
}

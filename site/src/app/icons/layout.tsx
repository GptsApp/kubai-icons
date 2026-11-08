import { CollectionDock } from "@/components/browser/collection-dock";

export default function IconsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CollectionDock />
    </>
  );
}

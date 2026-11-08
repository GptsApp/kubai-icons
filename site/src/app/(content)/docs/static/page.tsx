import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Prose, Title, Code } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "Static SVG icons", path: "/docs/static/", description: "Self-contained SVG files of every Kubai icon with fixed colors, for image tags, design tools and pages without JavaScript." });

export default function Page() {
  return (
    <Prose>
      <Title lead={<><code>kubai-icons-static</code> provides each icon as a self-contained SVG file. Colors are written into the file, so no script or stylesheet is needed.</>}>
        Static SVG
      </Title>
      <h2>Install</h2>
      <Code lang="bash" code="npm install kubai-icons-static" />
      <div className="my-5 space-y-5">
          <h2>Files</h2>
          <p>
            <code>svg/</code> contains every icon in the default blue (#5393FF). <code>svg-soft/</code> contains every icon in the soft variant, in blue-gray.
          </p>
          <p>
            Each file includes extra margin for the drop shadow. To match an animated icon shown at 24px, display the file at 28px. Each <code>id</code> in a file includes the icon&apos;s name, so several icons can be inlined on one page.
          </p>
          <h2>CDN</h2>
          <p>Use the files directly from a CDN:</p>
        </div>
      <Code lang="html" code={`<img src="https://cdn.jsdelivr.net/npm/kubai-icons-static@0/svg/folder.svg" width="28" height="28" alt="" />`} />
      <div className="my-5 space-y-5">
          <p>On jsDelivr, a URL with an exact version is cached long-term. A URL with a major version, such as <code>@0</code>, is refreshed periodically and picks up new releases.</p>
          <h2>Custom colors</h2>
          <p>In the <Link href="/icons/">icon browser</Link>, you can download an icon as SVG or PNG in a chosen color and variant. These files use plain hex colors, which design tools such as Figma read correctly.</p>
          <h2>Metadata</h2>
          <p><code>icons.json</code> lists every icon with its category and tags, and for badged icons, the base icon and the badge. <code>categories.json</code> lists the categories.</p>
        </div>
    </Prose>
  );
}

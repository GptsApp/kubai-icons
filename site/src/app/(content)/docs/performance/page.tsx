import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Prose, Title, Code } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "Performance", path: "/docs/performance/", description: "How the Kubai Icons packages affect bundle size and runtime cost: one module per icon, tree shaking, and motion that runs only while an icon moves." });

export default function Page() {
  return (
    <Prose>
      <Title lead={"This page describes how the packages affect bundle size and runtime cost, and how to render many icons."}>
        Performance
      </Title>
      <div className="my-5 space-y-5">
          <h2>How icons load and run</h2>
          <ul>
            <li><strong>One module per icon.</strong> Icon modules are side-effect free, so bundlers remove icons you do not import. Minified and gzipped, the first React or Vue icon adds about 4 KB, including the shared runtime, and each further icon about 0.6 KB.</li>
            <li><strong>Pre-rendered markup.</strong> The rest pose ships as a string, so it needs no calculation before first paint, on the server or in the browser.</li>
            <li><strong>Motion on demand.</strong> The motion code runs only while an icon is moving and stops when the motion ends.</li>
            <li><strong>Shared code.</strong> All icons share one geometry module, and all animated icons share one runtime, so browsers and CDNs cache that code once.</li>
            <li><strong>CSS colors.</strong> Changing the color of a page of icons is a single CSS change and does not re-render them.</li>
          </ul>
          <h2>Large icon sets</h2>
          <p>Each icon uses SVG filters for its shadow and highlight. If you show hundreds of icons, render only the visible rows, or use the <Link href="/docs/static/">static SVG files</Link> in <code>&lt;img&gt;</code> tags, which the browser rasterizes once.</p>
          <h2>Deep imports</h2>
          <p>Dev servers often load the whole package index, which references every icon. To avoid this, import each icon from its own file:</p>
        </div>
      <Code lang="ts" code={`import Folder from "kubai-icons-react/icons/folder";`} />
    </Prose>
  );
}

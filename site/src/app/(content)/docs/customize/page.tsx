import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Prose, Title, Code } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "Customize icons", path: "/docs/customize/", description: "Change an icon's accent color, soft variant, badge color, size and hover trigger. Every tone derives from one accent color." });

export default function Page() {
  return (
    <Prose>
      <Title lead={"Icon color, badges, size and motion are set through props and CSS custom properties."}>
        Customization
      </Title>
      <div className="my-5 space-y-5">
          <h2>Color</h2>
          <p>All of an icon&apos;s colors are calculated from one accent color. By default, the accent is <code>currentColor</code>, so you can change it by setting the CSS <code>color</code> property on the icon or on any ancestor:</p>
        </div>
      <Code lang="html" code={`<span style="color: #14B8A6"><kubai-icon name="leaf"></kubai-icon></span>`} />
      <p>
        The colors are calculated with CSS <code>color-mix()</code>, so a transition on <code>color</code> cross-fades all gradients:
      </p>
      <Code lang="css" code={`.kubai-icon { transition: color .3s ease; }`} />
      <div className="my-5 space-y-5">
          <h2>Badges</h2>
          <p>A badged icon, such as <code>folder-plus</code> or <code>user-check</code>, has a badge in one corner. The badge is a dark disc with a white glyph by default. <code>badgeColor</code> changes the color of the disc. <code>badgeColor=&quot;semantic&quot;</code> picks a color that suits each badge: green for add and done, red for remove and cancel, amber for warnings.</p>
        </div>
      <Code lang="tsx" code={`import { FolderPlus } from "kubai-icons-react";

<FolderPlus />                          {/* dark badge */}
<FolderPlus badgeColor="semantic" />    {/* green plus */}
<FolderPlus badgeColor="#7C3AED" />`} />
      <div className="my-5 space-y-5">
          <h2>CSS custom properties</h2>
          <p>Set these on an icon or on any ancestor to override individual tones. Marks are the lines and symbols drawn on an icon.</p>
          <table>
            <thead><tr><th>Property</th><th>Controls</th></tr></thead>
            <tbody>
              <tr><td><code>--ki-c</code></td><td>Base color for gradients and light marks. Default: <code>currentColor</code>.</td></tr>
              <tr><td><code>--ki-e</code></td><td>Base color for outlines and dark marks. Default: <code>--ki-c</code>.</td></tr>
              <tr><td><code>--ki-w</code></td><td>Color of the marks that are white by default.</td></tr>
              <tr><td><code>--ki-b</code></td><td>Color of the badge disc. Default: neutral dark gray.</td></tr>
              <tr><td><code>--ki-l</code></td><td>How far large solid fills fade to white toward the top, from 0% to 100%.</td></tr>
            </tbody>
          </table>
          <p><code>variant=&quot;soft&quot;</code> sets all of these except <code>--ki-b</code>.</p>
          <h2>Set the variant for a whole page</h2>
          <p>A variant is inherited, like <code>color</code>. Set it on any element, and every icon inside follows unless it has its own <code>variant</code>. A closer setting always wins: the icon&apos;s own prop, then the nearest element, then the default <code>color</code>.</p>
          <Code lang="tsx" code={`import { Folder, VARIANTS } from "kubai-icons-react";

<body style={VARIANTS.soft}>
  <Folder />                  {/* soft */}
  <Folder variant="color" />  {/* color */}
</body>`} />
          <p>The same object works in Vue with <code>:style</code>. Without a framework, call <code>setVariant</code>:</p>
          <Code lang="js" code={`import { setVariant } from "kubai-icons/runtime";

setVariant(document.documentElement, "soft");`} />
          <p>Static SVG files have their colors written in, so choose the variant by folder: <code>svg/</code> or <code>svg-soft/</code>.</p>
          <h2>Size</h2>
          <p>Set the size with the <code>size</code> prop. Use base icons instead of badged icons at 24px and below, where a badge has little room. The canvas is described in <Link href="/docs/design/">Design language</Link>.</p>
          <h2>Motion</h2>
          <p>Every motion runs for 460ms on <code>cubic-bezier(.22, 1, .36, 1)</code> and starts from the icon&apos;s current position, so it can reverse midway. When <code>prefers-reduced-motion</code> is set, icons move directly to the end pose without animating.</p>
        </div>
    </Prose>
  );
}

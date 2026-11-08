import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Prose, Title, Code } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "Animated React icons", path: "/docs/react/", description: "Install kubai-icons-react and use animated SVG icons as React components, with props for size, color, variant, badges and hover control." });

export default function Page() {
  return (
    <Prose>
      <Title lead={<><code>kubai-icons-react</code> provides each icon as a React component. It requires React 18 or later.</>}>
        React
      </Title>
      <h2>Install</h2>
      <Code lang="bash" code="npm install kubai-icons-react" />
      <h2>Usage</h2>
      <p>Import an icon by name and render it as a component:</p>
      <Code lang="tsx" code={`import { Calendar, Lock } from "kubai-icons-react";

export function Example() {
  return (
    <>
      <Calendar />
      <Lock size={32} color="#22C55E" variant="soft" title="Locked" />
    </>
  );
}`} />
      <div className="my-5 space-y-5">
          <h2 id="props">Props</h2>
          <table>
            <thead><tr><th>Prop</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>size</code></td><td>24</td><td>Width and height in pixels.</td></tr>
              <tr><td><code>color</code></td><td>currentColor</td><td>The accent color that all gradients, outlines and marks are derived from. See <Link href="/docs/customize/">Customization</Link>.</td></tr>
              <tr><td><code>variant</code></td><td>inherited, else &quot;color&quot;</td><td><code>&quot;soft&quot;</code> uses lighter fills and darker outlines, and draws white marks in a dark tone.</td></tr>
              <tr><td><code>badgeColor</code></td><td>dark gray</td><td>Color of the badge disc: any CSS color, or <code>&quot;semantic&quot;</code> for a color that suits each badge, such as green for add, red for remove and amber for warning.</td></tr>
              <tr><td><code>trigger</code></td><td>&quot;hover&quot;</td><td><code>&quot;hover&quot;</code> plays the motion when the icon is hovered or receives keyboard focus. <code>&quot;parent&quot;</code> does the same for the closest ancestor with <code>data-kubai-trigger</code>, or for the direct parent if there is none. <code>&quot;none&quot;</code> adds no listeners, so only the <code>hover</code> prop plays the motion.</td></tr>
              <tr><td><code>hover</code></td><td>None</td><td><code>true</code> plays the motion and <code>false</code> reverses it. Combine it with <code>trigger=&quot;none&quot;</code> for full control.</td></tr>
              <tr><td><code>active</code>, <code>defaultActive</code>, <code>onActiveChange</code></td><td>None</td><td>On/off state for toggle icons, which switch between two states when clicked or tapped. <code>Bookmark</code> is one example.</td></tr>
              <tr><td><code>title</code></td><td>None</td><td>Accessible name. Without it, the icon is <code>aria-hidden</code>. See <Link href="/docs/accessibility/">Accessibility</Link>.</td></tr>
            </tbody>
          </table>
          <p>Other SVG props, such as <code>className</code>, <code>style</code>, event handlers and <code>ref</code>, pass through to the <code>&lt;svg&gt;</code>.</p>
          <h2>Trigger from a parent</h2>
          <p>To play the motion when a whole button is hovered or receives keyboard focus, add <code>data-kubai-trigger</code> to the button and <code>trigger=&quot;parent&quot;</code> to the icon:</p>
        </div>
      <Code lang="tsx" code={`<button data-kubai-trigger className="btn">
  <Trash size={18} trigger="parent" />
  Delete
</button>`} />
      <div className="my-5 space-y-5">
          <h2>Icons by name</h2>
          <p>If the icon name is known only at runtime, such as a value from an API, use <code>DynamicIcon</code>. Each icon is still a separate chunk, so the bundle does not include the whole set.</p>
        </div>
      <Code lang="tsx" code={`import { DynamicIcon } from "kubai-icons-react/dynamic";

export function ItemIcon({ name }: { name: string }) {
  return <DynamicIcon name={name} size={20} />;
}`} />
      <div className="my-5 space-y-5">
          <h2>Server rendering</h2>
          <p>Icons work in Next.js Server Components and Client Components without configuration. The markup renders on the server, and motion is added on hydration. <code>DynamicIcon</code> is the exception: it renders an empty placeholder on the server and loads the icon in the browser.</p>
          <h2>Deep imports</h2>
          <p>To avoid loading the package index in a dev server, import an icon from its own file. See <Link href="/docs/performance/">Performance</Link>.</p>
        </div>
      <Code lang="tsx" code={`import Folder from "kubai-icons-react/icons/folder";`} />
    </Prose>
  );
}

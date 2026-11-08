import { pageMeta } from "@/lib/seo";
import { Prose, Title, Code } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "Icon accessibility", path: "/docs/accessibility/", description: "Name icons for screen readers, keep them hidden when decorative, and support reduced motion when using Kubai Icons." });

export default function Page() {
  return (
    <Prose>
      <Title lead={"This page describes how icons work with screen readers, keyboards, touch input and reduced-motion settings."}>
        Accessibility
      </Title>
      <h2>Accessible names</h2>
      <p>
        Without a <code>title</code>, an icon is <code>aria-hidden</code> and screen readers skip it. When an icon is the only content of a button or link, give the control an accessible name, either with <code>aria-label</code> on the control or with <code>title</code> on the icon:
      </p>
      <Code lang="tsx" code={`import { Settings } from "kubai-icons-react";

<button aria-label="Settings"><Settings /></button>

<button><Settings title="Settings" /></button>`} />
      <p>The <code>&lt;kubai-icon&gt;</code> web component takes its accessible name from the <code>label</code> attribute.</p>
      <h2>Input and motion</h2>
      <ul className="my-5">
          <li>When <code>prefers-reduced-motion</code> is set, icons move directly to the end pose without animating.</li>
          <li>With <code>trigger=&quot;parent&quot;</code>, keyboard focus plays the motion as hover does. Focus left behind by a mouse click does not.</li>
          <li>On touch screens, a tap plays the motion forward and back. Toggle icons switch state instead.</li>
          <li>Toggle icons such as <code>Bookmark</code> show their state only through color and shape. Add visible text next to the icon, or set <code>aria-pressed</code> on the button, so that screen readers can announce the state.</li>
        </ul>
    </Prose>
  );
}

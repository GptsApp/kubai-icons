import { pageMeta } from "@/lib/seo";
import { Prose, Title, Code } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "JavaScript icons and web component", path: "/docs/javascript/", description: "Create animated SVG icons from plain JavaScript or the kubai-icon web component, with no framework and tree-shakable imports." });

export default function Page() {
  return (
    <Prose>
      <Title lead={<><code>kubai-icons</code> creates icons from plain JavaScript and provides the <code>&lt;kubai-icon&gt;</code> web component.</>}>
        JavaScript
      </Title>
      <h2>Install</h2>
      <Code lang="bash" code="npm install kubai-icons" />
      <h2>Create an element</h2>
      <p><code>createIcon</code> returns an <code>&lt;svg&gt;</code> element that you can add to the page:</p>
      <Code lang="js" code={`import { createIcon, Folder, MailPlus } from "kubai-icons";

document.querySelector("#toolbar").append(
  createIcon(Folder, { size: 24 }),
  createIcon(MailPlus, { color: "#EC4899", trigger: "parent" })
);`} />
      <p>
        <code>trigger: &quot;parent&quot;</code> works only if you add the icon to the page synchronously after creating it, as in this example. To add an icon later, see <a href="#server-rendering">Render on the server</a> and bind it yourself.
      </p>
      <h2>Replace placeholders</h2>
      <p>Add an element with <code>data-kubai</code> wherever you want an icon, then call <code>replaceIcons</code> to replace each element with its SVG. List every icon you use in the <code>icons</code> option. This example assumes a bundler:</p>
      <Code lang="html" code={`<i data-kubai="folder" data-size="32"></i>
<i data-kubai="calendar-check" data-color="#22C55E"></i>

<script type="module">
  import { replaceIcons, Folder, CalendarCheck } from "kubai-icons";
  replaceIcons({ icons: { Folder, CalendarCheck } });
</script>`} />
      <h2>Use the web component</h2>
      <p>
        Add one script tag to load the component from a CDN. It downloads each icon file the first time that icon is used.
      </p>
      <Code lang="html" code={`<script type="module" src="https://cdn.jsdelivr.net/npm/kubai-icons@0/dist/cdn/element.js"></script>

<kubai-icon name="folder"></kubai-icon>
<kubai-icon name="bell-off" size="32" color="#F97316" variant="soft" label="Muted"></kubai-icon>`} />
      <h2 id="server-rendering">Render on the server</h2>
      <p><code>toSvg</code> returns the icon as an HTML string with no motion:</p>
      <Code lang="js" code={`import { toSvg, Folder } from "kubai-icons";

const html = toSvg(Folder, { size: 24, title: "Files" });`} />
      <p>
        To add motion in the browser, find the rendered <code>&lt;svg&gt;</code> element, pass it to <code>animate</code>, and connect the result to the element that should start the motion:
      </p>
      <Code lang="js" code={`import { animate, bindTrigger, Folder } from "kubai-icons";

const svg = document.querySelector("#files svg");
bindTrigger(svg.parentElement, animate(svg, Folder), Folder);`} />
    </Prose>
  );
}

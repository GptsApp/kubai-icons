import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Prose, Title, Code } from "@/components/docs/prose";
import { REPO } from "@/lib/site";

export const metadata = pageMeta({ title: "Introduction", path: "/docs/", description: "Install Kubai Icons, a library of layered SVG icons with hover motion, and use it in React, Vue, plain JavaScript or as static SVG." });

export default function Page() {
  return (
    <Prose>
      <Title lead={"Kubai Icons is an open-source library of layered SVG icons with hover motion. This page lists the packages and explains how icons are named and versioned."}>
        Introduction
      </Title>
      <div className="my-5 space-y-5">
          <p>
            Each icon takes all its shades from one accent color. On hover, it acts out what the object does: a folder opens, an envelope unseals. Each icon is a separate ES module that holds the SVG markup of its still state, called the rest pose, and its hover motion.
          </p>
          <h2>Packages</h2>
          <table>
            <thead><tr><th>Package</th><th>Use it for</th><th>Docs</th></tr></thead>
            <tbody>
              <tr><td><code>kubai-icons-react</code></td><td>React 18+ and Next.js, including server rendering</td><td><Link href="/docs/react/">React package</Link></td></tr>
              <tr><td><code>kubai-icons-vue</code></td><td>Vue 3.3+ and Nuxt</td><td><Link href="/docs/vue/">Vue package</Link></td></tr>
              <tr><td><code>kubai-icons</code></td><td>Plain JavaScript and the <code>&lt;kubai-icon&gt;</code> web component</td><td><Link href="/docs/javascript/">JavaScript package</Link></td></tr>
              <tr><td><code>kubai-icons-static</code></td><td>SVG files for <code>&lt;img&gt;</code> tags, design tools and pages without JavaScript</td><td><Link href="/docs/static/">Static SVG package</Link></td></tr>
            </tbody>
          </table>
          <h2>Quick start</h2>
          <p>This example uses React. For other environments, see the packages listed above. Install the package:</p>
        </div>
      <Code lang="bash" code="npm install kubai-icons-react" />
      <p>Then import the icons you need:</p>
      <Code lang="tsx" code={`import { Folder, MailPlus } from "kubai-icons-react";

export default function App() {
  return (
    <>
      <Folder />                                 {/* 24px, in the text color */}
      <MailPlus size={32} color="#EC4899" />     {/* any CSS color */}
    </>
  );
}`} />
      <div className="my-5 space-y-5">
          <h2>Icon names</h2>
          <p>
            Icon names are English and kebab-case: <code>folder</code>, <code>cloud-rain</code>, <code>arrow-up-right</code>. The JavaScript, React and Vue packages export them in PascalCase, such as <code>CloudRain</code>. React and Vue also export <code>CloudRainIcon</code>. Static files keep the kebab-case name. The <Link href="/icons/">icon browser</Link> searches names and tags.
          </p>
          <p>
            Many base icons also come as badged icons, such as <code>folder-plus</code>, <code>user-check</code> and <code>calendar-clock</code>. Icons for things that can be switched off also come as slashed icons, such as <code>bell-off</code>.
          </p>
          <h2>Versioning</h2>
          <p>
            The packages follow semantic versioning and are released together. Renaming or removing an icon is a breaking change; redrawing one is not. Release notes are published on <a href={`${REPO}/releases`}>GitHub</a>.
          </p>
        </div>
    </Prose>
  );
}

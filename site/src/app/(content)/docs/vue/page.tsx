import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Prose, Title, Code } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "Animated Vue 3 icons", path: "/docs/vue/", description: "Install kubai-icons-vue and use animated SVG icons as Vue 3 components, with hover motion, color and badge options." });

export default function Page() {
  return (
    <Prose>
      <Title lead={<><code>kubai-icons-vue</code> provides each icon as a Vue component. It requires Vue 3.3 or later.</>}>
        Vue
      </Title>
      <h2>Install</h2>
      <Code lang="bash" code="npm install kubai-icons-vue" />
      <h2>Usage</h2>
      <p>Import an icon by name and use it in a template:</p>
      <Code lang="vue" code={`<script setup>
import { Folder, BellOff } from "kubai-icons-vue";
</script>

<template>
  <Folder :size="28" color="#6366F1" />
  <BellOff variant="soft" title="Muted" />
</template>`} />
      <div className="my-5 space-y-5">
          <h2>Props</h2>
          <p>The props are <code>size</code>, <code>color</code>, <code>variant</code>, <code>badgeColor</code>, <code>trigger</code>, <code>hover</code>, <code>active</code>, <code>defaultActive</code> and <code>title</code>. They work as described in the <Link href="/docs/react/#props">React props table</Link>. Use <code>v-model:active</code> to bind the on/off state of a toggle icon.</p>
          <h2>Trigger from a parent</h2>
          <p>To play the motion when a whole button is hovered or receives keyboard focus, add <code>data-kubai-trigger</code> to the button and <code>trigger=&quot;parent&quot;</code> to the icon:</p>
        </div>
      <Code lang="vue" code={`<button data-kubai-trigger>
  <Trash :size="18" trigger="parent" />
  Delete
</button>`} />
      <div className="my-5 space-y-5">
          <h2>Icons by name</h2>
          <p>If the icon name is known only at runtime, such as a value from an API, use <code>DynamicIcon</code>. Each icon is still a separate chunk, so the bundle does not include the whole set.</p>
        </div>
      <Code lang="vue" code={`<script setup>
import { DynamicIcon } from "kubai-icons-vue/dynamic";

defineProps({ name: String });
</script>

<template>
  <DynamicIcon :name="name" />
</template>`} />
      <div className="my-5 space-y-5">
          <h2>Server rendering</h2>
          <p>In Nuxt, components render on the server, and motion is added on the client. Import them where they are used, or register them in a plugin. <code>DynamicIcon</code> is the exception: it renders an empty placeholder on the server and loads the icon in the browser.</p>
          <h2>Deep imports</h2>
          <p>To avoid loading the package index in a dev server, import an icon from its own file:</p>
        </div>
      <Code lang="js" code={`import Folder from "kubai-icons-vue/icons/folder";`} />
    </Prose>
  );
}

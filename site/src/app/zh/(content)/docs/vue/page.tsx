import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Prose, Title, Code } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "Vue 3 动态图标", path: "/zh/docs/vue/", description: "安装 kubai-icons-vue，以 Vue 3 组件的形式使用 SVG 动态图标，并可设置悬停动效、颜色和角标。" });

export default function Page() {
  return (
    <Prose>
      <Title lead={<><code>kubai-icons-vue</code> 将每个图标封装为一个 Vue 组件，要求 Vue 3.3 或更高版本</>}>
        Vue
      </Title>
      <h2>安装</h2>
      <Code lang="bash" code="npm install kubai-icons-vue" />
      <h2>用法</h2>
      <p>按名称导入图标，然后在模板中使用：</p>
      <Code lang="vue" code={`<script setup>
import { Folder, BellOff } from "kubai-icons-vue";
</script>

<template>
  <Folder :size="28" color="#6366F1" />
  <BellOff variant="soft" title="Muted" />
</template>`} />
      <div className="my-5 space-y-5">
          <h2>Props</h2>
          <p>可用的 props 有 <code>size</code>、<code>color</code>、<code>variant</code>、<code>badgeColor</code>、<code>trigger</code>、<code>hover</code>、<code>active</code>、<code>defaultActive</code> 和 <code>title</code>，用法与 <Link href="/zh/docs/react/#props">React props 表格</Link>中的说明相同。使用 <code>v-model:active</code> 绑定切换型图标的状态。</p>
          <h2>由父元素触发</h2>
          <p>要在悬停于整个按钮或按钮获得键盘焦点时播放动效，请在按钮上添加 <code>data-kubai-trigger</code>，并在图标上设置 <code>trigger=&quot;parent&quot;</code>：</p>
        </div>
      <Code lang="vue" code={`<button data-kubai-trigger>
  <Trash :size="18" trigger="parent" />
  Delete
</button>`} />
      <div className="my-5 space-y-5">
          <h2>按名称使用图标</h2>
          <p>如果图标名称要到运行时才能确定，例如来自 API 的值，请使用 <code>DynamicIcon</code>。每个图标仍然是独立的 chunk，打包结果不会包含整套图标。</p>
        </div>
      <Code lang="vue" code={`<script setup>
import { DynamicIcon } from "kubai-icons-vue/dynamic";

defineProps({ name: String });
</script>

<template>
  <DynamicIcon :name="name" />
</template>`} />
      <div className="my-5 space-y-5">
          <h2>服务端渲染</h2>
          <p>在 Nuxt 中，组件在服务端渲染，动效在客户端添加。可以在使用组件的地方导入，也可以在插件中注册。<code>DynamicIcon</code> 是个例外：它在服务端渲染一个空的占位元素，到浏览器中才加载图标。</p>
          <h2>深层导入</h2>
          <p>为避免开发服务器加载包的入口文件，可直接从各图标自身的文件导入：</p>
        </div>
      <Code lang="js" code={`import Folder from "kubai-icons-vue/icons/folder";`} />
    </Prose>
  );
}

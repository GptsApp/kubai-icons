import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Prose, Title, Code } from "@/components/docs/prose";
import { REPO } from "@/lib/site";

export const metadata = pageMeta({ title: "简介", path: "/zh/docs/", description: "安装 Kubai Icons 分层 SVG 图标库，并在 React、Vue 和原生 JavaScript 中使用；也可直接使用静态 SVG。" });

export default function Page() {
  return (
    <Prose>
      <Title lead={"Kubai Icons 是带悬停动效的开源分层 SVG 图标库。本页列出各个软件包，并说明图标的命名和版本规则。"}>
        简介
      </Title>
      <div className="my-5 space-y-5">
          <p>
            每个图标的各级色调都来自同一个主色。悬停时，图标呈现相应实物的运动：文件夹打开，信封拆开。每个图标都是一个独立的 ES 模块，其中包含静止状态的 SVG 代码和悬停动效。
          </p>
          <h2>软件包</h2>
          <table>
            <thead><tr><th>包名</th><th>适用场景</th><th>文档</th></tr></thead>
            <tbody>
              <tr><td><code>kubai-icons-react</code></td><td>React 18+ 和 Next.js，支持服务端渲染</td><td><Link href="/zh/docs/react/">React 包</Link></td></tr>
              <tr><td><code>kubai-icons-vue</code></td><td>Vue 3.3+ 和 Nuxt</td><td><Link href="/zh/docs/vue/">Vue 包</Link></td></tr>
              <tr><td><code>kubai-icons</code></td><td>原生 JavaScript 和 <code>&lt;kubai-icon&gt;</code> Web Component</td><td><Link href="/zh/docs/javascript/">JavaScript 包</Link></td></tr>
              <tr><td><code>kubai-icons-static</code></td><td>SVG 文件，用于 <code>&lt;img&gt;</code> 标签、设计工具和不使用 JavaScript 的页面</td><td><Link href="/zh/docs/static/">静态 SVG 包</Link></td></tr>
            </tbody>
          </table>
          <h2>快速上手</h2>
          <p>本例使用 React，其他环境请查看上面列出的软件包。首先安装：</p>
        </div>
      <Code lang="bash" code="npm install kubai-icons-react" />
      <p>然后导入需要的图标：</p>
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
          <h2>图标名称</h2>
          <p>
            图标名称采用英文 kebab-case 格式：<code>folder</code>、<code>cloud-rain</code>、<code>arrow-up-right</code>。JavaScript、React 和 Vue 包以 PascalCase 形式导出，例如 <code>CloudRain</code>；React 和 Vue 还会同时导出 <code>CloudRainIcon</code>。静态文件保留 kebab-case 名称。<Link href="/zh/icons/">图标页</Link>可以按名称和标签搜索。
          </p>
          <p>
            许多基础图标还提供带角标的版本，例如 <code>folder-plus</code>、<code>user-check</code> 和 <code>calendar-clock</code>。表示可关闭功能的图标另有带斜线的版本，例如 <code>bell-off</code>。
          </p>
          <h2>版本规则</h2>
          <p>
            各个软件包遵循语义化版本规范，并同时发布。重命名或移除图标属于破坏性变更，重新绘制图标则不算。发布说明见 <a href={`${REPO}/releases`}>GitHub</a>。
          </p>
        </div>
    </Prose>
  );
}

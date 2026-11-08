import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Prose, Title, Code } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "React 动态图标", path: "/zh/docs/react/", description: "安装 kubai-icons-react，以 React 组件的形式使用 SVG 动态图标，并通过 props 控制尺寸、颜色、样式、角标和悬停行为。" });

export default function Page() {
  return (
    <Prose>
      <Title lead={<><code>kubai-icons-react</code> 将每个图标封装为一个 React 组件，要求 React 18 或更高版本。</>}>
        React
      </Title>
      <h2>安装</h2>
      <Code lang="bash" code="npm install kubai-icons-react" />
      <h2>用法</h2>
      <p>按名称导入图标，然后作为组件渲染：</p>
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
            <thead><tr><th>Prop</th><th>默认值</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>size</code></td><td>24</td><td>宽度和高度，单位为像素。</td></tr>
              <tr><td><code>color</code></td><td>currentColor</td><td>主色，所有渐变、轮廓和内部图形都由它派生。详见<Link href="/zh/docs/customize/">自定义</Link>。</td></tr>
              <tr><td><code>variant</code></td><td>继承上级设置，否则为 &quot;color&quot;</td><td><code>&quot;soft&quot;</code> 使用更浅的填充色和更深的轮廓，并以深色绘制原本白色的内部图形。</td></tr>
              <tr><td><code>badgeColor</code></td><td>深灰色</td><td>角标圆底的颜色：可以是任意 CSS 颜色，也可以设为 <code>&quot;semantic&quot;</code>，为每个角标匹配合适的颜色，例如添加用绿色、移除用红色、警告用琥珀色。</td></tr>
              <tr><td><code>trigger</code></td><td>&quot;hover&quot;</td><td><code>&quot;hover&quot;</code> 在悬停于图标或图标获得键盘焦点时播放动效。<code>&quot;parent&quot;</code> 的行为相同，但作用于最近的带有 <code>data-kubai-trigger</code> 的祖先元素；如果没有这样的祖先元素，则作用于直接父元素。<code>&quot;none&quot;</code> 不添加事件监听，只有 <code>hover</code> prop 能播放动效。</td></tr>
              <tr><td><code>hover</code></td><td>无</td><td><code>true</code> 播放动效，<code>false</code> 反向播放。配合 <code>trigger=&quot;none&quot;</code> 可以完全自行控制。</td></tr>
              <tr><td><code>active</code>, <code>defaultActive</code>, <code>onActiveChange</code></td><td>无</td><td>切换型图标的当前状态。这类图标在点击或点按时切换两种状态，例如 <code>Bookmark</code>。</td></tr>
              <tr><td><code>title</code></td><td>无</td><td>无障碍名称。不设置时，图标为 <code>aria-hidden</code>。详见<Link href="/zh/docs/accessibility/">无障碍</Link>。</td></tr>
            </tbody>
          </table>
          <p>其他 SVG 属性，例如 <code>className</code>、<code>style</code>、事件处理函数和 <code>ref</code>，会透传给 <code>&lt;svg&gt;</code> 元素。</p>
          <h2>由父元素触发</h2>
          <p>要在悬停于整个按钮或按钮获得键盘焦点时播放动效，请在按钮上添加 <code>data-kubai-trigger</code>，并在图标上设置 <code>trigger=&quot;parent&quot;</code>：</p>
        </div>
      <Code lang="tsx" code={`<button data-kubai-trigger className="btn">
  <Trash size={18} trigger="parent" />
  Delete
</button>`} />
      <div className="my-5 space-y-5">
          <h2>按名称使用图标</h2>
          <p>如果图标名称要到运行时才能确定，例如来自 API 的值，请使用 <code>DynamicIcon</code>。每个图标仍然是独立的 chunk，打包结果不会包含整套图标。</p>
        </div>
      <Code lang="tsx" code={`import { DynamicIcon } from "kubai-icons-react/dynamic";

export function ItemIcon({ name }: { name: string }) {
  return <DynamicIcon name={name} size={20} />;
}`} />
      <div className="my-5 space-y-5">
          <h2>服务端渲染</h2>
          <p>图标无需配置即可用于 Next.js 的 Server Components 和 Client Components。SVG 代码在服务端渲染，动效在激活时添加。<code>DynamicIcon</code> 是个例外：它在服务端渲染一个空的占位元素，到浏览器中才加载图标。</p>
          <h2>深层导入</h2>
          <p>为避免开发服务器加载包的入口文件，可直接从各图标自身的文件导入。详见<Link href="/zh/docs/performance/">性能</Link>。</p>
        </div>
      <Code lang="tsx" code={`import Folder from "kubai-icons-react/icons/folder";`} />
    </Prose>
  );
}

import { pageMeta } from "@/lib/seo";
import { Prose, Title, Code } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "图标无障碍", path: "/zh/docs/accessibility/", description: "使用 Kubai Icons 时，如何为屏幕阅读器提供图标名称，如何隐藏装饰性图标，以及如何支持减弱动态效果。" });

export default function Page() {
  return (
    <Prose>
      <Title lead={"本页说明图标如何配合屏幕阅读器、键盘、触摸输入和减弱动态效果设置"}>
        无障碍
      </Title>
      <h2>无障碍名称</h2>
      <p>
        没有 <code>title</code> 的图标处于 <code>aria-hidden</code> 状态，屏幕阅读器会跳过它。如果按钮或链接的内容只有一个图标，需要为该控件提供无障碍名称，可以在控件上设置 <code>aria-label</code>，也可以在图标上设置 <code>title</code>：
      </p>
      <Code lang="tsx" code={`import { Settings } from "kubai-icons-react";

<button aria-label="Settings"><Settings /></button>

<button><Settings title="Settings" /></button>`} />
      <p><code>&lt;kubai-icon&gt;</code> Web Component从 <code>label</code> 属性获取无障碍名称。</p>
      <h2>输入与动效</h2>
      <ul className="my-5">
          <li>设置了 <code>prefers-reduced-motion</code> 时，图标不播放动画，直接进入结束状态。</li>
          <li>使用 <code>trigger=&quot;parent&quot;</code> 时，键盘聚焦会像悬停一样播放动效；鼠标点击后留下的焦点则不会。</li>
          <li>在触摸屏上，点按时动效先正向播放，再反向播放回原位。切换型图标则会切换状态。</li>
          <li><code>Bookmark</code> 等切换型图标只通过颜色和形状表示状态。请在图标旁添加可见文字，或在按钮上设置 <code>aria-pressed</code>，以便屏幕阅读器读出当前状态。</li>
        </ul>
    </Prose>
  );
}

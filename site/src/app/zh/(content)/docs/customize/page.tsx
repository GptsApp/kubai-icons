import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Prose, Title, Code } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "自定义图标", path: "/zh/docs/customize/", description: "修改图标的主色、柔和样式、角标颜色、尺寸和悬停触发方式。所有色调都由同一个主色派生。" });

export default function Page() {
  return (
    <Prose>
      <Title lead={"图标的颜色、角标、尺寸和动效都通过 props 和 CSS 自定义属性设置"}>
        自定义
      </Title>
      <div className="my-5 space-y-5">
          <h2>颜色</h2>
          <p>图标的所有颜色都由同一个主色计算得出。主色默认为 <code>currentColor</code>，因此可以在图标或其任意祖先元素上设置 CSS <code>color</code> 属性来修改：</p>
        </div>
      <Code lang="html" code={`<span style="color: #14B8A6"><kubai-icon name="leaf"></kubai-icon></span>`} />
      <p>
        这些颜色通过 CSS <code>color-mix()</code> 计算，因此为 <code>color</code> 设置过渡后，所有渐变都会平滑过渡到新颜色：
      </p>
      <Code lang="css" code={`.kubai-icon { transition: color .3s ease; }`} />
      <div className="my-5 space-y-5">
          <h2>角标</h2>
          <p>带角标的图标（例如 <code>folder-plus</code> 或 <code>user-check</code>）在一角显示角标。角标默认是深色圆底加白色图形。<code>badgeColor</code> 用于修改圆底的颜色。<code>badgeColor=&quot;semantic&quot;</code> 会为每个角标选择合适的颜色：添加和完成用绿色，移除和取消用红色，警告用琥珀色。</p>
        </div>
      <Code lang="tsx" code={`import { FolderPlus } from "kubai-icons-react";

<FolderPlus />                          {/* dark badge */}
<FolderPlus badgeColor="semantic" />    {/* green plus */}
<FolderPlus badgeColor="#7C3AED" />`} />
      <div className="my-5 space-y-5">
          <h2>CSS 自定义属性</h2>
          <p>在图标或其任意祖先元素上设置这些属性，可以单独覆盖某个色调。内部图形是指绘制在图标上的线条和符号。</p>
          <table>
            <thead><tr><th>属性</th><th>控制内容</th></tr></thead>
            <tbody>
              <tr><td><code>--ki-c</code></td><td>渐变和浅色内部图形的基础色。默认值：<code>currentColor</code>。</td></tr>
              <tr><td><code>--ki-e</code></td><td>轮廓和深色内部图形的基础色。默认值：<code>--ki-c</code>。</td></tr>
              <tr><td><code>--ki-w</code></td><td>默认呈白色的内部图形所用的颜色。</td></tr>
              <tr><td><code>--ki-b</code></td><td>角标圆底的颜色。默认值：中性深灰色。</td></tr>
              <tr><td><code>--ki-l</code></td><td>大面积纯色填充向顶部渐变为白色的程度，取值范围为 0% 到 100%。</td></tr>
            </tbody>
          </table>
          <p><code>variant=&quot;soft&quot;</code> 会设置除 <code>--ki-b</code> 以外的所有属性。</p>
          <h2>为整个页面设置样式</h2>
          <p>样式与 <code>color</code> 一样可以继承。在任一元素上设置后，其内部图标一律沿用，自身设置了 <code>variant</code> 的图标除外。离图标越近的设置优先级越高：图标自身的 prop 优先，其次是最近的元素，最后是默认值 <code>color</code>。</p>
          <Code lang="tsx" code={`import { Folder, VARIANTS } from "kubai-icons-react";

<body style={VARIANTS.soft}>
  <Folder />                  {/* soft */}
  <Folder variant="color" />  {/* color */}
</body>`} />
          <p>同一个对象也可以在 Vue 中通过 <code>:style</code> 使用。不使用框架时，调用 <code>setVariant</code>：</p>
          <Code lang="js" code={`import { setVariant } from "kubai-icons/runtime";

setVariant(document.documentElement, "soft");`} />
          <p>静态 SVG 文件的颜色已写入文件，因此通过文件夹选择样式：<code>svg/</code> 或 <code>svg-soft/</code>。</p>
          <h2>尺寸</h2>
          <p>通过 <code>size</code> prop 设置尺寸。尺寸为 24px 及以下时，角标空间有限，应使用基础图标，不宜使用带角标的图标。画布规格详见<Link href="/zh/docs/design/">设计语言</Link>。</p>
          <h2>动效</h2>
          <p>所有动效都持续 460ms，缓动曲线为 <code>cubic-bezier(.22, 1, .36, 1)</code>，并从图标的当前位置开始，因此可以在中途反向。设置了 <code>prefers-reduced-motion</code>（减弱动态效果）时，图标会直接切换到结束状态，不播放动画。</p>
        </div>
    </Prose>
  );
}

import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Prose, Title, Code } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "性能", path: "/zh/docs/performance/", description: "Kubai Icons 的软件包如何影响打包体积和运行开销：每个图标一个模块，支持摇树优化，动效代码只在图标运动时运行。" });

export default function Page() {
  return (
    <Prose>
      <Title lead={"本页说明这些软件包对打包体积和运行开销的影响，以及如何渲染大量图标"}>
        性能
      </Title>
      <div className="my-5 space-y-5">
          <h2>图标的加载与运行</h2>
          <ul>
            <li><strong>每个图标一个模块。</strong>图标模块没有副作用，打包工具会移除未导入的图标。</li>
            <li><strong>预渲染的SVG 代码。</strong>静止状态以字符串形式发布，无论在服务器还是浏览器中，首次绘制前都无需计算。</li>
            <li><strong>按需运行动效。</strong>动效代码只在图标运动时运行，动效结束即停止。</li>
            <li><strong>共享代码。</strong>所有图标共用一个几何模块，所有动态图标共用一个运行时，因此浏览器和 CDN 只需缓存一份。</li>
            <li><strong>用 CSS 控制颜色。</strong>更改整页图标的颜色只需改动一处 CSS，图标不会重新渲染。</li>
          </ul>
          <h2>大量图标</h2>
          <p>每个图标都使用 SVG 滤镜生成阴影和高光。如果要展示数百个图标，请只渲染可见的行，或者在 <code>&lt;img&gt;</code> 标签中使用<Link href="/zh/docs/static/">静态 SVG 文件</Link>，浏览器只需将其光栅化一次。</p>
          <h2>深层导入</h2>
          <p>开发服务器通常会加载整个包的入口文件，而入口文件引用了所有图标。为避免此情况，请从各图标自身的文件导入：</p>
        </div>
      <Code lang="ts" code={`import Folder from "kubai-icons-react/icons/folder";`} />
    </Prose>
  );
}

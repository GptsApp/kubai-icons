import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Prose, Title, Code } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "静态 SVG 图标", path: "/zh/docs/static/", description: "每个 Kubai 图标的独立 SVG 文件，颜色固定，可用于图片标签、设计工具和不使用 JavaScript 的页面。" });

export default function Page() {
  return (
    <Prose>
      <Title lead={<><code>kubai-icons-static</code> 将每个图标提供为一个独立的 SVG 文件。颜色直接写入文件，无需脚本或样式表。</>}>
        静态 SVG
      </Title>
      <h2>安装</h2>
      <Code lang="bash" code="npm install kubai-icons-static" />
      <div className="my-5 space-y-5">
          <h2>文件</h2>
          <p>
            <code>svg/</code> 包含所有图标的默认蓝色（#5393FF）版本。<code>svg-soft/</code> 包含所有图标的柔和样式版本，颜色为蓝灰色。
          </p>
          <p>
            每个文件都为投影留出了额外边距。要与 24px 显示的动态图标大小一致，请以 28px 显示该文件。文件中的每个 <code>id</code> 都包含图标名称，因此同一页面可以内联多个图标。
          </p>
          <h2>CDN</h2>
          <p>也可通过 CDN 直接引用这些文件：</p>
        </div>
      <Code lang="html" code={`<img src="https://cdn.jsdelivr.net/npm/kubai-icons-static@0/svg/folder.svg" width="28" height="28" alt="" />`} />
      <div className="my-5 space-y-5">
        <h2>任意颜色</h2>
        <p>上面的文件只有两种颜色。需要其他主色时，可以通过地址获取图标，无法安装依赖的 Agent 和工具也能使用。</p>
      </div>
      <Code lang="html" code={`<img src="https://icons.kubai.design/api/icon/folder.svg?color=EC4899" width="28" height="28" alt="" />`} />
      <div className="my-5 space-y-5">
        <ul>
          <li><code>color</code>：六位十六进制颜色值，可带或不带 <code>#</code>，默认 5393FF。</li>
          <li><code>variant</code>：<code>color</code> 或 <code>soft</code>。</li>
          <li><code>badge</code>：带徽章的图标使用，可填 <code>semantic</code> 或十六进制颜色值。</li>
          <li><code>size</code>：宽高像素，范围 16 到 2048，默认 96。</li>
        </ul>
      </div>
      <div className="my-5 space-y-5">
          <p>jsDelivr 会长期缓存指定确切版本的 URL。指定主版本的 URL（例如 <code>@0</code>）则会定期刷新，从而获取新版本。</p>
          <h2>自定义颜色</h2>
          <p>在<Link href="/zh/icons/">图标页</Link>中，可以选择颜色和样式，将图标下载为 SVG 或 PNG。这些文件使用普通的十六进制颜色值，Figma 等设计工具可以正确读取。</p>
          <h2>元数据</h2>
          <p><code>icons.json</code> 列出每个图标的分类和标签；对于带角标的图标，还列出基础图标和角标。<code>categories.json</code> 列出所有分类。</p>
        </div>
    </Prose>
  );
}

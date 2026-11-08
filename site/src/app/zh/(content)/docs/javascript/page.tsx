import { pageMeta } from "@/lib/seo";
import { Prose, Title, Code } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "JavaScript 图标与 Web Component", path: "/zh/docs/javascript/", description: "无需框架，通过原生 JavaScript 或 kubai-icon Web Component 创建 SVG 动态图标，导入方式支持摇树优化。" });

export default function Page() {
  return (
    <Prose>
      <Title lead={<><code>kubai-icons</code> 通过原生 JavaScript 创建图标，并提供 <code>&lt;kubai-icon&gt;</code> Web Component</>}>
        JavaScript
      </Title>
      <h2>安装</h2>
      <Code lang="bash" code="npm install kubai-icons" />
      <h2>创建元素</h2>
      <p><code>createIcon</code> 返回一个 <code>&lt;svg&gt;</code> 元素，可以直接添加到页面中：</p>
      <Code lang="js" code={`import { createIcon, Folder, MailPlus } from "kubai-icons";

document.querySelector("#toolbar").append(
  createIcon(Folder, { size: 24 }),
  createIcon(MailPlus, { color: "#EC4899", trigger: "parent" })
);`} />
      <p>
        <code>trigger: &quot;parent&quot;</code> 只有在创建图标后同步添加到页面时才生效，如本例所示。如果要稍后添加图标，请参见<a href="#server-rendering">在服务端渲染</a>，并自行绑定。
      </p>
      <h2>替换占位元素</h2>
      <p>在需要显示图标的位置添加带有 <code>data-kubai</code> 的元素，然后调用 <code>replaceIcons</code>，将每个元素替换为对应的 SVG。所有用到的图标都要列在 <code>icons</code> 选项中。本例假定项目使用打包工具：</p>
      <Code lang="html" code={`<i data-kubai="folder" data-size="32"></i>
<i data-kubai="calendar-check" data-color="#22C55E"></i>

<script type="module">
  import { replaceIcons, Folder, CalendarCheck } from "kubai-icons";
  replaceIcons({ icons: { Folder, CalendarCheck } });
</script>`} />
      <h2>使用 Web Component</h2>
      <p>
        添加一个 script 标签，即可从 CDN 加载该组件。某个图标首次使用时，组件才会下载对应的图标文件。
      </p>
      <Code lang="html" code={`<script type="module" src="https://cdn.jsdelivr.net/npm/kubai-icons@0/dist/element.js"></script>

<kubai-icon name="folder"></kubai-icon>
<kubai-icon name="bell-off" size="32" color="#F97316" variant="soft" label="Muted"></kubai-icon>`} />
      <h2 id="server-rendering">在服务端渲染</h2>
      <p><code>toSvg</code> 以 HTML 字符串的形式返回图标，不带动效：</p>
      <Code lang="js" code={`import { toSvg, Folder } from "kubai-icons";

const html = toSvg(Folder, { size: 24, title: "Files" });`} />
      <p>
        要在浏览器中添加动效，先找到已渲染的 <code>&lt;svg&gt;</code> 元素并传给 <code>animate</code>，再把返回结果连接到负责启动动效的元素：
      </p>
      <Code lang="js" code={`import { animate, bindTrigger, Folder } from "kubai-icons";

const svg = document.querySelector("#files svg");
bindTrigger(svg.parentElement, animate(svg, Folder), Folder);`} />
    </Prose>
  );
}

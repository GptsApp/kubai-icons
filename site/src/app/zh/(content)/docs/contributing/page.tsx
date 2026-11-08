import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Prose, Title, Code } from "@/components/docs/prose";
import { REPO, submitPrompt } from "@/lib/site";

export const metadata = pageMeta({ title: "贡献图标", path: "/zh/docs/contributing/", description: "为 Kubai Icons 申请新图标或贡献图标：申请所需信息、项目运行方法以及图标检查方式。" });

export default function Page() {
  return (
    <Prose>
      <Title lead={"本页说明如何申请图标、报告图标问题，以及贡献自己绘制的图标"}>
        参与贡献
      </Title>
      <div className="my-5 space-y-5">
          <h2>申请图标</h2>
          <p>请提交<a href={`${REPO}/issues/new?template=icon-request.yml`}>图标申请</a>，说明图标的用途、代表它的日常物品，以及它的悬停动效。我们优先处理物品明确的申请。</p>
          <h2>报告图标问题</h2>
          <p>如果发现接缝外露、小尺寸下内部图形模糊或动效不正确等问题，请提交<a href={`${REPO}/issues/new?template=icon-bug.yml`}>图标问题报告</a>，并附上截图。</p>
          <h2 id="submit-an-icon">提交图标</h2>
          <p>如果你用 Skill 或手工绘制了图标，又不想发起 Pull Request（PR），可以使用<Link href="/zh/icons/submit/">提交页面</Link>。该页面在浏览器中检查文件，并生成 GitHub Issue。发布 Issue 之前，文件不会上传。</p>
          <p>请将图标导出为 SVG。使用 Skill 时，运行 <code>node scripts/export.mjs</code>。仅提交静态 SVG 即可，图标通过审核后由维护者补充动效。如需提供自己的动效，请附上图标的源文件。</p>
          <p>维护者依据设计规则，通过 Issue 中的预览图逐一人工审核。徽标、商标以及任何描摹自其他图标集的内容都不予接受。通过审核的图标将依据 MIT 许可证收入图标库，并为提交者署名。</p>
          <p>如需由编程智能体提交图标，请将以下提示词粘贴到智能体的输入框中。智能体会先请你确认条款，再通过 GitHub CLI 发布 Issue：</p>
          <Code code={submitPrompt("zh")} />
          <h2>绘制图标</h2>
          <p>图标存放在 <code>icons/</code> 目录中，每个图标一个 ES 模块。可以使用 <Link href="/zh/skill/">Kubai Icons Skill</Link> 绘制，也可以手工绘制，并遵循 <a href={`${REPO}/blob/master/PROMPT.md`}>PROMPT.md</a> 和 <a href={`${REPO}/blob/master/docs/authoring.md`}>docs/authoring.md</a>。要检查绘制结果，请将下方的 <code>my-icon</code> 替换为你的图标名称：</p>
        </div>
      <Code lang="bash" code={`git clone ${REPO}
cd kubai-icons && npm install
node tools/check.mjs --only my-icon --with folder,mail   # contact sheets in check-out/lib
npm run validate                                          # names, metadata, markup
npm run build:packages
npm test`} />
      <div className="my-5 space-y-5">
          <p><code>tools/check.mjs</code> 会生成对比图，也就是把你的图标和 <code>--with</code> 列出的现有图标并排展示的预览图。请将对比图附在PR中。CI 会重新渲染改动过的图标并运行测试，维护者则审核图标与整套图标是否协调。</p>
          <h2>许可证</h2>
          <p>贡献的图标和软件包代码均以 MIT 许可证发布。对网站和 Skill 的改动遵循各自的条款，详见<Link href="/zh/license/">许可证</Link>页面。</p>
        </div>
    </Prose>
  );
}

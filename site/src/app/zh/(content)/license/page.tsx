import { pageMeta } from "@/lib/seo";
import { Prose, Title } from "@/components/docs/prose";
import { REPO } from "@/lib/site";

export const metadata = pageMeta({ title: "许可证", path: "/zh/license/", description: "Kubai Icons 的许可方式：图标和软件包采用 MIT 许可证，网站保留所有权利，智能体 Skill 源码可见。" });

export default function Page() {
  return (
    <Prose>
      <Title lead={"图标和软件包采用 MIT 许可证，网站保留所有权利，Skill 源码可见"}>许可证</Title>
      <div className="my-5 space-y-5">
          <p>本页为中文译文，如有歧义，以英文版为准。</p>
          <h2>图标和软件包</h2>
          <p>图标以及软件包 <code>kubai-icons</code>、<code>kubai-icons-react</code>、<code>kubai-icons-vue</code> 和 <code>kubai-icons-static</code> 均依据 <a href={`${REPO}/blob/master/LICENSE-ICONS`}>MIT 许可证</a>发布。允许商业使用、修改和再分发，但须随源代码保留版权声明。在已发布的产品中无需署名。</p>
          <h2>网站</h2>
          <p>本网站（包括其代码、文字、设计和版式）<a href={`${REPO}/blob/master/LICENSE-SITE`}>保留所有权利</a>。可以阅读其源代码，也可为参与贡献而在本地运行。复制、托管或再分发本网站须取得书面许可。网站上的图标仍适用 MIT 许可证。</p>
          <h2>Skill</h2>
          <p>Skill 依据 <a href={`${REPO}/blob/master/LICENSE`}>Kubai Icons 许可证</a>以源码可见的方式提供。可安装和运行，包括用于商业用途。使用 Skill 绘制的图标归其作者所有。</p>
          <p>各文件适用的许可证列于 <a href={`${REPO}/blob/master/LICENSING.md`}>LICENSING.md</a>。</p>
          <h2>商标</h2>
          <p>Kubai 和 Lumno 的名称及徽标不在上述任何许可证的涵盖范围内。</p>
        </div>
    </Prose>
  );
}

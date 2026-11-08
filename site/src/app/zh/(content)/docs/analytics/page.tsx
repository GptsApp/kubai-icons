import { pageMeta } from "@/lib/seo";
import { Prose, Title } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "隐私", path: "/zh/docs/analytics/", description: "Kubai Icons 的软件包和网站收集哪些数据：npm 软件包和 CDN 文件不包含任何跟踪或遥测功能。" });

export default function Page() {
  return (
    <Prose>
      <Title lead={"本页说明 Kubai Icons 的软件包和网站收集哪些数据"}>
        隐私
      </Title>
      <div className="my-5 space-y-5">
          <p>本页为中文译文，如有歧义，以英文版为准。</p>
          <h2>软件包</h2>
          <p>npm 软件包和 CDN 文件不包含任何跟踪或遥测功能。Web Component仅在加载图标文件时发起网络请求，请求地址与组件自身的加载来源相同。</p>
          <h2>网站</h2>
          <p>本网站使用 <a href="https://umami.is/privacy">Umami</a> 统计页面浏览量和下列产品事件，以了解缺少哪些图标以及哪些格式较为常用：</p>
          <ul>
            <li>打开、复制（包括所复制的格式）或下载某个图标；</li>
            <li>下载某个收藏夹，包括其大小和格式；</li>
            <li>搜索词，以及该搜索是否返回了结果；</li>
            <li>使用分类筛选，或复制安装命令；</li>
            <li>申请图标（包括相应的搜索词），或提交图标；</li>
            <li>打开反馈链接或作者链接。</li>
          </ul>
          <p>Umami 不设置 Cookie，但会接收每次网络请求附带的 IP 地址和用户代理。搜索词按输入内容原样发送，因此请勿在搜索框中输入个人信息。</p>
          <p>发送 Do Not Track 或 Global Privacy Control 信号的浏览器不会加载分析脚本，因此这些浏览器的页面浏览和事件都不计入统计。</p>
          <p>收藏夹和显示偏好仅保存在访客的浏览器中。收藏夹链接将列表保存在 URL 片段中，浏览器不会将 URL 片段发送至服务器，分析工具也已设置为将其排除。</p>
          <p>页眉中的星标数读取自 GitHub 的公开 API，因此浏览器会为此访问 api.github.com。有关这些请求的处理方式，请参阅 <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub 隐私声明</a>。</p>
        </div>
    </Prose>
  );
}

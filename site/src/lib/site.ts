import { pick, type Locale } from "./i18n";

export const REPO = "https://github.com/kubai087/kubai-icons";
/** The icons the home page's Modules demo can import. */
export const MODULE_DEMO = ["folder", "bell", "lock", "mail"];
export const AUTHOR = { name: "Kubai087", x: "https://x.com/kubai087" } as const;
/** The repository's star count from GitHub's public API, or null when it cannot be read. */
export async function fetchStars(init?: RequestInit): Promise<number | null> {
  try {
    const res = await fetch(REPO.replace("github.com/", "api.github.com/repos/"), init);
    if (!res.ok) return null;
    const { stargazers_count: stars } = await res.json();
    return typeof stars === "number" ? stars : null;
  } catch {
    return null;
  }
}
/** The public address of the site, without a trailing slash. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://icons.kubai.design").replace(/\/$/, "");
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
/** A path under the site's base path, for files in public/. */
export const asset = (p: string) => `${BASE}${p.startsWith("/") ? p : `/${p}`}`;
export const PACKAGES = {
  react: "kubai-icons-react",
  vue: "kubai-icons-vue",
  core: "kubai-icons",
  static: "kubai-icons-static",
} as const;
/** The general feedback form, with the page it was opened from filled in. */
export const feedbackUrl = (page: string) => `${REPO}/issues/new?template=feedback.yml&page=${encodeURIComponent(page)}`;
/** The bug form for one icon, with its name filled in. */
export const reportIconUrl = (name: string) => `${REPO}/issues/new?template=icon-bug.yml&icons=${encodeURIComponent(name)}`;
/** The issue form for submitting an icon, with its name and motion filled in. */
export const submitUrl = (name: string, motion: string) =>
  `${REPO}/issues/new?template=icon-submission.yml&title=${encodeURIComponent(`[Icon submission] ${name}`)}&name=${encodeURIComponent(name)}&motion=${encodeURIComponent(motion)}`;
/** A prompt that has a coding agent put the icons into the project it is working on. */
export const productPrompt = (locale: Locale = "en") =>
  pick(
    locale,
    `Add Kubai Icons to this project:
1. Install the package for its framework: kubai-icons-react for React or Next.js, kubai-icons-vue for Vue or Nuxt, kubai-icons for anything else.
2. Find icons by name and tags in {site}/data/index.json. Usage is at {site}/docs/.
3. Replace the icons in the navigation and main actions with Kubai Icons of the same meaning. Keep their sizes and colors, and change no other code.
4. Run the project's build, then tell me which icons changed. List any with no good match instead of forcing one.`,
    `把 Kubai Icons 接入这个项目：
1. 根据项目的框架安装对应的包：React 或 Next.js 用 kubai-icons-react，Vue 或 Nuxt 用 kubai-icons-vue，其他情况用 kubai-icons。
2. 在 {site}/data/index.json 中按名称和标签查找图标，用法参考 {site}/docs/。
3. 把导航和主要按钮上的图标换成含义相同的 Kubai Icons，保持原有的尺寸和颜色，不改动其他代码。
4. 运行项目的构建，然后告诉我换了哪些图标。没有合适的就列出来，不要勉强替换。`,
    { site: SITE_URL, repo: REPO },
  );
/** A prompt that has an agent choose icon files for a slide deck or a document. */
export const slidesPrompt = (locale: Locale = "en") =>
  pick(
    locale,
    `Add Kubai Icons to my slides or document. It may be something new or an existing file that needs polish. Use your judgment on where icons help; not every page needs one. Keep one style and size throughout.

Icon list: {site}/data/index.json
Download an SVG: {site}/api/icon/<name>.svg?color=<six-digit hex without #>, adding &variant=soft for a softer look
Match the file's main color where you can. If the tool can't use SVG, convert to a PNG with a transparent background.`,
    `用 Kubai Icons 给我的 PPT 或文档配图标。可以是正在做的新内容，也可以是美化现有文件。哪里加图标合适由你判断，不必每页都有，整份文件的风格和大小保持统一。

图标清单：{site}/data/index.json，中文含义见 {site}/data/keywords.json
下载 SVG：{site}/api/icon/<图标名>.svg?color=<不带 # 的六位色值>，想要柔和一些就加 &variant=soft
颜色尽量取文件的主色。工具不支持 SVG 时，转成透明背景的 PNG。`,
    { site: SITE_URL, repo: REPO },
  );
export const agentPrompt  = (query = "", locale: Locale = "en") => {
  const subject = query.trim();
  const task = subject ? pick(locale, 'a "{subject}" icon', "一个“{subject}”图标", { subject }) : pick(locale, "a new icon", "一个新图标");
  return pick(locale, `Draw {task} with the Kubai Icons skill. If the skill is not installed, clone {repo} into your skills folder as kubai-icons first, then follow its SKILL.md.`, `使用 Kubai Icons Skill 绘制{task}。如尚未安装此 Skill，请先将 {repo} 克隆到你的 skills 目录，命名为 kubai-icons，然后按其中的 SKILL.md 操作。`, { task, repo: REPO });
};
/** A prompt that has a coding agent post an icon as a submission, after the author agrees to the terms. */
export const submitPrompt = (locale: Locale = "en") =>
  pick(
    locale,
    `Submit my icon to the Kubai Icons library:
1. Export it as an SVG by running node scripts/export.mjs --only <name> in the skill folder.
2. Ask me to confirm that I made it, that it contains no logos or copied artwork, and that I agree to publish it under the MIT License. Stop if I do not confirm.
3. Run gh issue create --repo kubai087/kubai-icons --title "[Icon submission] <name>" with a body using these headings: "### Name" (kebab-case), "### What it does on hover" and "### Files" (the SVG in a code block, plus the icon's .js source if there is one).
4. Tell me the issue link.`,
    `把我绘制的图标提交到 Kubai Icons 图标库：
1. 在 Skill 目录中运行 node scripts/export.mjs --only <图标名>，导出 SVG。
2. 请我确认：图标由我绘制，不含徽标或抄袭的内容，并同意以 MIT 许可证发布。未确认则停止。
3. 运行 gh issue create --repo kubai087/kubai-icons --title "[Icon submission] <name>"，正文使用这些标题："### Name"（短横线连接的小写英文）、"### What it does on hover"、"### Files"（用代码块放入 SVG，如有 .js 源文件也一并放入）。
4. 告诉我 Issue 链接。`,
    { site: SITE_URL, repo: REPO },
  );
/** A prefilled GitHub issue for an icon request. */
export const requestUrl = (query = "") =>
  `${REPO}/issues/new?template=icon-request.yml${query ? `&title=${encodeURIComponent(`[Icon request] ${query}`)}` : ""}`;

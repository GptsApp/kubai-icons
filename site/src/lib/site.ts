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
/** A prompt that has a coding agent draw an icon with the skill, installing it if needed. */
export const agentPrompt = (query = "", locale: "en" | "zh" = "en") =>
  locale === "zh"
    ? `使用 Kubai Icons Skill 绘制${query.trim() ? `一个“${query.trim()}”图标` : "一个新图标"}。如尚未安装此 Skill，请先将 ${REPO} 克隆到你的 skills 目录，命名为 kubai-icons，然后按其中的 SKILL.md 操作。`
    : `Draw ${query.trim() ? `a "${query.trim()}" icon` : "a new icon"} with the Kubai Icons skill. If the skill is not installed, clone ${REPO} into your skills folder as kubai-icons first, then follow its SKILL.md.`;
/** A prompt that has a coding agent post an icon as a submission, after the author agrees to the terms. */
export const submitPrompt = (locale: "en" | "zh" = "en") =>
  locale === "zh"
    ? `把我绘制的图标提交到 Kubai Icons 图标库：
1. 在 Skill 目录中运行 node scripts/export.mjs --only <图标名>，导出 SVG。
2. 请我确认：图标由我绘制，不含徽标或抄袭的内容，并同意以 MIT 许可证发布。未确认则停止。
3. 运行 gh issue create --repo kubai087/kubai-icons --title "[Icon submission] <name>"，正文使用这些标题："### Name"（短横线连接的小写英文）、"### What it does on hover"、"### Files"（用代码块放入 SVG，如有 .js 源文件也一并放入）。
4. 告诉我 Issue 链接。`
    : `Submit my icon to the Kubai Icons library:
1. Export it as an SVG by running node scripts/export.mjs --only <name> in the skill folder.
2. Ask me to confirm that I made it, that it contains no logos or copied artwork, and that I agree to publish it under the MIT License. Stop if I do not confirm.
3. Run gh issue create --repo kubai087/kubai-icons --title "[Icon submission] <name>" with a body using these headings: "### Name" (kebab-case), "### What it does on hover" and "### Files" (the SVG in a code block, plus the icon's .js source if there is one).
4. Tell me the issue link.`;
/** A prefilled GitHub issue for an icon request. */
export const requestUrl = (query = "") =>
  `${REPO}/issues/new?template=icon-request.yml${query ? `&title=${encodeURIComponent(`[Icon request] ${query}`)}` : ""}`;

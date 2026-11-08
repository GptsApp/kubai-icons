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
export const agentPrompt = (query = "") =>
  `Draw ${query.trim() ? `a "${query.trim()}" icon` : "a new icon"} with the Kubai Icons skill. If the skill is not installed, clone ${REPO} into your skills folder as kubai-icons first, then follow its SKILL.md.`;
/** A prefilled GitHub issue for an icon request. */
export const requestUrl = (query = "") =>
  `${REPO}/issues/new?template=icon-request.yml${query ? `&title=${encodeURIComponent(`[Icon request] ${query}`)}` : ""}`;

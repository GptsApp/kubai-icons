// Checks and packaging for icons submitted through the website. Everything runs in the
// visitor's browser; files leave it only when the visitor posts the GitHub issue.
import { pick, type Locale } from "./i18n";

/** Stays well inside GitHub's limit for the body of an issue. */
export const MAX_BYTES = 60_000;

const BLOCKED = new Set(["script", "foreignobject", "iframe", "object", "embed", "image", "audio", "video"]);
const OUTSIDE_URL = /url\(\s*['"]?(?!#)/i;

/** What has to change before this text can be submitted as an icon. Empty when it is fine. */
export function svgProblems(text: string, locale: Locale = "en"): string[] {
  const doc = new DOMParser().parseFromString(text, "image/svg+xml");
  const root = doc.documentElement;
  if (doc.querySelector("parsererror") || root.localName !== "svg") return [pick(locale, "This file is not a valid SVG.", "SVG 文件无效")];
  const problems = new Set<string>();
  if (!root.hasAttribute("viewBox") && !(root.hasAttribute("width") && root.hasAttribute("height"))) problems.add(pick(locale, "Add a viewBox to the SVG.", "请为 SVG 添加 viewBox"));
  for (const el of [root, ...root.querySelectorAll("*")]) {
    const tag = el.localName.toLowerCase();
    if (BLOCKED.has(tag)) problems.add(pick(locale, `Remove the <${el.localName}> element. Icons are vector shapes only.`, `请移除 <${el.localName}> 元素，图标只能使用矢量图形`));
    if (tag === "style" && (/@import/i.test(el.textContent ?? "") || OUTSIDE_URL.test(el.textContent ?? ""))) problems.add(pick(locale, "Remove references to files outside the SVG.", "请移除对 SVG 外部文件的引用"));
    for (const attr of el.attributes) {
      const name = attr.name.toLowerCase();
      if (name.startsWith("on")) problems.add(pick(locale, "Remove event handlers such as onclick.", "请移除 onclick 等事件属性"));
      if ((name === "href" || name === "xlink:href") && !attr.value.trim().startsWith("#")) problems.add(pick(locale, "Remove links to anything outside the SVG.", "请移除指向 SVG 外部的链接"));
      if (OUTSIDE_URL.test(attr.value)) problems.add(pick(locale, "Remove references to files outside the SVG.", "请移除对 SVG 外部文件的引用"));
    }
  }
  return [...problems];
}

/** What is wrong with a proposed icon name, or null. */
export function nameProblem(name: string, taken: Set<string>, locale: Locale = "en") {
  if (!name) return pick(locale, "Enter a name.", "请输入名称");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) return pick(locale, "Use lowercase English words joined by hyphens, like snow-globe.", "请使用连字符连接的小写英文单词，例如 snow-globe");
  if (taken.has(name)) return pick(locale, "The library already has an icon with this name.", "图标库中已有同名图标");
  return null;
}

/** A fence longer than any run of backticks in the code, so the code cannot end it early. */
function fenced(lang: string, code: string) {
  const longest = Math.max(2, ...(code.match(/`+/g) ?? []).map((run) => run.length));
  const fence = "`".repeat(longest + 1);
  return `${fence}${lang}\n${code.trim()}\n${fence}`;
}

/** The files in the form the issue expects. */
export function submissionFiles(svg: string, source: string | null) {
  return [`SVG\n\n${fenced("svg", svg)}`, ...(source ? [`Motion source\n\n${fenced("js", source)}`] : [])].join("\n\n");
}

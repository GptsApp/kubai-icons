// Checks and packaging for icons submitted through the website. Everything runs in the
// visitor's browser; files leave it only when the visitor posts the GitHub issue.

/** Stays well inside GitHub's limit for the body of an issue. */
export const MAX_BYTES = 60_000;

const BLOCKED = new Set(["script", "foreignobject", "iframe", "object", "embed", "image", "audio", "video"]);
const OUTSIDE_URL = /url\(\s*['"]?(?!#)/i;

/** What has to change before this text can be submitted as an icon. Empty when it is fine. */
export function svgProblems(text: string): string[] {
  const doc = new DOMParser().parseFromString(text, "image/svg+xml");
  const root = doc.documentElement;
  if (doc.querySelector("parsererror") || root.localName !== "svg") return ["This file is not a valid SVG."];
  const problems = new Set<string>();
  if (!root.hasAttribute("viewBox") && !(root.hasAttribute("width") && root.hasAttribute("height"))) problems.add("Add a viewBox to the SVG.");
  for (const el of [root, ...root.querySelectorAll("*")]) {
    const tag = el.localName.toLowerCase();
    if (BLOCKED.has(tag)) problems.add(`Remove the <${el.localName}> element. Icons are vector shapes only.`);
    if (tag === "style" && (/@import/i.test(el.textContent ?? "") || OUTSIDE_URL.test(el.textContent ?? ""))) problems.add("Remove references to files outside the SVG.");
    for (const attr of el.attributes) {
      const name = attr.name.toLowerCase();
      if (name.startsWith("on")) problems.add("Remove event handlers such as onclick.");
      if ((name === "href" || name === "xlink:href") && !attr.value.trim().startsWith("#")) problems.add("Remove links to anything outside the SVG.");
      if (OUTSIDE_URL.test(attr.value)) problems.add("Remove references to files outside the SVG.");
    }
  }
  return [...problems];
}

/** What is wrong with a proposed icon name, or null. */
export function nameProblem(name: string, taken: Set<string>) {
  if (!name) return "Enter a name.";
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) return "Use lowercase English words joined by hyphens, like snow-globe.";
  if (taken.has(name)) return "The library already has an icon with this name.";
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

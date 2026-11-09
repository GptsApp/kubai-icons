// Translates a documentation page by walking the page's React elements. The English page stays
// the only source of its structure and code samples; each block of text is looked up by its
// English, written with numbered tags for the elements inside it: "Use <0>size</0> to resize".
import { Children, cloneElement, Fragment, isValidElement, type ReactElement, type ReactNode } from "react";
import Link from "next/link";
import { Title } from "@/components/docs/prose";

type Element = ReactElement<{ children?: ReactNode; href?: string; lead?: ReactNode }>;
type Tools = { text: (english: string) => string; href: (path: string) => string };

const BLOCKS = new Set<unknown>(["h1", "h2", "h3", "h4", "p", "li", "th", "td", "dt", "dd", "caption", "figcaption", "summary", Title]);
const INLINE = new Set<unknown>(["a", "code", "strong", "em", "b", "i", "kbd", "span", "br", Link]);

/** The children, with fragments opened up. */
function flat(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap((c) => (isValidElement(c) && c.type === Fragment ? flat((c as Element).props.children) : [c]));
}

const allInline = (children: ReactNode): boolean =>
  flat(children).every((c) => !isValidElement(c) || (INLINE.has(c.type) && allInline((c as Element).props.children)));

/** The English of some inline content, collecting its elements in tag order. */
function serialize(children: ReactNode, parts: Element[]): string {
  return flat(children)
    .map((c) => {
      if (!isValidElement(c)) return String(c);
      const i = parts.length;
      parts.push(c as Element);
      return `<${i}>${serialize((c as Element).props.children, parts)}</${i}>`;
    })
    .join("");
}

/** The words outside code. Text with none is left as it is. */
const prose = (children: ReactNode): string =>
  flat(children)
    .map((c) => (!isValidElement(c) ? String(c) : c.type === "code" ? "" : prose((c as Element).props.children)))
    .join("");

/** Rebuilds inline content from translated text, putting the original elements back. */
function rebuild(text: string, parts: Element[], tools: Tools): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = text;
  for (let open = rest.match(/<(\d+)>/); open; open = rest.match(/<(\d+)>/)) {
    const part = parts[Number(open[1])];
    const end = rest.indexOf(`</${open[1]}>`);
    if (!part || end < 0) break;
    if (open.index! > 0) out.push(rest.slice(0, open.index));
    const inner = rest.slice(open.index! + open[0].length, end);
    const kids = rebuild(inner, parts, tools);
    out.push(cloneElement(part, { key: out.length, ...linked(part, tools) }, ...kids));
    rest = rest.slice(end + open[1].length + 3);
  }
  if (rest) out.push(rest);
  return out;
}

const linked = (el: Element, { href }: Tools) => (el.props.href?.startsWith("/") ? { href: href(el.props.href) } : {});

/** Translates one unit of inline content, or returns it unchanged if it has no words. */
function unit(children: ReactNode, tools: Tools): ReactNode[] | null {
  if (!allInline(children) || !/\p{L}/u.test(prose(children))) return null;
  const parts: Element[] = [];
  const english = serialize(children, parts);
  return rebuild(tools.text(english), parts, tools);
}

function walk(node: ReactNode, tools: Tools): ReactNode {
  if (!isValidElement(node)) return Array.isArray(node) ? node.map((n) => walk(n, tools)) : node;
  const el = node as Element;
  const props = { ...linked(el, tools), ...(el.props.lead ? { lead: unit(el.props.lead, tools) ?? el.props.lead } : {}) };
  const translated = BLOCKS.has(el.type) ? unit(el.props.children, tools) : null;
  if (translated) return cloneElement(el, props, ...translated);
  if (el.props.children === undefined) return cloneElement(el, props);
  const kids = Children.map(el.props.children, (c) => walk(c, tools)) ?? [];
  return cloneElement(el, props, ...kids);
}

/** The page with every block of text passed through `text` and every site link through `href`. */
export const translateTree = (page: ReactNode, text: (english: string) => string, href: (path: string) => string = (p) => p) => walk(page, { text, href });

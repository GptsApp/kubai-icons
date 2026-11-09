// Checks the site's translations against the English text they are keyed by. Running with
// UPDATE_I18N=1 rewrites site/src/i18n/source.json, the list of text to translate.
import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@babel/parser';
import { describe, expect, it } from 'vitest';
import { CONTENT_PAGES } from '../site/src/lib/content-pages';
import { translateTree } from '../site/src/lib/translate-tree';

const site = path.resolve('site/src');
const CALLS: Record<string, number> = { tr: 0, msg: 0, pick: 1, translated: 1 };

function sourceFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const file = path.join(dir, e.name);
    if (e.isDirectory()) return ['i18n', 'generated', 'zh'].includes(e.name) ? [] : sourceFiles(file);
    // Only English and Simplified Chinese have a page per icon.
    return /\.tsx?$/.test(e.name) && e.name !== 'icon-page.tsx' ? [file] : [];
  });
}

type Node = { type: string; [key: string]: unknown };
const isNode = (v: unknown): v is Node => typeof (v as Node | null)?.type === 'string';

function collectUi() {
  const keys = new Set<string>();
  const dynamic: string[] = [];
  const addText = (node: Node, file: string) => {
    if (node.type === 'StringLiteral') keys.add(node.value as string);
    else if (node.type === 'ConditionalExpression') { addText(node.consequent as Node, file); addText(node.alternate as Node, file); }
    else if (node.type === 'TemplateLiteral') {
      const quasis = node.quasis as { value: { cooked: string } }[];
      if (quasis.length === 1) keys.add(quasis[0].value.cooked);
      else dynamic.push(`${path.relative(site, file)}: ${quasis[0].value.cooked.slice(0, 50)}`);
    }
  };
  const visit = (node: Node, file: string) => {
    if (node.type === 'CallExpression' && (node.callee as Node).type === 'Identifier' && ((node.callee as Node).name as string) in CALLS) {
      const arg = (node.arguments as Node[])[CALLS[(node.callee as Node).name as string]];
      if (arg) addText(arg, file);
    }
    if (node.type === 'ObjectExpression') {
      const props = new Map((node.properties as Node[]).filter((p) => p.type === 'ObjectProperty').map((p) => [(p.key as Node).name as string, p.value as Node]));
      if (props.has('zh')) for (const name of ['label', 'group', 'en']) if (props.get(name)) addText(props.get(name)!, file);
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.filter(isNode).forEach((child) => visit(child, file));
      else if (isNode(value)) visit(value, file);
    }
  };
  for (const file of sourceFiles(site)) {
    visit(parse(fs.readFileSync(file, 'utf8'), { sourceType: 'module', plugins: file.endsWith('x') ? ['typescript', 'jsx'] : ['typescript'] }).program as unknown as Node, file);
  }
  const index = JSON.parse(fs.readFileSync(path.resolve('site/public/data/index.json'), 'utf8'));
  for (const c of index.categories) keys.add(c.en);
  return { keys: [...keys].sort(), dynamic };
}

function collectDocs() {
  const keys = new Set<string>();
  for (const { default: Page, metadata } of Object.values(CONTENT_PAGES)) {
    keys.add(String(metadata.title));
    keys.add(String(metadata.description));
    translateTree(Page(), (english) => { keys.add(english); return english; });
  }
  return [...keys].sort();
}

const { keys: ui, dynamic } = collectUi();
const docs = collectDocs();
const sourceFile = path.join(site, 'i18n/source.json');
if (process.env.UPDATE_I18N) fs.writeFileSync(sourceFile, JSON.stringify({ ui, docs }, null, 1) + '\n');

const languages: { code: string }[] = JSON.parse(fs.readFileSync(path.join(site, 'lib/languages.json'), 'utf8'));
const read = (code: string, file: string) => JSON.parse(fs.readFileSync(path.join(site, 'i18n', code, file), 'utf8'));
// A category's name may be lowercased or not, as the language writes it.
const marks = (text: string) => [...text.matchAll(/\{\w+\}|<\/?\d+>/g)].map((m) => m[0].replace('{lower}', '{name}')).sort();

describe('site text', () => {
  it('has no text built from pieces that a language could not reorder', () => expect(dynamic).toEqual([]));
  it('source.json lists the current English', () => expect(JSON.parse(fs.readFileSync(sourceFile, 'utf8'))).toEqual({ ui, docs }));
});

const baseIcons: string[] = JSON.parse(fs.readFileSync(path.resolve('site/public/data/index.json'), 'utf8')).icons.filter((i: { base?: string }) => !i.base).map((i: { name: string }) => i.name);

describe.each(languages.map((l) => l.code).filter((c) => c !== 'en' && c !== 'zh'))('%s', (code) => {
  it.each([['ui.json', ui], ['docs.json', docs]] as const)('%s translates everything', (file, keys) => {
    const text = read(code, file);
    expect(keys.filter((k) => !text[k])).toEqual([]);
    expect(Object.keys(text).filter((k) => !keys.includes(k))).toEqual([]);
  });
  it.each([['ui.json'], ['docs.json']])('%s keeps placeholders and tags', (file) => {
    const text: Record<string, string> = read(code, file);
    expect(Object.entries(text).filter(([en, t]) => marks(en).join() !== marks(t).join()).map(([en]) => en)).toEqual([]);
  });
  it('names every icon', () => {
    const words = read(code, 'icons.json');
    expect(baseIcons.filter((name) => !words[name]?.length)).toEqual([]);
  });
});

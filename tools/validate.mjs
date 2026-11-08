#!/usr/bin/env node
// Checks every icon's metadata and markup. Run directly or through the build.
//
//   node tools/validate.mjs
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadIcons, categories, root } from './registry.mjs';
import { renderInner } from '../packages/core/src/render.js';

const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validate(icons, badges) {
  const out = [];
  const cats = new Set(categories.map((c) => c.id));
  const seen = new Map();
  const keywords = JSON.parse(fs.readFileSync(path.join(root, 'icons', 'keywords.json'), 'utf8'));
  let missing = 0;
  for (const ic of icons) {
    const where = ic.base ? `${ic.name} (from ${ic.file})` : ic.file;
    const bad = (msg) => out.push(`${where}: ${msg}`);
    if (!NAME.test(ic.name)) bad('name must be kebab-case: a-z, 0-9 and single hyphens');
    if (seen.has(ic.name)) bad(`name "${ic.name}" is also used by ${seen.get(ic.name)}`);
    seen.set(ic.name, where);
    if (/^\d/.test(ic.name)) bad('name must start with a letter');
    if (typeof ic.zh !== 'string' || !/[㐀-鿿]/.test(ic.zh)) bad('zh must be a Simplified Chinese label');
    if (!cats.has(ic.category)) bad(`unknown category "${ic.category}"`);
    if (!Array.isArray(ic.tags) || !ic.tags.length || ic.tags.some((t) => typeof t !== 'string' || !t.trim())) bad('tags must be a non-empty list of strings');
    if (!ic.base) {
      const kw = keywords[ic.name];
      // Icons being drawn have no keywords yet; a pull request must have them.
      if (!kw) { if (process.env.CI) bad('needs an entry in icons/keywords.json'); else missing++; }
      else for (const facet of ['shape', 'object', 'meaning', 'action', 'zh']) if (!Array.isArray(kw[facet]) || !kw[facet].length) bad(`icons/keywords.json needs a non-empty "${facet}" list`);
      if (typeof ic.svg !== 'function' || typeof ic.target !== 'function' || typeof ic.draw !== 'function') bad('needs svg(u), target(hover, state) and draw(p, E)');
      for (const v of ic.variants || []) if (!badges.has(v)) bad(`unknown badge "${v}"`);
      if (new Set(ic.variants || []).size !== (ic.variants || []).length) bad('variants repeat a badge');
      const rest = ic.target?.(false, {});
      if (rest && ('c' in rest || 'e' in rest)) bad('target() must not use the parameter names c or e');
    }
    try {
      const a = renderInner(ic, { k: 'v' }), b = renderInner(ic, { k: 'v' }), h = renderInner(ic, { k: 'v', hover: true });
      if (a !== b) bad('markup differs between two builds; remove Date, Math.random or other input');
      for (const m of [a, h]) if (/NaN|undefined|Infinity|\[object/.test(m)) { bad('markup contains NaN, undefined or Infinity'); break; }
    } catch (e) {
      bad(`fails to render: ${e.message}`);
    }
  }
  if (missing) console.warn(`${missing} icons have no keywords yet; CI will require them.`);
  return out;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { icons, badges } = await loadIcons();
  const problems = validate(icons, badges);
  if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
  console.log(`${icons.length} icons valid.`);
}

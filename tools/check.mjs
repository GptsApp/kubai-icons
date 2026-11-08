#!/usr/bin/env node
// Visual self-check for library icons. Renders contact sheets with headless Chrome:
//   sheet.png     each icon large, at rest and at the end of the hover
//   frames.png    one column per moment of the hover, from rest to end
//   sizes.png     24px and 28px, rest and hover, on white
//   variants.png  the colour and soft variants on several accents
// and reports any icon whose code throws.
//
//   node tools/check.mjs [--only a,b] [--with c,d] [--category files] [--base] [--scale 2] [--out check-out/lib]
//
// --only picks icons by name (a trailing * matches a prefix, e.g. folder*); --with adds
// reference icons beside them; --category picks one category; --base leaves composites out.
import fs from 'node:fs';
import path from 'node:path';
import { loadIcons, root } from './registry.mjs';
import { renderSVG } from '../packages/core/src/render.js';
import { screenshot } from './chrome.mjs';

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const names = (v) => (v ? v.split(',').map((s) => s.trim()).filter(Boolean) : []);
const only = names(opt('--only')), extra = names(opt('--with'));
const category = opt('--category');
const scale = Number(opt('--scale') || 2);
const out = path.resolve(opt('--out') || path.join(root, 'check-out', 'lib'));

const { icons, failures } = await loadIcons({ composites: !args.includes('--base'), strict: false });
// Other icons that fail to load are reported but do not stop this check; a picked one does.
for (const x of failures) {
  const mine = only.some((p) => (p.endsWith('*') ? x.name.startsWith(p.slice(0, -1)) : p === x.name));
  if (mine) { console.error(`${x.name}: ${x.error}`); process.exit(1); }
}
const match = (pat) => icons.filter((i) => (pat.endsWith('*') ? i.name.startsWith(pat.slice(0, -1)) : i.name === pat));
let picked = icons;
if (only.length) picked = only.flatMap((p) => { const m = match(p); if (!m.length) { console.error(`No icon matches "${p}"`); process.exit(1); } return m; });
if (category) picked = picked.filter((i) => i.category === category);
const refs = extra.flatMap(match);
const set = [...new Map([...refs, ...picked].map((i) => [i.name, i])).values()];
if (!set.length) { console.error('Nothing to check.'); process.exit(1); }

const errors = [];
const safe = (icon, opts) => {
  try { return renderSVG(icon, { ...opts, k: `${icon.name}-${Math.random().toString(36).slice(2, 7)}` }); }
  catch (e) { errors.push(`${icon.name}: ${e.message}`); return '<svg viewBox="0 0 1 1"></svg>'; }
};
fs.mkdirSync(out, { recursive: true });
const css = `body{margin:0;background:#fff;font:11px/1.3 -apple-system,system-ui,sans-serif;color:#555}
.g{display:grid;gap:10px;padding:14px}.c{display:grid;justify-items:center;gap:4px}.r{display:flex;gap:6px}
.t{background:#F2F3F5;border-radius:12px;display:grid;place-items:center}.n{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}`;
const page = (body) => `<!doctype html><meta charset="utf-8"><style>${css}</style>${body}`;

// sheet: rest | hover at 64px on a 96px tile
{
  const cols = Math.min(8, set.length), cw = 210, ch = 132;
  const body = `<div class="g" style="grid-template-columns:repeat(${cols},${cw - 10}px)">${set.map((i) => `<div class="c"><div class="r">
    <div class="t" style="width:96px;height:96px">${safe(i, { size: 64, pad: 0 })}</div>
    <div class="t" style="width:96px;height:96px">${safe(i, { size: 64, pad: 0, hover: true })}</div></div><div class="n">${i.name}</div></div>`).join('')}</div>`;
  screenshot(page(body), path.join(out, 'sheet.png'), { width: cols * cw + 28, height: Math.ceil(set.length / cols) * ch + 28, scale });
}
// frames: progress 0 .. 1
{
  const steps = [0, 0.2, 0.4, 0.6, 0.8, 1];
  const body = `<div class="g" style="grid-template-columns:150px repeat(${steps.length},72px)">${set.map((i) => `<div class="n" style="align-self:center">${i.name}</div>${steps.map((s) => `<div class="t" style="width:72px;height:72px">${safe(i, { size: 48, pad: 0, progress: s })}</div>`).join('')}`).join('')}</div>`;
  screenshot(page(body), path.join(out, 'frames.png'), { width: 150 + steps.length * 82 + 28, height: set.length * 82 + 28, scale });
}
// sizes: 24 and 28 on white, rest and hover
{
  const cols = Math.min(12, set.length);
  const row = (o) => set.map((i) => `<div style="display:grid;place-items:center;height:40px">${safe(i, { ...o, pad: 0 })}</div>`).join('');
  const grid = (o) => `<div class="g" style="grid-template-columns:repeat(${cols},40px);gap:6px">${row(o)}</div>`;
  const body = grid({ size: 24 }) + grid({ size: 24, hover: true }) + grid({ size: 28 }) + grid({ size: 28, hover: true });
  screenshot(page(body), path.join(out, 'sizes.png'), { width: cols * 46 + 28, height: 4 * (Math.ceil(set.length / cols) * 46 + 28), scale: 3 });
}
// variants: accents × colour/soft
{
  const looks = [['#5393FF', 'color'], ['#F59E0B', 'color'], ['#22C55E', 'color'], ['#EC4899', 'color'], ['#2E3036', 'color'], ['#6F87B5', 'soft'], ['#5BA3A8', 'soft'], ['#C9946A', 'soft']];
  const body = `<div class="g" style="grid-template-columns:150px repeat(${looks.length},56px)">${set.map((i) => `<div class="n" style="align-self:center">${i.name}</div>${looks.map(([a, v]) => `<div class="t" style="width:56px;height:56px;border-radius:10px">${safe(i, { size: 36, pad: 0, accent: a, variant: v })}</div>`).join('')}`).join('')}</div>`;
  screenshot(page(body), path.join(out, 'variants.png'), { width: 150 + looks.length * 66 + 28, height: set.length * 66 + 28, scale });
}
if (errors.length) { console.error(`Errors:\n${errors.join('\n')}`); process.exitCode = 1; }
else console.log(`${set.length} icons checked, no errors. Sheets in ${path.relative(process.cwd(), out) || '.'}`);

#!/usr/bin/env node
// Overview sheets of every base icon, rest and hover side by side, 100 per page, for a
// quick visual review of the whole set: check-out/overview/page-N.png
//
//   node tools/overview.mjs [--category files] [--per 100]
import fs from 'node:fs';
import path from 'node:path';
import { loadIcons, root } from './registry.mjs';
import { renderSVG } from '../packages/core/src/render.js';
import { screenshot } from './chrome.mjs';

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const per = Number(opt('--per') || 100);
const { bases } = await loadIcons({ composites: false });
const list = opt('--category') ? bases.filter((b) => b.category === opt('--category')) : bases;
const out = path.join(root, 'check-out', 'overview');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
const cols = 10;
for (let p = 0; p * per < list.length; p++) {
  const page = list.slice(p * per, (p + 1) * per);
  const cells = page.map((ic, i) => `<div class="c"><div class="r">${renderSVG(ic, { size: 44, pad: 0, k: `a${p}x${i}` })}${renderSVG(ic, { size: 44, pad: 0, hover: true, k: `b${p}x${i}` })}</div><div class="n">${ic.name}</div></div>`).join('');
  const html = `<!doctype html><style>body{margin:0;padding:10px;background:#fff;font:10px system-ui;color:#555}.g{display:grid;grid-template-columns:repeat(${cols},128px);gap:6px}.c{background:#F3F4F6;border-radius:10px;padding:6px 4px 4px;display:grid;justify-items:center;gap:2px}.r{display:flex;gap:8px}.n{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:120px}</style><div class="g">${cells}</div>`;
  screenshot(html, path.join(out, `page-${p + 1}.png`), { width: cols * 134 + 20, height: Math.ceil(page.length / cols) * 76 + 24, scale: 1.5 });
}
console.log(`${list.length} icons on ${Math.ceil(list.length / per)} pages in check-out/overview`);

#!/usr/bin/env node
// Self-check for the icon set (PROMPT.md section 10). Renders the gallery in headless
// Chrome with reduced motion, so every state lands on its end frame, and writes:
//   rest.png, hover.png       the chosen icons at gallery size, at rest and hovered
//   size-24.png, size-28.png  the same icons at 24px and 28px, rest above hover
//   palettes.png              one row per palette
// and prints any script error raised while the page loads.
//
//   node scripts/check.mjs [--only 名字,名字] [--with 名字,名字] [--out dir]
//
// --only limits the check to some icons; --with adds existing icons beside them for
// comparison. CHROME overrides the browser path. Nothing ever opens a visible window.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const list = (v) => (v ? v.split(',').map((s) => s.trim()).filter(Boolean) : []);
const only = list(opt('--only'));
const extra = list(opt('--with'));
const out = path.resolve(opt('--out') || path.join(root, 'check-out'));
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
fs.mkdirSync(out, { recursive: true });
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'icon-check-'));

const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const js = ['src/engine.js', 'src/icons.js', 'src/app.js'].map(read).join('\n');
const html = read('index.html');
const shown = [...extra, ...only];
// Names must match icons that exist, or the screenshots would silently leave them out.
const known = new Set([...js.matchAll(/^  {\n    name: '([^']+)'/gm)].map((m) => m[1]));
const unknown = shown.filter((n) => !known.has(n));
if (unknown.length) {
  console.error(`Unknown icon names: ${unknown.join(', ')}`);
  process.exit(1);
}

// Errors are recorded on the root element before any icon code runs, then read back
// from the dumped DOM; external scripts would only report "Script error." from file://.
function page(css, script) {
  const pick = shown.length
    ? `const keep = new Set(${JSON.stringify(shown)});
       document.querySelectorAll('.tile').forEach((t) => { if (!keep.has(t.getAttribute('aria-label'))) t.remove(); });
       const order = ${JSON.stringify(shown)};
       const grid = document.getElementById('grid');
       order.forEach((n) => { const t = [...grid.children].find((c) => c.getAttribute('aria-label') === n); if (t) grid.appendChild(t); });`
    : '';
  return html
    .replace('<head>', '<head><script>window.addEventListener("error",(e)=>{const r=document.documentElement;r.dataset.err=(r.dataset.err?r.dataset.err+" | ":"")+e.message+" @"+e.lineno;});</script>')
    .replace(/<script src="src\/engine\.js"><\/script>\s*<script src="src\/icons\.js"><\/script>\s*<script src="src\/app\.js"><\/script>/,
      `<script>\n${js}\n</script><script>{${pick}}{${script || ''}}</script><style>${css || ''}</style>`);
}

const count = shown.length || (js.match(/^  {\n    name: '/gm) || []).length || 60;
const files = [];
function shot(name, content, w, h, scale = 1) {
  const file = path.join(profile, name + '.html');
  fs.writeFileSync(file, content);
  files.push(file);
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--force-prefers-reduced-motion', `--user-data-dir=${profile}`,
    '--hide-scrollbars', '--virtual-time-budget=3000', `--window-size=${w},${h}`, `--force-device-scale-factor=${scale}`,
    `--screenshot=${path.join(out, name + '.png')}`, 'file://' + file], { stdio: 'ignore' });
}

const cols = Math.min(6, count);
const rows = Math.ceil(count / cols);
const hoverAll = 'setTimeout(()=>document.querySelectorAll(".tile").forEach((t)=>t.dispatchEvent(new Event("focus"))),50);';
const hideBar = '.bar{display:none}main{padding-block:12px!important}';
shot('rest', page(hideBar + `.grid{grid-template-columns:repeat(${cols},minmax(0,1fr))!important}`), 1180, 60 + rows * 195);
shot('hover', page(hideBar + `.grid{grid-template-columns:repeat(${cols},minmax(0,1fr))!important}`, hoverAll), 1180, 60 + rows * 195);

// Small sizes: one row at rest, the same icons hovered in a second row.
for (const px of [24, 28]) {
  const tile = px + 16, perRow = Math.min(count, 30);
  const small = `${hideBar}main{padding:12px!important;max-width:none!important}.grid{grid-template-columns:repeat(${perRow},${tile}px)!important;gap:6px!important}.tile{border-radius:8px}.ic{width:${px}px!important}`;
  const both = `const g=document.getElementById('grid');[...g.children].forEach((t)=>{const c=t.cloneNode(false);g.appendChild(c);});`;
  // The hovered row re-mounts each icon so it can sit next to its resting copy.
  const hoverRow = `${both}const tiles=[...g.children];const half=tiles.length/2;
    tiles.slice(0,half).forEach((t,i)=>{const host=document.createElement('span');host.className='ic';tiles[half+i].appendChild(host);
      const icon=ICONS.find((x)=>x.name===t.getAttribute('aria-label'));const idx=insts.findIndex((x)=>x.icon===icon);
      PALETTES.forEach((pal)=>{pal.colors[1000+i]=pal.colors[idx];if(pal.edges)pal.edges[1000+i]=pal.edges[idx];});
      const inst=mountIcon(icon,1000+i,host);inst.hover=1;inst.cur=targetOf(inst);render(inst);});`;
  shot(`size-${px}`, page(small, hoverRow), 24 + Math.min(count, 30) * (tile + 6), 24 + 2 * (tile + 6) * Math.ceil(count / 30), 2);
}

// Palettes: one screenshot per palette, stacked into one sheet by the page itself.
const palettes = `const rows=[];const g=document.getElementById('grid');
  PALETTES.forEach((pal,pi)=>{const row=document.createElement('div');row.className='prow';
    const label=document.createElement('span');label.textContent=pal.name;row.appendChild(label);
    [...g.children].forEach((t,i)=>{const icon=ICONS.find((x)=>x.name===t.getAttribute('aria-label'));const host=document.createElement('span');host.className='pic';row.appendChild(host);
      const idx=insts.findIndex((x)=>x.icon===icon);const k=2000+pi*100+i;pal.colors[k]=pal.colors[idx];if(pal.edges)pal.edges[k]=pal.edges[idx];
      const prev=runtime.palette;runtime.palette=pal;const inst=mountIcon(icon,k,host);runtime.palette=prev;
    });
    rows.push(row);});
  g.replaceWith(...rows);`;
// Each palette row is painted with its own palette at mount time; later paints never run.
shot('palettes', page(`${hideBar}.prow{display:flex;align-items:center;gap:14px;padding:6px 0}.prow span:first-child{width:56px;font-size:12px;color:#6B707A}.pic{width:36px;display:block}.pic svg{width:100%;height:auto;overflow:visible;display:block}`, palettes),
  Math.max(400, 100 + count * 50), 40 + 8 * 70, 2);

// Errors: dump each page's DOM and read the attribute the listener recorded.
const errors = files.map((file) => {
  const dom = execFileSync(chrome, ['--headless=new', '--disable-gpu', '--force-prefers-reduced-motion', `--user-data-dir=${profile}`,
    '--virtual-time-budget=3000', '--dump-dom', 'file://' + file], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  const m = dom.match(/data-err="([^"]*)"/);
  return m ? `${path.basename(file, '.html')}: ${m[1]}` : null;
}).filter(Boolean);
const err = errors.join('\n');
fs.rmSync(profile, { recursive: true, force: true });
console.log(err ? `Script errors:\n${err}` : 'No script errors.');
console.log(`Screenshots in ${out}`);
process.exitCode = err ? 1 : 0;

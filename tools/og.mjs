#!/usr/bin/env node
// Renders the site's share images from the real icons:
//   assets/og.png                 the Open Graph card, 1200×630
//   site/src/app/apple-icon.png   the touch icon, 180×180
//
//   node tools/og.mjs
//
// Needs Chrome (CHROME overrides the path), a built packages/core, and network access for
// the Geist font.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const chrome = process.env.CHROME || [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => fs.existsSync(p));
if (!chrome) { console.error('Chrome not found. Set CHROME to the browser binary.'); process.exit(1); }

const WALL = [
  'Bell', 'Folder', 'Mail', 'Camera', 'Gift', 'AlarmClock',
  'Lock', 'Calendar', 'Trash', 'Heart', 'Compass', 'Settings',
  'Bookmark', 'Key', 'Package', 'Star', 'CloudUpload', 'Wallet',
  'Smartphone', 'Notebook', 'Download', 'Eye', 'Album', 'Rocket',
  'Coffee', 'Headphones', 'Globe', 'Cloud', 'Umbrella', 'Lightbulb',
];
const HUES = ['#5393FF', '#EC4899', '#22C55E', '#F97316', '#8B5CF6'];
const logo = fs.readFileSync(path.join(root, 'site/src/app/icon.svg'), 'utf8');

const entry = `
import { toSvg, animate, ${WALL.join(', ')} } from ${JSON.stringify(path.join(root, 'packages/core/dist/index.js'))};
const COLS = 6, TILE = 168, GAP = 18, ICON = 104;
const icons = [${WALL.join(', ')}], hues = ${JSON.stringify(HUES)};
const wall = document.querySelector('.wall');
icons.forEach((icon, i) => {
  const cell = document.createElement('div');
  cell.className = 'tile';
  // Hues run diagonally, so neighbours always differ.
  const hue = hues[(i % COLS + Math.floor(i / COLS) * 2) % hues.length];
  cell.innerHTML = toSvg(icon, { color: hue, size: ICON, id: 'i' + i });
  const el = cell.firstElementChild;
  // Every other icon is caught at the end of its motion.
  if ((i + Math.floor(i / COLS)) % 2) { const c = animate(el, icon); c.hover(true, true); c.destroy(); }
  wall.appendChild(cell);
});
document.documentElement.dataset.ready = '1';
`;

const css = `
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { font-family: Geist, -apple-system, sans-serif; color: #15161A; background:
    radial-gradient(900px 620px at 88% 12%, #E4EDFF 0%, transparent 62%),
    radial-gradient(760px 560px at 72% 108%, #FFE6F1 0%, transparent 60%),
    #FBFBFC; position: relative; }
  .stage { position: absolute; inset: 0; perspective: 1500px; -webkit-mask-image: linear-gradient(90deg, transparent 52%, #000 72%); }
  .wall { position: absolute; left: 500px; top: -226px; display: grid; grid-template-columns: repeat(6, 168px); gap: 18px;
    transform: rotateX(38deg) rotateY(-10deg) rotateZ(24deg); transform-origin: 50% 50%; transform-style: preserve-3d; }
  .tile { width: 168px; height: 168px; border-radius: 40px; display: grid; place-items: center;
    background: linear-gradient(160deg, #FFFFFF, #F4F5F8); box-shadow: 0 1px 0 #fff inset, 0 0 0 1px rgba(21,22,26,.05), 0 18px 34px -14px rgba(36,48,84,.22); }
  .tile svg { display: block; overflow: visible; }
  .copy { position: absolute; left: 72px; top: 0; bottom: 0; width: 620px; display: flex; flex-direction: column; justify-content: center; }
  .brand { display: flex; align-items: center; gap: 16px; font-size: 34px; font-weight: 600; letter-spacing: -0.02em; }
  .brand svg { width: 56px; height: 56px; display: block; }
  h1 { font-size: 72px; line-height: 1.06; font-weight: 600; letter-spacing: -0.04em; margin: 36px 0 36px; white-space: nowrap; }
  .for { display: flex; gap: 10px; }
  .for span { font-size: 24px; font-weight: 500; letter-spacing: -0.01em; color: #4A4D57; padding: 8px 18px; border-radius: 999px; background: rgba(255,255,255,.82); box-shadow: 0 0 0 1px rgba(21,22,26,.09); }
`;
const page = (bundle) => `<!doctype html><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@500;600&display=block">
<style>${css}</style>
<div class="stage"><div class="wall"></div></div>
<div class="copy">
  <div class="brand">${logo}<span>Kubai Icons</span></div>
  <h1>Folders open.<br>Bells ring.<br>Locks unlock.</h1>
  <div class="for"><span>React</span><span>Vue</span><span>Web</span><span>SVG</span></div>
</div>
<script>${bundle.replace(/<\/script/g, '<\\/script')}</script>`;

const touch = `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;width:180px;height:180px;background:#fff;overflow:hidden}body{display:grid;place-items:center}svg{width:132px;height:132px;display:block}</style>${logo}`;

const work = fs.mkdtempSync(path.join(os.tmpdir(), 'kubai-icons-og-'));
const shot = (html, name, w, h, out) => {
  const file = path.join(work, `${name}.html`);
  fs.writeFileSync(file, html);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--force-device-scale-factor=1', `--user-data-dir=${path.join(work, 'profile')}`, '--hide-scrollbars',
    '--virtual-time-budget=8000', `--window-size=${w},${h}`, `--screenshot=${out}`, 'file://' + file], { stdio: 'ignore' });
  console.log(`${path.relative(root, out)}: ${w}×${h}, ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
};
try {
  const { outputFiles } = await build({ stdin: { contents: entry, resolveDir: root }, bundle: true, format: 'iife', minify: true, write: false, logLevel: 'warning' });
  shot(page(outputFiles[0].text), 'og', 1200, 630, path.join(root, process.env.OG_OUT || 'assets/og.png'));
  shot(touch, 'touch', 180, 180, path.join(root, 'site/src/app/apple-icon.png'));
} finally {
  fs.rmSync(work, { recursive: true, force: true });
}
process.exit(0);

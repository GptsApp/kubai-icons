#!/usr/bin/env node
// Copyright (c) 2026 Kubai087. Licensed under the Kubai Icons License; see LICENSE.
// Renders the animated images the READMEs show, from the real engine and icons:
//   assets/hover.webp     a wave of icons opening and closing
//   assets/skill.webp     the icons drawn by a fresh session from the skill alone
//   assets/palettes.webp  the same icons moving through every palette
//
//   node scripts/media.mjs [--only hover,skill,palettes]
//
// Every frame is posed headlessly the way the gallery animates it, then the frames are
// joined into looping WebP. Needs Chrome (CHROME overrides the path), ffmpeg and
// img2webp (from libwebp). Temporary files stay in the system temp folder and are removed.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const pick = (() => { const i = args.indexOf('--only'); return i >= 0 ? args[i + 1].split(',') : null; })();

const chrome = process.env.CHROME || [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser'
].find((p) => fs.existsSync(p));
if (!chrome) {
  console.error('Chrome not found. Set CHROME to the browser binary.');
  process.exit(1);
}

const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const js = [read('src/engine.js'), read('src/icons.js'), read('src/app.js')].join('\n');
const html = read('index.html');

const DUR = 460, FPS = 25, DT = 1000 / FPS, SCALE = 2;
const CELL = 112, ICON = 64, GAP = 12, PAD = 16;
const MAX_SHEET = 14000;

// A hover that starts at `on` and reverses at `off`, as [direction, raw progress] at time t.
const hover = (t, on, off) => (t < off ? [1, Math.min(1, Math.max(0, (t - on) / DUR))] : [0, Math.min(1, (t - off) / DUR)]);

// Icons open one after another along the diagonals, stay open, then close in the same order.
function wave(n, cols, gap, hold, rest) {
  const delay = Array.from({ length: n }, (_, i) => (i % cols + Math.floor(i / cols)) * gap);
  const spread = Math.max(...delay);
  const total = 2 * (spread + DUR + hold) + rest;
  const frames = [];
  for (let t = 0; t < total; t += DT) {
    frames.push(delay.map((d) => ['hover', ...hover(t, d, spread + DUR + hold + d)]));
  }
  return frames;
}

// Every palette in turn, each change animated like the gallery's palette control, then back
// to the first.
function cycle(n, palettes, hold) {
  const frames = [];
  for (let p = 0; p < palettes; p++) {
    const to = (p + 1) % palettes;
    for (let t = 0; t < DUR + hold; t += DT) {
      const s = Math.min(1, t / DUR);
      frames.push(Array.from({ length: n }, () => ['palette', p, to, s]));
    }
  }
  return frames;
}

const PALETTE_COUNT = 7;
const scenes = {
  hover: {
    names: ['文件夹', '邮件', '日历', '锁', '设置', '下载', '回收站', '星标', '书本', '礼物', '相机', '眼睛', '钱包', '喜欢', '打印', '闹钟'],
    cols: 8,
    frames: () => wave(16, 8, 70, 900, 500)
  },
  skill: {
    names: ['闹钟', '笔记本', '扫码', '退出', '计算器', '指南针'],
    cols: 6,
    frames: () => wave(6, 6, 110, 1100, 500)
  },
  palettes: {
    names: ['文件夹', '邮件', '日历', '锁', '设置', '闹钟', '回收站', '指南针'],
    cols: 8,
    frames: () => cycle(8, PALETTE_COUNT, 700)
  }
};

function render(name, scene, work) {
  const frames = scene.frames();
  const rows = Math.ceil(scene.names.length / scene.cols);
  const w = PAD * 2 + scene.cols * CELL + (scene.cols - 1) * GAP;
  const h = PAD * 2 + rows * CELL + (rows - 1) * GAP;
  const per = Math.max(1, Math.floor(MAX_SHEET / (h * SCALE)));
  const css = `main{display:none}body{background:#fff}
    .f{display:grid;grid-template-columns:repeat(${scene.cols},${CELL}px);gap:${GAP}px;padding:${PAD}px;height:${h}px;box-sizing:border-box;align-content:start}
    .c{width:${CELL}px;height:${CELL}px;border-radius:22px;background:#F2F3F5;display:grid;place-items:center}
    .c svg{width:${ICON}px;height:auto;overflow:visible;display:block}`;
  const files = [];
  for (let start = 0, chunk = 0; start < frames.length; start += per, chunk++) {
    const part = frames.slice(start, start + per);
    // Copies take the colours of the icon they copy in every palette, as in check.mjs.
    const script = `const spec = ${JSON.stringify({ names: scene.names, frames: part })};
      const box = document.createElement('div'); document.body.appendChild(box);
      let nextKey = 1000;
      const copy = (icon, host) => {
        const src = insts.findIndex((x) => x.icon === icon), k = nextKey++;
        PALETTES.forEach((p) => { p.colors[k] = p.colors[src]; if (p.edges) p.edges[k] = p.edges[src]; });
        return mountIcon(icon, k, host);
      };
      const icons = spec.names.map((n) => ICONS.find((x) => x.name === n));
      const first = PALETTES[0];
      spec.frames.forEach((frame) => {
        const f = document.createElement('div'); f.className = 'f'; box.appendChild(f);
        icons.forEach((icon, j) => {
          const c = document.createElement('span'); c.className = 'c'; f.appendChild(c);
          const inst = copy(icon, c), [kind, x, y, z] = frame[j];
          if (kind === 'hover') {
            inst.hover = 0; const a = targetOf(inst); inst.hover = 1; const b = targetOf(inst);
            inst.cur = interp(a, b, x ? EASE(y) : 1 - EASE(y));
          } else {
            const pa = PALETTES[x], pb = PALETTES[y];
            runtime.palette = pa; const a = targetOf(inst); runtime.palette = pb; const b = targetOf(inst);
            inst.cur = interp(a, b, EASE(z)); runtime.palette = z > 0 ? pb : pa;
          }
          render(inst); runtime.palette = first;
        });
      });`;
    const page = html.replace(/<script src="src\/engine\.js"><\/script>\s*<script src="src\/icons\.js"><\/script>\s*<script src="src\/app\.js"><\/script>/,
      `<script>\n${js}\n</script><script>{${script}}</script><style>${css}</style>`);
    const file = path.join(work, `${name}-${chunk}.html`);
    const sheet = path.join(work, `${name}-${chunk}.png`);
    fs.writeFileSync(file, page);
    execFileSync(chrome, ['--headless=new', '--disable-gpu', '--force-prefers-reduced-motion', `--user-data-dir=${path.join(work, 'profile')}`,
      '--hide-scrollbars', '--virtual-time-budget=5000', `--window-size=${w},${h * part.length}`,
      `--force-device-scale-factor=${SCALE}`, `--screenshot=${sheet}`, 'file://' + file], { stdio: 'ignore' });
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', sheet, '-vf', `untile=1x${part.length}`, path.join(work, `${name}-${chunk}-%04d.png`)]);
    for (let i = 1; i <= part.length; i++) files.push(path.join(work, `${name}-${chunk}-${String(i).padStart(4, '0')}.png`));
  }
  const out = path.join(root, 'assets', `${name}.webp`);
  execFileSync('img2webp', ['-loop', '0', '-lossy', '-q', '85', '-d', String(Math.round(DT)), ...files, '-o', out], { stdio: 'ignore' });
  console.log(`${path.relative(root, out)}: ${frames.length} frames, ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
}

const work = fs.mkdtempSync(path.join(os.tmpdir(), 'kubai-icons-media-'));
try {
  fs.mkdirSync(path.join(root, 'assets'), { recursive: true });
  for (const [name, scene] of Object.entries(scenes)) if (!pick || pick.includes(name)) render(name, scene, work);
} finally {
  fs.rmSync(work, { recursive: true, force: true });
}

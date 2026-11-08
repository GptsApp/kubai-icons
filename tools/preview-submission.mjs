#!/usr/bin/env node
// Prepares a submitted icon for a maintainer to calibrate by eye: a sheet showing it beside
// library icons at several sizes, and the comment that goes on the issue. The issue body is
// untrusted, so the SVG is only ever displayed as an image and the motion source is never run.
//
//   ISSUE_BODY="..." node tools/preview-submission.mjs <out-dir>
import fs from 'node:fs';
import path from 'node:path';
import { renderSVG } from '../packages/core/src/render.js';
import folder from '../icons/folder.js';
import mail from '../icons/mail.js';
import { screenshot } from './chrome.mjs';

const MARKER = '<!-- kubai-submission-preview -->';
const SIZES = [96, 48, 28, 24];
const MAX_SVG = 200_000;
const UNSAFE = /<script|<foreignObject|<iframe|<embed|<object|<use[^>]+href\s*=\s*["'](?!#)|\son\w+\s*=|javascript:|(?:xlink:)?href\s*=\s*["'](?!#)|src\s*=|url\(\s*["']?(?!#)|@import/i;

const out = path.resolve(process.argv[2] || 'check-out/submission');
fs.mkdirSync(out, { recursive: true });
const body = (process.env.ISSUE_BODY || '').replace(/\r\n/g, '\n');

/** The text under a "### Heading" of the issue form. */
const section = (heading) => {
  const at = body.indexOf(`### ${heading}\n`);
  if (at < 0) return '';
  const rest = body.slice(at + heading.length + 5);
  const end = rest.search(/^### /m);
  return (end < 0 ? rest : rest.slice(0, end)).trim();
};
const finish = (text) => {
  fs.writeFileSync(path.join(out, 'comment.md'), `${MARKER}\n${text}\n`);
  process.exit(0);
};

const raw = section('Name');
const name = /^[a-z0-9-]{1,60}$/.test(raw) ? raw : 'submission';
const files = section('Files');
const svg = files.match(/<svg[\s\S]*?<\/svg>/i)?.[0];
if (!svg) finish('No SVG was found in the Files field, so there is no preview. Paste the SVG there and edit the issue to try again.');
if (svg.length > MAX_SVG) finish('The SVG is too large to preview.');
if (UNSAFE.test(svg)) finish('The SVG contains scripts or outside references, so it was not rendered. A maintainer will check it by hand.');

const image = (size) => `<img width="${size}" height="${size}" alt="" src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}">`;
const library = (icon, size, key) => renderSVG(icon, { size, k: `${icon.name}-${key}` });
const row = (cells) => cells.map((c) => `<div class="c">${c}</div>`).join('');
const panel = (theme) => `<section class="${theme}">
  <div class="r">${row(SIZES.map(image))}</div>
  <div class="r">${row(SIZES.map((s, i) => library(folder, s, `${theme}f${i}`)))}</div>
  <div class="r">${row(SIZES.map((s, i) => library(mail, s, `${theme}m${i}`)))}</div>
</section>`;
screenshot(`<!doctype html><meta charset="utf-8"><style>
  body{margin:0;display:flex}
  section{padding:20px;display:grid;gap:12px}
  .light{background:#fff}.dark{background:#17181c}
  .r{display:flex;align-items:center;gap:20px}
  .c{width:112px;display:grid;place-items:center}
</style>${panel('light')}${panel('dark')}`, path.join(out, 'preview.png'), { width: 1096, height: 400, scale: 2 });

const source = /defineIcon|export default/.test(files.replace(/<svg[\s\S]*?<\/svg>/gi, ''));
finish(`**Preview of \`${name}\`**: the top row is the submission at 96, 48, 28 and 24px, above \`folder\` and \`mail\` at the same sizes.

![Preview of the submitted icon](__PREVIEW__)

${source ? 'Includes motion source. Read the code before running it.' : 'Static SVG only. If it is accepted, the motion is added during review.'}

**For the maintainer to check by eye. Nothing here is accepted automatically.**

- [ ] Reads as the object at 24px, without its name
- [ ] Matches the weight, layers and colour of the library
- [ ] Not a near duplicate of an existing icon
- [ ] No logos or trademarks, and not traced from another icon set
- [ ] Motion acts out what the object does, or can be added`);

#!/usr/bin/env node
// The static export shares one root layout, so every page is written with lang="en". This
// sets the Chinese pages' language in their HTML, for browsers and search engines.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../site/out/zh');
let count = 0;
for (const entry of fs.readdirSync(root, { recursive: true })) {
  if (!String(entry).endsWith('.html')) continue;
  const file = path.join(root, String(entry));
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('<html lang="en"', '<html lang="zh-CN"'));
  count++;
}
console.log(`html-lang: ${count} Chinese pages`);

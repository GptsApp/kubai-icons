#!/usr/bin/env node
// The static export shares one root layout, so every page is written with lang="en". This
// sets each language's pages to their own language and direction, for browsers and search
// engines.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../site');
const languages = JSON.parse(fs.readFileSync(path.join(site, 'src/lib/languages.json'), 'utf8'));
let count = 0;
for (const { code, tag, dir } of languages) {
  if (code === 'en') continue;
  const root = path.join(site, 'out', code);
  for (const entry of fs.readdirSync(root, { recursive: true })) {
    if (!String(entry).endsWith('.html')) continue;
    const file = path.join(root, String(entry));
    fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('<html lang="en"', `<html lang="${tag}"${dir ? ` dir="${dir}"` : ''}`));
    count++;
  }
}
console.log(`html-lang: ${count} translated pages`);

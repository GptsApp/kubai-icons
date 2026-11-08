#!/usr/bin/env node
// Tells IndexNow search engines, such as Bing, which pages a deploy added.
//
//   node tools/indexnow.mjs <previous sitemap> <new sitemap> [--dry]
//
// Without a previous sitemap, nothing is sent: the sitemap itself covers a first visit.
import fs from 'node:fs';

const HOST = 'icons.kubai.design';
const KEY = 'aaefd9d11815cd226a31cf179f900171';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
// The protocol's limit for one request.
const MOST_URLS = 10000;

const [previous, next] = process.argv.slice(2);
const dry = process.argv.includes('--dry');
const urls = (file) => (fs.existsSync(file) ? [...fs.readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]) : []);

const known = new Set(urls(previous));
const added = urls(next).filter((url) => !known.has(url));
if (!known.size || !added.length) {
  console.log(known.size ? 'No new pages.' : 'No previous sitemap to compare with.');
  process.exit(0);
}
const urlList = added.slice(0, MOST_URLS);
if (dry) {
  console.log(`Would send ${urlList.length} new pages, such as ${urlList[0]}`);
  process.exit(0);
}
const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow answered ${res.status} for ${urlList.length} new pages.`);
if (!res.ok) process.exit(1);

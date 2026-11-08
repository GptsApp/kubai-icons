// GET /api/icon/<name>.svg?color=EC4899&variant=soft&badge=semantic&size=512
// A standalone SVG of any icon in any accent colour, for tools that cannot run the packages.
import { fillTemplate } from '../../../packages/core/src/template.js';

const NAME = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.svg$/;
const HEX = /^#?([0-9a-f]{6})$/i;
const DEFAULT_COLOR = '5393FF';
const HEADERS = { 'Access-Control-Allow-Origin': '*', 'X-Content-Type-Options': 'nosniff' };

const shards = new Map();
async function shardFor(name, { request, env }) {
  const prefix = name.slice(0, 2);
  if (!shards.has(prefix)) {
    const res = await env.ASSETS.fetch(new URL(`/data/templates/${prefix}.json`, request.url));
    if (!res.ok) return null;
    shards.set(prefix, await res.json());
  }
  return shards.get(prefix);
}

const fail = (status, message) => new Response(`${message}\n`, { status, headers: { ...HEADERS, 'Content-Type': 'text/plain; charset=utf-8' } });

export async function onRequestGet(context) {
  const name = NAME.exec(context.params.name)?.[1];
  if (!name) return fail(404, 'Use /api/icon/<name>.svg');
  const query = new URL(context.request.url).searchParams;
  const color = HEX.exec(query.get('color') ?? DEFAULT_COLOR)?.[1];
  if (!color) return fail(400, 'color must be a six-digit hex value, such as EC4899');
  const variant = query.get('variant') ?? 'color';
  if (variant !== 'color' && variant !== 'soft') return fail(400, 'variant must be color or soft');
  const rawBadge = query.get('badge');
  const badgeHex = rawBadge && rawBadge !== 'semantic' ? HEX.exec(rawBadge)?.[1] : null;
  if (rawBadge && rawBadge !== 'semantic' && !badgeHex) return fail(400, 'badge must be semantic or a six-digit hex value');
  const size = Number(query.get('size') ?? 96);
  if (!Number.isInteger(size) || size < 16 || size > 2048) return fail(400, 'size must be a whole number from 16 to 2048');

  const entry = (await shardFor(name, context))?.[name];
  if (!Array.isArray(entry)) return fail(404, `Unknown icon: ${name}`);
  const svg = fillTemplate({ name, markup: entry[0], tone: entry[1] }, { accent: `#${color}`, variant, badge: badgeHex ? `#${badgeHex}` : rawBadge ?? undefined, size });
  return new Response(svg, { headers: { ...HEADERS, 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } });
}

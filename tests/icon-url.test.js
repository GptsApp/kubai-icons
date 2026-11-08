import { describe, expect, it } from 'vitest';
import { loadIcons } from '../tools/registry.mjs';
import { renderInner, renderSVG } from '../packages/core/src/render.js';
import { fillTemplate } from '../packages/core/src/template.js';
import { onRequestGet } from '../functions/api/icon/[name].js';

const { icons } = await loadIcons();
const templateOf = (ic) => ({ name: ic.name, tone: ic.tone, markup: renderInner(ic, { k: '__K__', paint: 'template', names: false }) });

describe('colored icon files', () => {
  it.each([
    ['the default look', {}],
    ['a custom accent', { accent: '#EC4899' }],
    ['the soft variant', { accent: '#14B8A6', variant: 'soft' }],
    ['a light accent', { accent: '#F5E663', variant: 'soft', size: 512 }],
  ])('match the static renderer for every icon: %s', (_, options) => {
    for (const ic of icons) expect(fillTemplate(templateOf(ic), options)).toBe(renderSVG(ic, options));
  });

  it('match the static renderer for badge colors', () => {
    const badged = icons.filter((ic) => ic.tone);
    expect(badged.length).toBeGreaterThan(0);
    for (const ic of badged.slice(0, 200)) {
      expect(fillTemplate(templateOf(ic), { badge: 'semantic' })).toBe(renderSVG(ic, { badge: ic.tone }));
      expect(fillTemplate(templateOf(ic), { badge: '#112233' })).toBe(renderSVG(ic, { badge: '#112233' }));
    }
  });
});

describe('/api/icon/<name>.svg', () => {
  const folder = icons.find((ic) => ic.name === 'folder');
  const context = (path) => ({
    params: { name: path.split('?')[0] },
    request: new Request(`https://example.test/api/icon/${path}`),
    env: { ASSETS: { fetch: async () => Response.json({ folder: [templateOf(folder).markup] }) } },
  });

  it('returns the icon in the requested color', async () => {
    const res = await onRequestGet(context('folder.svg?color=EC4899&size=512'));
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('image/svg+xml');
    expect(await res.text()).toBe(renderSVG(folder, { accent: '#EC4899', size: 512 }));
  });

  it.each([
    ['folder.svg?color=red', 400],
    ['folder.svg?color=%22%3E%3Cscript%3E', 400],
    ['folder.svg?variant=loud', 400],
    ['folder.svg?badge=x', 400],
    ['folder.svg?size=99999', 400],
    ['folder.png', 404],
    ['nope.svg', 404],
    ['constructor.svg', 404],
  ])('rejects %s', async (path, status) => {
    expect((await onRequestGet(context(path))).status).toBe(status);
  });
});

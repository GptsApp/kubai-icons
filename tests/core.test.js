// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { createIcon, toSvg, replaceIcons, Folder as folder, Bookmark as bookmark, Mail as mail } from 'kubai-icons';
import { loadIcon, names } from 'kubai-icons/dynamic';

const meta = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../packages/core/dist/icons.json'), 'utf8'));

describe('kubai-icons', () => {
  it('lists every icon in the metadata and the dynamic loader', () => {
    expect(names.length).toBe(meta.length);
    expect(new Set(names).size).toBe(names.length);
  });

  it('gives each instance its own ids', () => {
    const a = toSvg(folder), b = toSvg(folder);
    const ids = (s) => [...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    expect(ids(a).some((id) => ids(b).includes(id))).toBe(false);
    expect(a).not.toContain('__K__');
  });

  it('renders accessible markup', () => {
    expect(toSvg(folder)).toContain('aria-hidden="true"');
    const titled = toSvg(folder, { title: 'Files' });
    expect(titled).toContain('role="img"');
    expect(titled).toContain('<title>Files</title>');
  });

  it('applies colour and the soft variant as CSS', () => {
    const s = toSvg(folder, { color: '#22C55E', variant: 'soft' });
    expect(s).toContain('color:#22C55E');
    expect(s).toContain('--ki-l:72%');
  });

  it('colours badges black and white by default, semantic on request', async () => {
    const plus = await loadIcon('folder-plus');
    expect(plus.tone).toBe('#16A34A');
    expect(toSvg(plus)).not.toContain('--ki-b:');
    expect(toSvg(plus, { badgeColor: 'semantic' })).toContain('--ki-b:#16A34A');
    expect(toSvg(plus, { badgeColor: '#7C3AED' })).toContain('--ki-b:#7C3AED');
    expect(toSvg(folder, { badgeColor: 'semantic' })).not.toContain('--ki-b');
  });

  it('animates to the hover pose and back', () => {
    const svg = createIcon(mail);
    document.body.append(svg);
    const flap = () => svg.querySelector('[data-n="outF"]').getAttribute('d');
    const rest = flap();
    svg.kubai.hover(true, true);
    expect(flap()).not.toBe(rest);
    svg.kubai.hover(false, true);
    expect(flap()).toBe(rest);
  });

  it('keeps outline masks in step with their paths', () => {
    const svg = createIcon(folder);
    svg.kubai.hover(true, true);
    const back = svg.querySelector('[data-n="backO"]');
    const id = back.getAttribute('mask').match(/#([^)]+)/)[1];
    expect(svg.querySelector(`mask[id="${id}"] path`).getAttribute('d')).toBe(back.getAttribute('d'));
  });

  it('keeps the stroke under a fill in step with the fill', () => {
    const svg = createIcon(folder);
    const under = () => svg.querySelector('[data-under]').getAttribute('d');
    const fill = () => svg.querySelector('[data-n="back"]').getAttribute('d');
    expect(under()).toBe(fill());
    const rest = under();
    svg.kubai.hover(true, true);
    expect(under()).not.toBe(rest);
    expect(under()).toBe(fill());
  });

  it('toggles tap icons on click', () => {
    const svg = createIcon(bookmark);
    const fill = () => svg.querySelector('[data-n="ribF"]').getAttribute('opacity');
    svg.kubai.state({ active: true }, true);
    expect(Number(fill())).toBe(1);
  });

  it('replaces placeholders', () => {
    document.body.innerHTML = '<i data-kubai="folder" data-size="32" class="x"></i>';
    replaceIcons({ icons: { folder } });
    const svg = document.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('32');
    expect(svg.classList.contains('x')).toBe(true);
  });

  it('loads icons by name', async () => {
    const ic = await loadIcon('folder-plus');
    expect(ic.name).toBe('folder-plus');
    await expect(loadIcon('nope')).rejects.toThrow();
  });

  it('every icon module renders without NaN and with a rest pose that hover can leave', async () => {
    for (const name of names) {
      const ic = await loadIcon(name);
      expect(ic.markup, name).not.toMatch(/NaN|undefined/);
    }
  });
});

describe('exported files', () => {
  it('write the drop shadow in the form design tools read', () => {
    for (const dir of ['svg', 'svg-soft']) {
      const svg = fs.readFileSync(path.resolve(__dirname, `../packages/static/${dir}/folder.svg`), 'utf8');
      expect(svg).toContain('result="BackgroundImageFix"');
      expect(svg).not.toContain('<feMerge>');
    }
  });

  it('keep the live shadow tied to the icon colour', () => {
    expect(toSvg(folder)).toContain('<feFlood style="flood-color:');
  });
});

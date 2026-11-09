import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import plain from 'kubai-icons/icons/folder-plus';
import * as runtime from '../packages/core/dist/cdn/element.js';
import merged from '../packages/core/dist/cdn/icons/folder-plus.js';

const cdn = path.resolve(__dirname, '../packages/core/dist/cdn');
const meta = JSON.parse(fs.readFileSync(path.resolve(cdn, '../icons.json'), 'utf8'));
const files = fs.readdirSync(path.join(cdn, 'icons'));
const source = (file) => fs.readFileSync(path.join(cdn, 'icons', file), 'utf8');

describe('CDN build', () => {
  it('has one file for every icon', () => {
    expect(files.sort()).toEqual(meta.map((ic) => `${ic.name}.js`).sort());
  });

  it('downloads no further files before the element runs', () => {
    expect(fs.readFileSync(path.join(cdn, 'element.js'), 'utf8')).not.toMatch(/\bfrom\s*"|\bimport\s*"/);
  });

  it('merges each icon so it needs only the element', () => {
    for (const file of files) expect(source(file), file).not.toMatch(/\bfrom"(?!\.\.\/element\.js")/);
  });

  it('exports everything the icons import from the element', () => {
    const names = new Set(files.flatMap((file) => [...source(file).matchAll(/import\{([^}]*)\}from"\.\.\/element\.js"/g)]
      .flatMap((m) => m[1].split(',').map((part) => part.trim().split(' as ')[0]))));
    expect(names.size).toBeGreaterThan(0);
    for (const name of names) expect(runtime, name).toHaveProperty(name);
  });

  it('builds the same icon as the npm files', () => {
    expect(merged.name).toBe(plain.name);
    expect(merged.markup).toBe(plain.markup);
    expect(merged.tap).toBe(plain.tap);
    expect(merged.tone).toBe(plain.tone);
    expect(Object.keys(merged.target)).toEqual(Object.keys(plain.target));
    expect(typeof merged.draw).toBe('function');
  });
});

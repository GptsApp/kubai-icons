// Loads the icon sources: every base icon in icons/, every badge in badges/, and the
// composite icons the bases ask for (badges in `variants`, a slash when `off` is set).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { withBadge, withSlash } from '../packages/core/src/compose.js';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const load = async (file) => (await import(pathToFileURL(file).href)).default;
const list = (dir) => fs.readdirSync(path.join(root, dir)).filter((n) => n.endsWith('.js') && !n.startsWith('_')).sort();

export const categories = JSON.parse(fs.readFileSync(path.join(root, 'icons', 'categories.json'), 'utf8'));

/** Every icon, bases first in name order, each composite after its base. */
export async function loadIcons({ composites = true, strict = true } = {}) {
  const bases = [], failures = [];
  for (const n of list('icons')) {
    try {
      const def = await load(path.join(root, 'icons', n));
      if (!def || def.name !== n.slice(0, -3)) throw new Error(`name must match the file name (found "${def?.name}")`);
      bases.push({ ...def, file: `icons/${n}` });
    } catch (e) {
      if (strict) throw new Error(`icons/${n}: ${e.message}`);
      failures.push({ name: n.slice(0, -3), error: e.message });
    }
  }
  const badges = new Map();
  for (const n of list('badges')) {
    const b = await load(path.join(root, 'badges', n));
    badges.set(b.name, { ...b, file: `badges/${n}` });
  }
  const slash = await load(path.join(root, 'badges', '_slash.js'));
  if (!composites) return { icons: bases, bases, badges, failures };
  const icons = [];
  for (const base of bases) {
    icons.push(base);
    for (const v of base.variants || []) {
      const badge = badges.get(v);
      if (!badge) { if (strict) throw new Error(`${base.file}: unknown badge "${v}"`); failures.push({ name: base.name, error: `unknown badge "${v}"` }); continue; }
      icons.push(withBadge(base, badge, {
        zh: `${base.zh}·${badge.zh}`,
        category: base.category,
        tags: [...new Set([...(base.tags || []), ...badge.tags])],
        file: base.file
      }));
    }
    if (base.off) {
      icons.push(withSlash(base, slash, {
        zh: `${base.zh}·${slash.zh}`,
        category: base.category,
        tags: [...new Set([...(base.tags || []), ...slash.tags])],
        file: base.file
      }));
    }
  }
  return { icons, bases, badges, failures };
}

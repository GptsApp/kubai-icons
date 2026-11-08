import { defineIcon, KR, CR, f, OL, rr, at } from '../packages/core/src/kit.js';

const SHORTCUT_TILES = [[7.2, 4.2], [16.5, 4.2], [7.2, 13.5], [16.5, 13.5]];

export default defineIcon({
  name: 'shortcut',
  zh: '快捷方式',
  category: 'interface',
  tags: ['apps', 'grid', 'launcher', 'tiles', 'dashboard'],
  variants: ['plus', 'cog'],
  // A grid of sites; on hover one tile lifts out, ready to open.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${rr(5.2, 2.2, 20.6, 20.6, KR)}" fill="${u.loS}"/></g></g>
    <path d="${rr(5.2, 2.2, 20.6, 20.6, KR)}" ${OL}/>
    ${SHORTCUT_TILES.filter((t, i) => i !== 1).map(([x, y]) => `<path d="${rr(x, y, 7.3, 7.3, CR)}" fill="#fff"/>`).join('')}
    <g data-n="lift"><g filter="${u.sh}"><path d="${rr(0, 0, 7.3, 7.3, CR)}" fill="#fff"/></g><circle cx="3.65" cy="3.65" r="1.7" data-t="fill:#5393FF"/></g>`,
  target: (h) => ({ lift: h ? [16.9, 2.6, 1.14] : [16.5, 4.2, 1] }),
  draw(p, E) {
    const [x, y, s] = p.lift;
    at(E.lift, { transform: `translate(${f(x)} ${f(y)}) translate(3.65 3.65) scale(${f(s)}) translate(-3.65 -3.65)` });
  }
});

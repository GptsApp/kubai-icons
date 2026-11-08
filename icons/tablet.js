import { defineIcon, CR, f, OL, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'tablet',
  zh: '平板',
  category: 'devices',
  tags: ['ipad', 'pad', 'device', 'screen', '平板电脑'],
  variants: ['plus', 'check', 'x', 'lock', 'search', 'sync', 'cog', 'sparkle'],
  // A tablet that turns from portrait to landscape on hover.
  svg: (u) => {
    const body = rr(6.3, 1, 18.4, 23, 2.8);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="r1"><path d="${body}" fill="${u.loS}"/></g></g></g>
      <g data-n="r2"><path d="${body}" ${OL}/><path d="${rr(8.3, 3, 14.4, 19, CR)}" fill="#fff"/></g>`;
  },
  target: (h) => ({ a: h ? -90 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(p.a)} 15.5 12.5)`;
    at(E.r1, { transform: t }); at(E.r2, { transform: t });
  }
});

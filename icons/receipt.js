import { defineIcon, f, OL, rp, rr, lines, at } from '../packages/core/src/kit.js';
import { back } from './_commerce-charts.js';

// The slip: straight sides, five torn teeth along the bottom.
const slip = (() => {
  const l = 8.4, r = 22.6, w = (r - l) / 5, pts = [[l, -1], [r, -1], [r, 19.6]];
  for (let i = 0; i < 5; i++) pts.push([r - w * (i + 0.5), 21.2], [r - w * (i + 1), 19.6]);
  pts.pop(); pts.push([l, 19.6]);
  return rp(pts, [0, 0, 0.3, ...pts.slice(3, -1).map(() => 0.4), 0.3]);
})();

export default defineIcon({
  name: 'receipt',
  zh: '小票',
  category: 'commerce',
  tags: ['bill', 'purchase', 'order', 'transaction', 'expense', '收据', '账单'],
  variants: ['plus', 'check', 'x', 'search', 'down', 'right', 'clock', 'alert', 'sparkle'],
  // A receipt coming out of a printer slot; on hover it prints longer.
  svg: (u) => `<clipPath id="${u.id('out')}"><rect x="0" y="4" width="31" height="24"/></clipPath>
    <g clip-path="url(#${u.id('out')})"><g data-n="slip"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${slip}" fill="${u.loS}"/></g></g><path d="${slip}" ${OL}/>
      <path d="${lines(10.8, 9.6, [9.4, 6])}" class="ln" stroke="#fff" data-w="stroke"/></g></g>
    ${back(u, rr(5.2, 1.4, 20.6, 4.6, 2.3), u.upS)}`,
  target: (h) => ({ y: h ? 2.6 : 0 }),
  draw(p, E) { at(E.slip, { transform: `translate(0 ${f(p.y)})` }); }
});

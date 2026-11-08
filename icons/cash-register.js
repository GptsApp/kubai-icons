import { defineIcon, f, OL, rp, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

export default defineIcon({
  name: 'cash-register',
  zh: '收银台',
  category: 'commerce',
  tags: ['pos', 'checkout', 'till', 'cashier', 'sale', '收银机'],
  variants: ['plus', 'check', 'x', 'clock', 'cog'],
  // A cash register with a display and keys; on hover its cash drawer slides out.
  svg: (u) => `<path d="${rr(10.6, 1.8, 9.8, 5.6, 1.4)}" fill="#fff"/><path d="${rr(10.6, 1.8, 9.8, 5.6, 1.4)}" ${OL}/>
    <path d="M12.8 4.6H16.6" class="ln" data-t="stroke:#2F6FE0" stroke-linecap="round"/>
    ${back(u, rp([[6.4, 8.2], [24.6, 8.2], [26, 20], [5, 20]], 2.2), u.loS)}
    <path d="${rr(8.8, 10.6, 3.6, 2.6, 0.8) + rr(13.7, 10.6, 3.6, 2.6, 0.8) + rr(18.6, 10.6, 3.6, 2.6, 0.8)}" fill="#fff"/>
    <path d="${rr(6.6, 16.2, 17.8, 4.2, 0.6)}" fill="${u.pure('#2F6FE0')}"/>
    <g data-n="dr">${front(u, rr(4, 16.2, 23, 5.8, 1.8), u.upS)}
      <path d="M13.2 19.1H17.8" class="ln" data-t="stroke:#2F6FE0" stroke-linecap="round"/></g>`,
  target: (h) => ({ y: h ? 2.2 : 0 }),
  draw(p, E) { at(E.dr, { transform: `translate(0 ${f(p.y)})` }); }
});

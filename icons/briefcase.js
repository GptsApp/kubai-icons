import { defineIcon, KR, f, R, rp, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

export default defineIcon({
  name: 'briefcase',
  zh: '公文包',
  category: 'commerce',
  tags: ['work', 'business', 'job', 'portfolio', 'office', '工作'],
  variants: ['plus', 'check', 'x', 'search', 'star', 'clock', 'cog', 'lock'],
  // A briefcase with a latch on its lid; on hover the latch flips right over onto
  // the lid.
  svg: (u) => `<path d="${rr(10.8, 2.4, 9.4, 6.4, 2.2) + rr(12.8, 4.4, 5.4, 4.4, 0.8)}" fill-rule="evenodd" fill="${u.loS}"/>
    <path d="${rr(10.8, 2.4, 9.4, 6.4, 2.2) + rr(12.8, 4.4, 5.4, 4.4, 0.8)}" fill-rule="evenodd" class="ol" data-t="stroke:#5393FF"/>
    ${back(u, rr(4, 7, 23, 15.8, KR), u.lo(15.8))}
    ${front(u, rp(R(4, 7, 23, 6.4), [KR, KR, 0, 0]), u.upS)}
    <path data-n="la" d="${rp(R(13.3, 11.4, 4.4, 3.8), [0.4, 0.4, 1, 1])}" data-t="fill:#2F6FE0"/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.la, { transform: `translate(0 11.4) scale(1 ${f(Math.cos(Math.PI * p.o))}) translate(0 -11.4)` }); }
});

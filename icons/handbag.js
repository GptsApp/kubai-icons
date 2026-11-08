import { defineIcon, KR, f, rp, at } from '../packages/core/src/kit.js';
import { back, front, atAll } from './_commerce-charts.js';

export default defineIcon({
  name: 'handbag',
  zh: '手提包',
  category: 'commerce',
  tags: ['purse', 'bag', 'fashion', 'accessories', '女包'],
  variants: ['plus', 'check', 'heart', 'star'],
  // A handbag with a clasped flap; on hover the flap lifts open.
  svg: (u) => `<path d="M10.8 9.6C10.8 2.4 20.2 2.4 20.2 9.6" fill="none" stroke-width="2.2" stroke-linecap="round" data-t="stroke:#2F6FE0"/>
    ${back(u, rp([[7.4, 9], [23.6, 9], [26.2, 22.8], [4.8, 22.8]], KR), u.loS)}
    <g data-n="fl">${front(u, rp([[7.4, 9], [23.6, 9], [24.54, 14], [15.5, 16.8], [6.46, 14]], [KR, KR, 0.6, 1.4, 0.6]), u.upS)}</g>
    <circle data-n="cl" cx="15.5" cy="16.2" r="1.5" data-t="fill:#2F6FE0"/>`,
  target: (h) => ({ s: h ? 0.62 : 1 }),
  draw(p, E) {
    at(E.fl, { transform: `translate(0 9) scale(1 ${f(p.s)}) translate(0 -9)` });
    at(E.cl, { transform: `translate(0 ${f((p.s - 1) * 7.2)})` });
  }
});

import { defineIcon, KR, CR, f, DEEPS, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

const KEYS = [11, 14.4, 17.8].flatMap((x) => [16.4, 19.6].map((y) => rr(x, y, 2.6, 2.2, 0.7))).join('');

export default defineIcon({
  name: 'pos-terminal',
  zh: '刷卡机',
  category: 'devices',
  tags: ['pos', 'card terminal', 'payment terminal', 'card reader', 'checkout', 'pay', '收款机', 'POS 机'],
  variants: ['check', 'x', 'clock', 'sync'],
  // A card payment terminal; on hover it prints its receipt out of the top.
  svg: (u) => {
    const slip = rr(0, 0, 9.4, 11, CR);
    return `<g data-n="rc">${front(u, slip)}<path d="M2.2 2.8H7.2" class="ln" ${DEEPS} stroke-opacity=".55"/></g>
      ${back(u, rr(8.2, 4.8, 14.6, 19.2, KR))}
      <path d="${rr(10.4, 7, 10.2, 6.2, CR) + KEYS}" fill="#fff"/>`;
  },
  target: (h) => ({ y: h ? -0.6 : 1.4 }),
  draw(p, E) { at(E.rc, { transform: `translate(10.8 ${f(p.y)})` }); }
});

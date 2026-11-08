import { defineIcon, f, WHITES, lines, at } from '../packages/core/src/kit.js';
import { typedPage } from './_files-text.js';

const SIGN = 'M10.2 17.4C11.2 14 12.8 13.4 12.8 15.6C12.8 17.6 12.2 18.2 13.4 17.2C14.6 16.2 15.2 14.6 16 15.4C16.6 16 16.2 17.4 17.4 16.6C18.2 16.1 18.8 15.6 20.6 15.8';
// The signature as written on hover: the same hand, set larger about its baseline.
const BIG = SIGN.replace(/(-?[\d.]+) (-?[\d.]+)/g, (_, x, y) => `${f(15.4 + (x - 15.4) * 1.18)} ${f(17 + (y - 17) * 1.25)}`);

export default defineIcon({
  name: 'contract',
  zh: '合同',
  category: 'files',
  tags: ['contract', 'agreement', 'sign', 'signature', 'legal', 'deal', '协议'],
  variants: ['plus', 'check', 'x', 'alert', 'info', 'clock', 'lock', 'search', 'sync', 'sparkle'],
  badgeAt: [22.6, 6.6],
  // A page with terms and a signature line; on hover it gets signed with a large hand.
  svg: (u) => typedPage(u, `<path d="${lines(9.6, 5.4, [7])}${lines(9.6, 10.2, [11.8])}" class="ln" ${WHITES}/>
    <path d="M9.6 20.4H21.4" class="ln" ${WHITES}/>
    <path data-n="sig" d="${SIGN}" pathLength="10" stroke-dasharray="10" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${WHITES}/>`),
  target: (h) => ({ s: h ? 1 : 0 }),
  draw(p, E) {
    const s = Math.max(0, Math.min(1, p.s));
    at(E.sig, { d: s > 0 ? BIG : SIGN, 'stroke-dashoffset': f(10 * (1 - s)), opacity: s > 0.02 ? 1 : 0 });
  }
});

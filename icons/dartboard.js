import { defineIcon, f, OL, DEEP, DEEPS, circ, rp, sector, rattle, bump, clamp01, at } from '../packages/core/src/kit.js';

const DIR = [Math.SQRT1_2, -Math.SQRT1_2], N = [Math.SQRT1_2, Math.SQRT1_2], TIP = [18.2, 9.8], LEN = 9.8;
const pt = (a, b) => [TIP[0] + DIR[0] * a + N[0] * b, TIP[1] + DIR[1] * a + N[1] * b];
const FLIGHT = rp([pt(LEN - 2.4, 0), pt(LEN + 0.6, 2.5), pt(LEN + 3, 2.5), pt(LEN + 2, 0), pt(LEN + 3, -2.5), pt(LEN + 0.6, -2.5)], 0.4);
const WEDGES = Array.from({ length: 8 }, (_, i) => sector(i * 45 - 11.25, 22.5, 9)).join('');

export default defineIcon({
  name: 'dartboard',
  zh: '飞镖靶',
  category: 'sports',
  tags: ['darts', 'bullseye', 'pub game', 'throw', 'score', 'aim', '飞镖', '靶子'],
  variants: ['check', 'star'],
  // A dartboard with radial segments and a dart in it; on hover the dart pulls back and is thrown in again, quivering.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 11.5)}" fill="${u.loS}"/></g></g>
    <path d="${circ(15.5, 12.5, 11.5)}" ${OL}/>
    <path d="${WEDGES}" fill="#fff"/>
    <circle cx="15.5" cy="12.5" r="3.1" ${DEEP}/>
    <g data-n="d"><path d="M${f(TIP[0])} ${f(TIP[1])}L${f(pt(LEN, 0)[0])} ${f(pt(LEN, 0)[1])}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/><path d="${FLIGHT}" ${DEEP}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), s = 3.4 * bump(o);
    at(E.d, { transform: `translate(${f(DIR[0] * s)} ${f(DIR[1] * s)}) rotate(${f(rattle(o, 8, 3))} ${TIP[0]} ${TIP[1]})` });
  }
});

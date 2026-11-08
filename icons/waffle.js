import { defineIcon, f, OL, circ, rr, at, clamp01 } from '../packages/core/src/kit.js';
import { solid } from './_b2-kitchen.js';

const C = 15.5, M = 12.5, P = 6.2, S = 4.6;
const WELLS = [-1, 0, 1].flatMap((r) => [-1, 0, 1].map((c) => rr(C + c * P - S / 2, M + r * P - S / 2, S, S, 0.9))).join('');

export default defineIcon({
  name: 'waffle',
  zh: '华夫饼',
  category: 'food',
  tags: ['breakfast', 'brunch', 'belgian', 'butter', 'dessert', '格子饼', '早餐'],
  variants: [],
  // A round waffle with deep square pockets; on hover a pat of butter lands in the middle and softens.
  svg: (u) => {
    const id = u.id('w');
    return `${solid(u, circ(C, M, 11.4))}
      <clipPath id="${id}"><path d="${circ(C, M, 9.4)}"/></clipPath>
      <g clip-path="url(#${id})"><path d="${WELLS}" data-t="fill:#5393FF"/></g>
      <g data-n="pat"><path data-n="b" fill="#fff"/><path data-n="bO" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), q = 3 + o, y = -6 * (1 - o);
    const d = rr(C - q, M - q + y, q * 2, q * 2, 1.2 + 1.6 * o);
    at(E.b, { d }); at(E.bO, { d });
    at(E.pat, { opacity: f(clamp01(o * 6)) });
  }
});

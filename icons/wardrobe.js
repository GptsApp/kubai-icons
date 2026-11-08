import { defineIcon, KR, f, DEEP, DEEPS, ACC, R, rp, rr, at } from '../packages/core/src/kit.js';
import { back, flat, liveFront, setPath } from './_b1-home.js';

const LT = 7.3, RT = 23.7, SEAM = 16, TOP = 4.4, BOT = 21.8, GRIP = 5.9;
// A shirt scaled from its full outline to hang inside the cupboard.
const SHIRT = rp([[12.2, 2.6], [15.5, 4.8], [18.8, 2.6], [22.4, 3.4], [27, 8.4], [24.4, 12.2], [22.4, 10.8], [22.4, 21], [8.6, 21], [8.6, 10.8], [6.6, 12.2], [4, 8.4], [8.6, 3.4]]
  .map(([x, y]) => [f(15.5 + (x - 15.5) * 0.56), f(8 + (y - 2.6) * 0.68)]), [0.5, 1.2, 0.5, 1, 0.6, 0.6, 0.4, 1.2, 1.2, 0.4, 0.6, 0.6, 1]);

// A door hinged at x; w runs from its closed width through zero to the outside of the body.
const door = (x, w, q) => {
  const cr = KR * Math.max(0, Math.min(1, (q - 0.4) / 0.6));
  return rp(R(0, TOP, 1, BOT - TOP).map(([, y], i) => [i === 0 || i === 3 ? x : f(x + w), y]), [0, 1.2, 1.2, cr]);
};

export default defineIcon({
  name: 'wardrobe',
  zh: '衣柜',
  category: 'home',
  tags: ['closet', 'armoire', 'clothes', 'cupboard', 'furniture', 'bedroom', '衣橱', '柜子', '家具'],
  // A tall two-door wardrobe on short legs; the doors swing out on hover to show a shirt on the rail.
  svg: (u) => `<path d="${rr(9, 20, 3.4, 5.2, 0.9) + rr(18.6, 20, 3.4, 5.2, 0.9)}" ${DEEP}/>
      ${back(u, rr(LT, 2.6, RT - LT, BOT - 2.6, KR))}
      <path d="${rp(R(LT + 0.15, TOP, RT - LT - 0.3, BOT - TOP - 0.15), [0, 0, KR, KR])}" fill="#fff"/>
      <path d="M${LT + 0.6} 8H${RT - 0.6}" ${ACC}/>
      ${flat(u, SHIRT)}
      ${liveFront(u, 'l')}${liveFront(u, 'r')}
      <path data-n="hd" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      ${back(u, rr(6.3, 1, 18.4, 3.6, 1.6))}`,
  target: (h) => ({ q: h ? -0.38 : 1 }),
  draw(p, E) {
    setPath(E, 'l', door(LT, (SEAM - LT) * p.q, p.q));
    setPath(E, 'r', door(RT, (SEAM - RT) * p.q, p.q));
    at(E.hd, { d: `M${f(LT + GRIP * p.q)} 10.6V15.6M${f(RT - GRIP * p.q)} 10.6V15.6`, opacity: p.q > 0.12 ? 1 : 0 });
  }
});

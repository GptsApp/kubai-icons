import { defineIcon, KR, f, OL, DEEPS, rr, at, scaleAt, clamp01 } from '../packages/core/src/kit.js';
import { flame, drippy } from './_home-food.js';

export default defineIcon({
  name: 'cake',
  zh: '蛋糕',
  category: 'food',
  tags: ['birthday', 'party', 'celebration', 'dessert', 'anniversary', '生日'],
  variants: ['heart', 'plus', 'star', 'clock'],
  // A frosted cake with one candle; the candle lights on hover.
  svg: (u) => {
    const body = rr(5.2, 13, 20.6, 9.8, KR), candle = rr(14.2, 6.8, 2.6, 6.4, 0.8), fl = flame(15.5, 5.6, 3.8, 5.4);
    const icing = drippy(5.2, 25.8, 11.6, 15, [{ x: 9, w: 2.6, d: 3 }, { x: 15.5, w: 2.6, d: 2 }, { x: 21.8, w: 2.6, d: 3.4 }], KR);
    return `<g data-n="fl"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${fl}" fill="${u.loS}"/></g></g><path d="${fl}" ${OL}/></g>
      <path d="M15.5 7V5.2" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.hi}"><path d="${candle}" fill="${u.upS}"/></g><path d="${candle}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <g filter="${u.hi}"><path d="${icing}" fill="${u.upS}"/></g><path d="${icing}" ${OL}/>`;
  },
  target: (h) => ({ s: h ? 1 : 0 }),
  draw(p, E) {
    const s = clamp01(p.s);
    at(E.fl, { transform: scaleAt(Math.max(0.001, s), 15.5, 5.6), opacity: f(clamp01(s * 4)) });
  }
});

import { defineIcon, f, OL, DEEPS, rr, at, scaleAt, clamp01 } from '../packages/core/src/kit.js';
import { flame } from './_home-food.js';

export default defineIcon({
  name: 'candle',
  zh: '蜡烛',
  category: 'home',
  tags: ['light', 'flame', 'candlelight', 'romantic', 'wax', '烛光'],
  variants: ['heart'],
  // A lit candle on a dish; on hover the flame grows from the wick.
  svg: (u) => {
    const dish = rr(6.2, 19.8, 18.6, 3.6, 1.8), wax = rr(10.8, 8.8, 9.4, 13, 1.8), fl = flame(15.5, 6.8, 5, 7.4);
    return `<g data-n="fl"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${fl}" fill="${u.loS}"/></g></g><path d="${fl}" ${OL}/></g>
      <path d="M15.5 9V6.4" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${dish}" fill="${u.loS}"/></g></g><path d="${dish}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${wax}" fill="${u.upS}"/></g></g><path d="${wax}" ${OL}/>`;
  },
  target: (h) => ({ s: h ? 1 : 0.55 }),
  draw(p, E) {
    const s = clamp01(p.s);
    at(E.fl, { transform: scaleAt(Math.max(0.001, s), 15.5, 6.8), opacity: f(clamp01(s * 4)) });
  }
});

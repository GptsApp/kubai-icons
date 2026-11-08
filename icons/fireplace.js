import { defineIcon, KR, f, OL, DEEP, SOFT, R, rp, rr, at, scaleAt, rattle, clamp01 } from '../packages/core/src/kit.js';
import { flame } from './_home-food.js';

export default defineIcon({
  name: 'fireplace',
  zh: '壁炉',
  category: 'home',
  tags: ['fire', 'hearth', 'warm', 'cozy', 'heating', '取暖'],
  // A fireplace under a mantel shelf; on hover the fire in it flares up tall and wide, flickering from side
  // to side before it burns steady.
  svg: (u) => {
    const body = rr(5.2, 5.6, 20.6, 17.2, KR), shelf = rr(3.4, 3.4, 24.2, 3.6, 1.6);
    const box = rp(R(9.4, 10.8, 12.2, 12), [3.2, 3.2, 0, 0]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${box}" fill="#fff"/>
      <g data-n="fire"><path d="${flame(15.5, 20.6, 7.4, 8.4)}" ${SOFT}/><path d="${flame(15.5, 20.6, 3.8, 5)}" ${DEEP}/></g>
      <path d="${rr(11, 19.8, 9, 2.6, 1.3)}" ${DEEP}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${shelf}" fill="${u.upS}"/></g></g><path d="${shelf}" ${OL}/>`;
  },
  target: (h) => ({ s: h ? 1.22 : 0.85, w: h ? 1.32 : 1, o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), a = rattle(o, 14, 4), lean = Math.abs(a) < 1e-4 ? '' : `rotate(${f(a)} 15.5 20.6) `;
    at(E.fire, { transform: lean + scaleAt(p.w + rattle(o, 0.22, 3), 15.5, 20.6, p.s + rattle(o, 0.2, 5)) });
  }
});

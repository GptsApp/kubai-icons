import { defineIcon, f, OL, DEEP, R, rp, circ, rattle, clamp01, at } from '../packages/core/src/kit.js';
import { circCW } from './_devices.js';

// Rim and spokes in one shape: the spokes wind like the outer circle so they fill the hole.
const WHEEL = circ(15.5, 12.5, 11.5) + circCW(15.5, 12.5, 8.3)
  + rp(R(4.6, 11.2, 21.8, 2.6).reverse(), 0) + rp(R(14.2, 12.5, 2.6, 10.4).reverse(), 0);
const HUB = circ(15.5, 12.5, 4);

export default defineIcon({
  name: 'steering-wheel',
  zh: '方向盘',
  category: 'transport',
  tags: ['steering wheel', 'drive', 'driving', 'car', 'wheel', 'driver', '驾驶'],
  // A steering wheel; on hover it is turned one way, then the other, and comes back straight.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="w" d="${WHEEL}" fill="${u.loS}"/></g></g><path data-n="wO" d="${WHEEL}" ${OL}/>
    <g filter="${u.hi}"><path d="${HUB}" fill="${u.upS}"/></g><path d="${HUB}" ${OL}/>
    <circle cx="15.5" cy="12.5" r="1.5" ${DEEP}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(rattle(clamp01(p.o), 60, 2))} 15.5 12.5)`;
    at(E.w, { transform: t }); at(E.wO, { transform: t });
  }
});

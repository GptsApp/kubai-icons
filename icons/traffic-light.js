import { defineIcon, f, OL, DEEP, rp, rr, clamp01, at } from '../packages/core/src/kit.js';

const LAMPS = [5.4, 12.5, 19.6];

export default defineIcon({
  name: 'traffic-light',
  zh: '红绿灯',
  category: 'travel',
  tags: ['signal', 'stop', 'go', 'traffic', 'road', '信号灯'],
  // A traffic light lit at the top; on hover the light passes down through the middle
  // lamp to the bottom one.
  svg: (u) => {
    const ears = LAMPS.map((y) => rp([[6.6, y - 2.4], [10.4, y - 2.4], [10.4, y + 0.8]], [0.8, 0, 0])
      + rp([[20.6, y - 2.4], [24.4, y - 2.4], [20.6, y + 0.8]], [0, 0.8, 0])).join('');
    const box = rr(10, 1, 11, 23, 3.6);
    return `<g filter="${u.hi}"><path d="${ears}" fill="${u.upS}"/></g><path d="${ears}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${box}" fill="${u.loS}"/></g></g><path d="${box}" ${OL}/>
      ${LAMPS.map((y, i) => `<circle cx="15.5" cy="${y}" r="2.8" ${DEEP}/><circle data-n="l${i}" cx="15.5" cy="${y}" r="2.8" fill="#fff"/>`).join('')}`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.l0, { opacity: f(clamp01(1 - 2 * o)) });
    at(E.l1, { opacity: f(1 - Math.abs(2 * o - 1)) });
    at(E.l2, { opacity: f(clamp01(2 * o - 1)) });
  }
});

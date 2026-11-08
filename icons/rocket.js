import { defineIcon, f, OL, DEEP, rp, rr, clamp01, at } from '../packages/core/src/kit.js';

const BODY = 'M15.5 1C19.9 3.6 21.4 8.2 21.4 12.8V17.4Q21.4 18.6 20.2 18.6H10.8Q9.6 18.6 9.6 17.4V12.8C9.6 8.2 11.1 3.6 15.5 1Z';
const FINS = rp([[9.8, 12], [9.8, 18.6], [5.4, 21.4], [5.4, 16.4]], [0, 0, 1.2, 1.4]) + rp([[21.2, 12], [25.6, 16.4], [25.6, 21.4], [21.2, 18.6]], [0, 1.4, 1.2, 0]);
const FLAME = 'M15.5 26.4C13.2 24.8 12.6 22.6 13 20.4H18C18.4 22.6 17.8 24.8 15.5 26.4Z';

export default defineIcon({
  name: 'rocket',
  zh: '火箭',
  category: 'transport',
  tags: ['launch', 'space', 'startup', 'boost', 'ship', '发射'],
  variants: ['check', 'clock'],
  // A rocket on the pad; on hover its engine fires and it lifts off.
  svg: (u) => `<g data-n="r">
    <g data-n="fl"><g filter="${u.hi}"><path d="${FLAME}" fill="${u.upS}"/></g><path d="${FLAME}" ${OL}/></g>
    <path d="${rr(12.6, 17.6, 5.8, 3, 0.8)}" ${DEEP}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${FINS}" fill="${u.upS}"/></g></g><path d="${FINS}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g><path d="${BODY}" ${OL}/>
    <circle cx="15.5" cy="9.6" r="2.6" fill="#fff"/></g>`,
  target: (h) => ({ y: h ? -1.8 : 1.2, fl: h ? 1 : 0 }),
  draw(p, E) {
    at(E.r, { transform: `translate(0 ${f(p.y)})` });
    const s = Math.max(0.001, clamp01(p.fl));
    at(E.fl, { transform: `translate(15.5 20.4) scale(${f(0.7 + 0.3 * s)} ${f(s)}) translate(-15.5 -20.4)`, opacity: f(s) });
  }
});

import { defineIcon, KR, CR, f, OL, DEEP, DEEPS, SOFTS, R, rp, rr, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'school',
  zh: '学校',
  category: 'home',
  tags: ['education', 'campus', 'class', 'study', '校园'],
  variants: ['check', 'search', 'star'],
  // A schoolhouse with a clock in its gable; on hover the hands run on three hours and the
  // door swings open on its left hinge.
  svg: (u) => {
    const body = rr(4.6, 10.4, 21.8, 12.4, KR);
    const gable = rp([[10, 22.8], [10, 8], [15.5, 3], [21, 8], [21, 22.8]], [0, 1.2, 1.8, 1.2, 0]);
    const door = rp(R(13.1, 16.8, 4.8, 6), [2.4, 2.4, 0, 0]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${rr(6.1, 13.6, 2.4, 3.6, 0.8) + rr(22.5, 13.6, 2.4, 3.6, 0.8)}" fill="#fff"/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${gable}" fill="${u.upS}"/></g></g><path d="${gable}" ${OL}/>
      <path d="${circ(15.5, 10.2, 3.4)}" fill="#fff"/><path data-n="door" d="${door}" fill="#fff"/>
      <path data-n="hr" d="M15.5 10.2L17.6 10.2" fill="none" stroke-width="1.6" stroke-linecap="round" ${SOFTS}/>
      <path data-n="min" d="M15.5 10.2V7.8" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <circle cx="15.5" cy="10.2" r="1" ${DEEP}/>`;
  },
  target: (h) => ({ a: h ? 1080 : 0 }),
  draw(p, E) {
    at(E.min, { transform: `rotate(${f(p.a)} 15.5 10.2)` });
    const o = p.a / 1080;
    if (o) {
      at(E.hr, { transform: `rotate(${f(p.a / 12)} 15.5 10.2)` });
      at(E.door, { transform: `translate(13.1 0) scale(${f(1 - 0.88 * o)} 1) translate(-13.1 0)` });
    } else { E.hr.removeAttribute('transform'); E.door.removeAttribute('transform'); }
  }
});

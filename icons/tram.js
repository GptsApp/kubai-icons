import { defineIcon, f, OL, DEEP, DEEPS, R, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'tram',
  zh: '有轨电车',
  category: 'transport',
  tags: ['streetcar', 'trolley', 'light rail', 'tramway', 'transit', '电车'],
  variants: ['check', 'clock'],
  // A tram seen head-on under its overhead wire; on hover the pantograph rises to the wire and
  // the tram dips and bobs on its springs.
  svg: (u) => {
    const body = rr(7.4, 6.8, 16.2, 15, 3.4), front = rp(R(7.4, 15.8, 16.2, 6), [1.6, 1.6, 3.4, 3.4]);
    return `<path d="M4.6 1H26.4" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <path data-n="pa" fill="none" stroke-width="1.6" stroke-linejoin="round" ${DEEPS}/>
      <path data-n="bar" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path d="M11.4 22.4L9.8 24.2M19.6 22.4L21.2 24.2" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="t0" d="${body}" fill="${u.loS}"/></g></g><path data-n="t1" d="${body}" ${OL}/>
      <path data-n="t2" d="${rr(9.8, 9.2, 11.4, 4.6, 1.4)}" fill="#fff"/>
      <g filter="${u.hi}"><path data-n="t3" d="${front}" fill="${u.upS}"/></g><path data-n="t4" d="${front}" ${OL}/>
      <circle data-n="t5" cx="11.2" cy="18.8" r="1.4" ${DEEP}/><circle data-n="t6" cx="19.8" cy="18.8" r="1.4" ${DEEP}/>`;
  },
  target: (h) => ({ y: h ? 2.9 : 5, o: h ? 1 : 0 }),
  draw(p, E) {
    // The body and the pantograph's feet move together; the wheels stay on the rails.
    const dy = rattle(clamp01(p.o), 1.1, 3), t = Math.abs(dy) < 1e-4 ? '' : `translate(0 ${f(dy)})`;
    for (let i = 0; i < 7; i++) t ? E['t' + i].setAttribute('transform', t) : E['t' + i].removeAttribute('transform');
    at(E.pa, { d: `M12.4 ${f(7 + dy)}L15.5 ${f(p.y)}L18.6 ${f(7 + dy)}` });
    at(E.bar, { d: `M12.6 ${f(p.y)}H18.4` });
  }
});

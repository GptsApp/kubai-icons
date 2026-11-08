import { defineIcon, f, OL, DEEP, rp, clamp01, rattle, at } from '../packages/core/src/kit.js';

const BODY = rp([[5.4, 2.6], [11, 6], [20, 6], [25.6, 2.6], [25.6, 23], [5.4, 23]], [1, 2, 2, 1, 6.4, 6.4]);
const BELLY = rp([[10.6, 17.6], [20.4, 17.6], [20.4, 23], [10.6, 23]], [4.4, 4.4, 1.6, 1.6]);

export default defineIcon({
  name: 'owl',
  zh: '猫头鹰',
  category: 'nature',
  tags: ['owl', 'bird', 'night', 'wisdom', 'learn', 'animal', '夜猫子'],
  // An owl with big round eyes and ear tufts; on hover it tilts its head and its pupils widen.
  svg: (u) => `<g data-n="o"><g filter="${u.sh}"><g filter="${u.hi}"><g data-n="f"><path d="${BODY}" fill="${u.loS}"/></g></g></g>
    <g data-n="fo"><path d="${BODY}" stroke-linejoin="round" ${OL}/>
      <g fill="#fff"><circle cx="11.4" cy="11.8" r="3.7"/><circle cx="19.6" cy="11.8" r="3.7"/></g>
      <circle data-n="p1" cx="11.8" cy="12" ${DEEP}/><circle data-n="p2" cx="19.2" cy="12" ${DEEP}/>
      <g filter="${u.hi}"><path d="${BELLY}" fill="${u.upS}"/></g><path d="${BELLY}" ${OL}/>
      <path d="${rp([[14, 14.6], [17, 14.6], [15.5, 17.6]], [0.5, 0.5, 0.6])}" ${DEEP}/></g></g>`,
  target: (h) => ({ o: h ? 1 : 0, r: h ? 2.1 : 1.6 }),
  draw(p, E) {
    const t = `rotate(${f(rattle(clamp01(p.o), 10, 2))} 15.5 22)`;
    at(E.f, { transform: t }); at(E.fo, { transform: t });
    at(E.p1, { r: f(p.r) }); at(E.p2, { r: f(p.r) });
  }
});

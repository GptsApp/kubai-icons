import { defineIcon, f, OL, DEEP, DEEPS, rp, rr, rattle, at, clamp01 } from '../packages/core/src/kit.js';

const BOARD = rp([[15.5, 3.2], [27.4, 8.8], [15.5, 14.4], [3.6, 8.8]], [1.6, 1.4, 1.6, 1.4]);
const CAP = 'M8.8 10.4V16.4C8.8 18.6 12 20.4 15.5 20.4C19 20.4 22.2 18.6 22.2 16.4V10.4Z';

export default defineIcon({
  name: 'graduation-cap',
  zh: '学士帽',
  category: 'education',
  tags: ['graduation', 'school', 'degree', 'student', 'learn', '毕业', '学位'],
  variants: ['check', 'star', 'plus'],
  // A mortarboard with a tassel; on hover the tassel swings wide and comes to rest.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${CAP}" fill="${u.loS}"/></g></g><path d="${CAP}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BOARD}" fill="${u.upS}"/></g></g><path d="${BOARD}" ${OL}/>
    <path d="M15.5 8.8L8.6 12" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    <g data-n="t"><path d="M8.6 12V16.4" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/><path d="${rr(7.2, 15.6, 2.8, 4.6, 1.2)}" ${DEEP}/></g>
    <circle cx="15.5" cy="8.8" r="1.5" ${DEEP}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.t, { transform: `rotate(${f(rattle(clamp01(p.o), 38, 3))} 8.6 12)` }); }
});

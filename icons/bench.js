import { defineIcon, f, OL, DEEPS, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'bench',
  zh: '长椅',
  category: 'home',
  tags: ['park bench', 'seat', 'park', 'rest', 'outdoor', 'garden', '公园', '座椅'],
  variants: [],
  // A slatted park bench; its slats give a little on hover as if someone sat down.
  svg: (u) => {
    const back = rr(4.4, 3.4, 22.2, 3.8, 1.6) + rr(4.4, 8.6, 22.2, 3.8, 1.6), seat = rr(3.4, 14, 24.2, 4, 1.6);
    return `<path d="M7.6 6V23M23.4 6V23" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g data-n="g"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${back}" fill="${u.loS}"/></g></g><path d="${back}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${seat}" fill="${u.upS}"/></g></g><path d="${seat}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `translate(0 ${f(rattle(clamp01(p.o), 1, 3))})` }); }
});

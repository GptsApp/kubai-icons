import { defineIcon, f, OL, rp, R, circ, rattle, clamp01, at } from '../packages/core/src/kit.js';

const CROWN = circ(10.4, 11.6, 5.6) + circ(15.5, 7.2, 6.6) + circ(20.6, 11.6, 5.6) + circ(15.5, 13.6, 5.4);
const TRUNK = rp(R(13.7, 14.6, 3.6, 9.4), [1.6, 1.6, 1.4, 1.4]);

export default defineIcon({
  name: 'tree',
  zh: '树',
  category: 'nature',
  tags: ['tree', 'park', 'forest', 'nature', 'garden', '树木'],
  // A leafy crown with a lighter trunk standing in front of it; on hover the crown sways
  // in the wind and settles.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="c"><path d="${CROWN}" fill="${u.loS}"/></g></g></g><g data-n="cO"><path d="${CROWN}" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${TRUNK}" fill="${u.upS}"/></g></g><path d="${TRUNK}" ${OL}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(rattle(clamp01(p.o), 7, 3))} 15.5 22)`;
    at(E.c, { transform: t }); at(E.cO, { transform: t });
  }
});

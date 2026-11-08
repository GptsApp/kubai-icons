import { defineIcon, f, OL, rp, circ, rattle, at } from '../packages/core/src/kit.js';

// Three leaves, a filler at their meeting point and a flared stem, all wound the same way
// so they fill and outline as one shape.
const LEAVES = (s) => circ(0, -6.4 * s, 5 * s) + circ(-5.8 * s, 1.8 * s, 5 * s) + circ(5.8 * s, 1.8 * s, 5 * s) + circ(0, 0.6 * s, 3.4 * s);
const CLUB = LEAVES(1) + rp([[-1.3, 3], [-3.2, 10.4], [3.2, 10.4], [1.3, 3]], [0.2, 0.8, 0.8, 0.2]);

export default defineIcon({
  name: 'club',
  zh: '梅花',
  category: 'shapes',
  tags: ['cards', 'suit', 'poker', 'game', 'clover', '扑克'],
  // A club with a lighter club inset; on hover it rocks on its stem and settles upright.
  svg: (u) => `<g data-n="g">
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${CLUB}" fill="${u.loS}"/></g></g><path d="${CLUB}" ${OL}/>
    <g transform="translate(0 -1.2)"><g filter="${u.hi}"><path d="${LEAVES(0.46)}" fill="${u.upS}"/></g></g></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `translate(15.5 13) rotate(${f(rattle(Math.max(0, Math.min(1, p.o)), 12, 3))} 0 10.4)` }); }
});

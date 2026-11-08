import { defineIcon, f, OL, WHITE, WHITES, rp, rr, circ, rattle, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'pen',
  zh: '钢笔',
  category: 'text',
  tags: ['pen', 'fountain pen', 'nib', 'write', 'pen tool', 'vector', '笔尖'],
  // A fountain pen nib; on hover it presses down and rocks as it writes.
  svg: (u) => {
    const nib = rp([[9.4, 5], [21.6, 5], [23, 12.4], [15.5, 23.8], [8, 12.4]], [1.2, 1.2, 2.6, 0.8, 2.6]);
    const collar = rr(9.6, 1, 11.8, 5.6, 1.8);
    return `<g data-n="g"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${nib}" fill="${u.loS}"/></g></g><path d="${nib}" ${OL}/>
      <path d="M15.5 15.4V20.6" class="ln" ${WHITES}/>
      <path d="${circ(15.5, 12.6, 1.7)}" ${WHITE}/>
      <g filter="${u.hi}"><path d="${collar}" fill="${u.upS}"/></g><path d="${collar}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o));
    at(E.g, { transform: `translate(0 ${f(0.8 * o)}) rotate(${f(rattle(o, 10, 2))} 15.5 23.8)` });
  }
});

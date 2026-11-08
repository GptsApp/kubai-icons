import { defineIcon, f, OL, R, rp, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'crown',
  zh: '皇冠',
  category: 'people',
  tags: ['king', 'queen', 'premium', 'vip', 'pro', 'royal', 'winner', '会员'],
  // A crown with three points and a band; on hover it rises and tips, as if put on.
  svg: (u) => {
    const body = rp([[4.4, 7], [10.4, 12.4], [15.5, 4.4], [20.6, 12.4], [26.6, 7], [24.6, 19.4], [6.4, 19.4]], [1, 1.2, 1, 1.2, 1, 1.2, 1.2]);
    const band = rp(R(5.8, 16.4, 19.4, 6.4), [1.6, 1.6, 2, 2]);
    const gems = circ(4.4, 6, 2) + circ(15.5, 3.4, 2) + circ(26.6, 6, 2);
    return `<g data-n="g"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <g filter="${u.hi}"><path d="${gems}" fill="${u.upS}"/></g><path d="${gems}" ${OL}/>
      <g filter="${u.hi}"><path d="${band}" fill="${u.upS}"/></g><path d="${band}" ${OL}/></g>`;
  },
  target: (h) => ({ y: h ? -1.2 : 0, a: h ? -6 : 0 }),
  draw(p, E) { at(E.g, { transform: `translate(0 ${f(p.y)}) rotate(${f(p.a)} 15.5 20)` }); }
});

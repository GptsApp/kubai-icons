import { defineIcon, f, OL, R, rp, rr, clamp01, rattle, at } from '../packages/core/src/kit.js';

// Index to little finger: left edge, top.
const FINGERS = [[10.3, 3.6], [13.9, 1.2], [17.5, 2.2], [21.1, 4.8]];

export default defineIcon({
  name: 'hand',
  zh: '举手',
  category: 'people',
  tags: ['raise hand', 'wave', 'hello', 'stop', 'palm', 'hi', '挥手'],
  // A raised open hand; on hover it waves from the wrist and comes to rest upright.
  svg: (u) => {
    const thumb = rp([[4.4, 11.8], [7.2, 9.8], [12.8, 16.4], [10.4, 19.2]], [1.7, 1.7, 1.2, 1.2]);
    const palm = rp(R(10.3, 12, 14.4, 12), [1.6, 1.6, 5.6, 5.6]);
    const fingers = FINGERS.map(([x, y]) => { const d = rr(x, y, 3.6, 15 - y, 1.8); return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${d}" fill="${u.loS}"/></g></g><path d="${d}" ${OL}/>`; }).join('');
    return `<g data-n="f"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${thumb}" fill="${u.loS}"/></g></g><path d="${thumb}" ${OL}/>
      ${fingers}
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${palm}" fill="${u.upS}"/></g></g><path d="${palm}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.f, { transform: `rotate(${f(rattle(clamp01(p.o), 14, 3))} 17.2 24)` }); }
});

import { defineIcon, KR, f, OL, DEEPS, R, rp, at, rattle } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'eraser',
  zh: '橡皮擦',
  category: 'text',
  tags: ['eraser', 'erase', 'clear', 'rubber', 'delete', '擦除'],
  // An eraser above a pencil line; on hover it rubs back and forth and the line's left end is wiped away.
  svg: (u) => {
    const rubber = rp(R(-10, -5, 8, 10), [KR, 0, 0, KR]), sleeve = rp(R(-2.2, -5, 12.2, 10), [0, KR, KR, 0]);
    return `<path data-n="ln" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g data-n="er"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${rubber}" fill="${u.upS}"/><path d="${sleeve}" fill="${u.loS}"/></g></g>
        <path d="${rubber}" ${OL}/><path d="${sleeve}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o));
    const dx = rattle(o, 2.2, 3);
    at(E.er, { transform: `translate(${f(15.5 + dx)} 10) rotate(-25)` });
    at(E.ln, { d: `M${f(5.6 + 7.4 * o)} 23H25.4` });
  }
});

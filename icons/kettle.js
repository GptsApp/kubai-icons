import { defineIcon, KR, f, OL, DEEPS, R, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { steam, reveal } from './_home-food.js';

const BODY = rp([[10, 8.2], [21, 8.2], [24.2, 23.4], [6.8, 23.4]], [2.8, 2.8, KR, KR]);

export default defineIcon({
  name: 'kettle',
  zh: '水壶',
  category: 'home',
  tags: ['teakettle', 'boil', 'kitchen', 'tea', 'hot water', 'stove', '烧水壶', '茶壶'],
  variants: [],
  // A stovetop kettle; on the boil, its lid jumps and rattles and a tall wisp of steam rises
  // from its spout on hover.
  svg: (u) => {
    const handle = rr(10.2, 1.8, 10.6, 9, 4.4) + rr(12.6, 4.2, 5.8, 6, 2.2);
    const spout = rp([[9.6, 13.4], [4.2, 9.4], [3, 11.2], [8.2, 19]], [1, 0.8, 0.8, 1]);
    const lid = rp(R(8.6, 8.2, 13.8, 4.4), [2.8, 2.8, 0, 0]);
    return `<path data-n="st" d="${steam(3.8, 7.4, 2)}" pathLength="1" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${handle}" fill-rule="evenodd" fill="${u.loS}"/></g></g><path d="${handle}" fill-rule="evenodd" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${spout}" fill="${u.loS}"/></g></g><path d="${spout}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g><path d="${BODY}" ${OL}/>
      <g data-n="lid"><g filter="${u.hi}"><path d="${lid}" fill="${u.upS}"/></g><path d="${lid}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    const jump = Math.abs(rattle(o, 1.4, 3)), up = jump < 1e-4 ? '' : `translate(0 ${f(-jump)}) `;
    at(E.lid, { transform: `${up}rotate(${f(rattle(o, 9, 3))} 15.5 12.6)` });
    // Once it starts to show, the wisp is a longer one that reaches higher.
    const s = clamp01((o - 0.1) / 0.75);
    at(E.st, { d: s > 0 ? steam(3.8, 7.4, 3) : steam(3.8, 7.4, 2), ...reveal(s) });
  }
});

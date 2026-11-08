import { defineIcon, f, OL, circ, frontPiece, at, rattle, clamp01 } from '../packages/core/src/kit.js';

const SHELL = [15.5, 10.2, 11.4];
// Lettuce along the rim: same-winding circles plus a counter-clockwise block.
const FILL = [6.6, 11, 15.5, 20, 24.4].map((x, i) => circ(x, i % 2 ? 8.2 : 9.4, 3)).join('') + 'M6.6 9V14H24.4V9Z';

export default defineIcon({
  name: 'taco',
  zh: '塔可',
  category: 'food',
  tags: ['mexican', 'tortilla', 'fast food', 'street food', 'tuesday', '墨西哥卷饼'],
  variants: [],
  // A folded taco shell full of filling; it rocks on its curved shell on hover.
  svg: (u) => {
    const shell = frontPiece(SHELL, SHELL, 11.4, 1.8);
    return `<g data-n="g"><g transform="rotate(-10 15.5 15)">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${FILL}" fill="${u.loS}"/></g></g><path d="${FILL}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${shell}" fill="${u.upS}"/></g></g><path d="${shell}" ${OL}/></g></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 9, 2))} 15.5 21.6)` }); }
});

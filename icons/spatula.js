import { defineIcon, f, KR, WHITES, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { solid, light } from './_b2-kitchen.js';

const HEAD = rp([[8.8, -1], [22.2, -1], [23, 13.2], [8, 13.2]], KR);

export default defineIcon({
  name: 'spatula',
  zh: '锅铲',
  category: 'home',
  tags: ['turner', 'flip', 'kitchen', 'cooking', 'fry', 'grill', '铲子', '烹饪'],
  variants: [],
  // A slotted turner at a slant; on hover it flicks up as if flipping something, then settles.
  svg: (u) => `<g data-n="g"><g transform="rotate(38 15.5 12.5)">
      ${light(u, rr(13.6, 11.6, 3.8, 15.4, 1.9))}${solid(u, HEAD)}
      <path d="M11.5 2.2V9.8M15.5 2.2V9.8M19.5 2.2V9.8" fill="none" stroke-width="2.2" stroke-linecap="round" ${WHITES}/>
    </g></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), -22, 2))} 6.8 23.6)` }); }
});

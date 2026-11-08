import { defineIcon, f, WHITES, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { solid, light } from './_b2-kitchen.js';

export default defineIcon({
  name: 'rolling-pin',
  zh: '擀面杖',
  category: 'home',
  tags: ['baking', 'dough', 'pastry', 'kitchen', 'roller', '烘焙', '面团'],
  variants: [],
  // A rolling pin at a slant; on hover it rolls forward and back, its highlight turning with it.
  svg: (u) => `<g transform="rotate(-35 15.5 12.5)"><g data-n="g">
      ${light(u, rr(1, 10.7, 7.4, 3.6, 1.8))}${light(u, rr(22.6, 10.7, 7.4, 3.6, 1.8))}
      ${solid(u, rr(6.4, 8.2, 18.2, 8.6, 3.4))}
      <path data-n="ln" d="M9.6 0H21.4" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/>
    </g></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const y = rattle(clamp01(p.o), 7, 2);
    at(E.g, { transform: `translate(0 ${f(y)})` });
    at(E.ln, { transform: `translate(0 ${f(12.5 + 3 * Math.sin(-0.75 + y / 2.6))})` });
  }
});

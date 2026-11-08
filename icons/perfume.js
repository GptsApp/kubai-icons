import { defineIcon, f, DEEP, rr, bump, clamp01, at } from '../packages/core/src/kit.js';
import { back } from './_commerce-charts.js';

const BODY = rr(5, 11, 15.6, 13, 3.2);
const COLLAR = rr(10.1, 7.6, 5.4, 4.2, 0.8);
const HEAD = rr(8.2, 1.6, 9.2, 6.8, 1.6);
const NOZZLE = rr(16.6, 3.4, 3.4, 2.8, 0.6);
const DOTS = [[23.2, 2], [26, 5], [23.4, 8.2]];

export default defineIcon({
  name: 'perfume',
  zh: '香水',
  category: 'commerce',
  tags: ['fragrance', 'cologne', 'scent', 'spray', 'beauty', 'cosmetics', '香氛', '美妆'],
  variants: ['plus', 'check', 'heart', 'star'],
  // A perfume bottle with a spray head and a mist of drops; on hover the head presses down and the drops burst out.
  svg: (u) => `<g transform="translate(-0.5 0)">${back(u, COLLAR, u.upS)}${back(u, BODY, u.loS)}
    <path d="${rr(9.4, 15, 6.8, 5.2, 1.2)}" fill="#fff"/>
    <g data-n="h"><path d="${NOZZLE}" ${DEEP}/>${back(u, HEAD, u.upS)}</g>
    ${DOTS.map((d, i) => `<circle data-n="d${i}" cx="${d[0]}" cy="${d[1]}" r="1.3" ${DEEP}/>`).join('')}</g>`,
  target: (h) => ({ o: h ? 1 : 0, s: h ? 1 : 0 }),
  draw(p, E) {
    at(E.h, { transform: `translate(0 ${f(1.8 * bump(clamp01(p.o)))})` });
    DOTS.forEach((d, i) => {
      const dx = d[0] - 18.6, dy = d[1] - 4.8, k = 0.3 * p.s;
      at(E[`d${i}`], { cx: f(d[0] + dx * k), cy: f(d[1] + dy * k), r: f(1.3 + 0.3 * p.s) });
    });
  }
});

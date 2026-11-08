import { defineIcon, f, KR, CR, DEEP, rp, at, bump, rattle, wave, clamp01 } from '../packages/core/src/kit.js';
import { solid, light } from './_b2-kitchen.js';

const BODY = rp([[9.4, 8.8], [21.6, 8.8], [23.4, 23.8], [7.6, 23.8]], [1.4, 1.4, KR, KR]);
const CAP = 'M9.6 9.8C9.6 4.4 12.2 1.2 15.5 1.2C18.8 1.2 21.4 4.4 21.4 9.8Q21.4 10.8 20.4 10.8H10.6Q9.6 10.8 9.6 9.8Z';
const SALT = rp([[11.8, 14.2], [19.2, 14.2], [20.6, 21.6], [10.4, 21.6]], CR);
// Grains: start and end of each flight.
const GRAINS = [[[7.4, 4.2], [2.8, 12.6]], [[9, 6], [6, 16]], [[6.4, 6.6], [3.2, 19]]];

export default defineIcon({
  name: 'salt-shaker',
  zh: '盐瓶',
  category: 'food',
  tags: ['salt', 'pepper', 'seasoning', 'condiment', 'spice', 'table', '调味', '胡椒'],
  variants: [],
  // A shaker with a holed dome; on hover it tips, gives a shake and grains fall out.
  svg: (u) => `<g fill-opacity="1" ${DEEP}>${GRAINS.map((_, i) => `<circle data-n="s${i}" r="1.3"/>`).join('')}</g>
    <g data-n="g">${solid(u, BODY)}<path d="${SALT}" fill="#fff"/>${light(u, CAP)}
      <circle cx="12.5" cy="6.8" r="1.3" ${DEEP}/><circle cx="15.5" cy="4.6" r="1.3" ${DEEP}/><circle cx="18.5" cy="6.8" r="1.3" ${DEEP}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), t = bump(o);
    at(E.g, { transform: `rotate(${f(-42 * t + rattle(o, 8, 3))} 15.5 14)` });
    GRAINS.forEach(([a, b], i) => {
      const g = wave(o, (r) => clamp01((r - 0.3 - i * 0.07) / 0.5));
      at(E[`s${i}`], { cx: f(a[0] + (b[0] - a[0]) * g), cy: f(a[1] + (b[1] - a[1]) * g * g), opacity: f(clamp01(g * 8) * clamp01((1 - g) * 5)) });
    });
  }
});

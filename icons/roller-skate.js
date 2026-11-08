import { defineIcon, f, OL, rr, circ, at } from '../packages/core/src/kit.js';
import { layer } from './_science-edu-sports.js';

const BOOT = 'M6.4 16V3.8Q6.4 1.6 8.6 1.6H13.4Q15.4 1.6 15.4 3.6V8.4Q15.4 10.4 17.4 11L22.8 12.6Q26 13.6 26 16.8V17.2H6.4Z';
const PLATE = rr(5.2, 15.8, 22, 3.4, 1.7);
const WHEELS = [9.8, 21.6];

export default defineIcon({
  name: 'roller-skate',
  zh: '轮滑鞋',
  category: 'sports',
  tags: ['roller skate', 'skating', 'quad skate', 'rink', 'roller', 'sport', '溜冰'],
  // A roller skate side on; on hover it rolls forward, its wheels turning.
  svg: (u) => `<g data-n="g">${layer(u, 'bt', BOOT, u.loS, { extra: `<path d="M10.8 5H13.4M10.8 8.2H13.4" class="ln" stroke-linecap="round" stroke="#fff" data-w="stroke"/>` })}
    ${WHEELS.map((x, i) => `<g filter="${u.sh}"><path d="${circ(x, 20.4, 3)}" fill="${u.pure('#2F6FE0')}"/></g><path d="${circ(x, 20.4, 3)}" ${OL}/>
      <g data-n="w${i}"><path d="M${x} 18.6V22.2" fill="none" stroke-width="1.6" stroke-linecap="round" stroke="#fff" data-w="stroke"/></g>`).join('')}
    ${layer(u, 'pl', PLATE, u.upS)}</g>`,
  target: (h) => ({ x: h ? 1.6 : 0 }),
  draw(p, E) {
    at(E.g, { transform: `translate(${f(p.x - 0.8)} 0)` });
    WHEELS.forEach((x, i) => at(E[`w${i}`], { transform: `rotate(${f(p.x / 3 * 180 / Math.PI)} ${x} 20.4)` }));
  }
});

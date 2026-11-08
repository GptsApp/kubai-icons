import { defineIcon, f, OL, star, rattle, clamp01, at } from '../packages/core/src/kit.js';
import { crescent } from './_weather-nature.js';

const MOON = crescent([13.4, 14, 10], [19.8, 8.4, 8]);
const INNER = crescent([13.4, 14, 7.4], [19.8, 8.4, 10.6]);
const STAR = star(4.2, 1.9);

export default defineIcon({
  name: 'moon-star',
  zh: '星月',
  category: 'weather',
  tags: ['night', 'clear night', 'sleep', 'dream', 'bedtime', '夜晚'],
  // A crescent moon with a star in its hollow; on hover the star twinkles.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${MOON}" fill="${u.loS}"/></g></g><path d="${MOON}" stroke-linejoin="round" ${OL}/>
    <g filter="${u.hi}"><path d="${INNER}" fill="${u.upS}"/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="s"><path d="${STAR}" fill="${u.upS}"/></g></g></g><g data-n="sO"><path d="${STAR}" stroke-linejoin="round" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), t = `translate(22.6 6.2) rotate(${f(72 * o)}) scale(${f(1 + rattle(o, 0.35, 2))})`;
    at(E.s, { transform: t }); at(E.sO, { transform: t });
  }
});

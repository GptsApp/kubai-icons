import { defineIcon, f, OL, circ, ellipse, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';

// The pan seen from above at a tilt: its rim and, below it, the depth of its wall.
const PAN = ellipse(12.4, 11.6, 9.4, 7.6) + ellipse(12.4, 13.6, 9.4, 7.6) + 'M3 11.6V13.6H21.8V11.6Z';
const EGG = 'M6.8 12.4C6 10 7.6 8.2 9.8 8.6C11 7.2 13.6 7 15 8.2C17.4 8 18.6 10.4 17.6 12.2C18 14.6 15.6 15.8 13.6 15C12.2 16.4 9.4 16.2 8.8 14.6C7.6 14.6 6.8 13.6 6.8 12.4Z';

export default defineIcon({
  name: 'frying-pan',
  zh: '平底锅',
  category: 'home',
  tags: ['pan', 'skillet', 'fry', 'cooking', 'kitchen', 'egg', 'breakfast', '煎锅', '烹饪'],
  variants: [],
  // A frying pan with a fried egg in it; on hover the pan gives a toss and the egg hops.
  svg: (u) => {
    const handle = rr(19.8, 10.4, 8.4, 3.6, 1.8), inner = ellipse(12.4, 11.6, 7.4, 5.6);
    return `<g data-n="g"><g transform="rotate(-12 15.5 12.5)">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${handle}" fill="${u.loS}"/></g></g><path d="${handle}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${PAN}" fill="${u.loS}"/></g></g><path d="${PAN}" ${OL}/>
      <g filter="${u.hi}"><path d="${inner}" fill="${u.upS}"/></g>
      <g data-n="egg"><path d="${EGG}" fill="#fff"/><circle cx="13.8" cy="11" r="2.4" fill="${u.loS}"/></g></g></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.g, { transform: `rotate(${f(rattle(o, -6, 2))} 27 8.4)` });
    at(E.egg, { transform: `translate(0 ${f(rattle(o, -2, 2))})` });
  }
});

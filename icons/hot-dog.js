import { defineIcon, f, OL, WHITES, R, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'hot-dog',
  zh: '热狗',
  category: 'food',
  tags: ['hotdog', 'sausage', 'bun', 'fast food', 'snack', 'bbq', '香肠'],
  variants: [],
  // A sausage in a bun with a squiggle of mustard; it waggles on hover.
  svg: (u) => {
    const dog = rr(3.4, 6.4, 24.2, 7.6, 3.8), bun = rp(R(6.4, 12.4, 18.2, 6.8), [2, 2, 3.4, 3.4]);
    let m = 'M8.6 9.4';
    for (let i = 1; i <= 6; i++) m += `Q${f(8.6 + i * 2.3 - 1.15)} ${i % 2 ? 8 : 10.8} ${f(8.6 + i * 2.3)} 9.4`;
    return `<g data-n="g"><g transform="rotate(-12 15.5 12.6)">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${dog}" fill="${u.loS}"/></g></g><path d="${dog}" ${OL}/>
      <path d="${m}" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${WHITES}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${bun}" fill="${u.upS}"/></g></g><path d="${bun}" ${OL}/></g></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 7, 2))} 15.5 18)` }); }
});

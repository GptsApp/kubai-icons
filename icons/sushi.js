import { defineIcon, f, OL, WHITES, rr, at, scaleAt, rattle, clamp01 } from '../packages/core/src/kit.js';

const FISH = 'M4.2 15.2C4.2 10.2 8.8 7.4 15.5 7.4C22.2 7.4 26.8 10.2 26.8 15.2Q26.8 16.8 25.4 16.4C22 15.2 19 14.8 15.5 14.8C12 14.8 9 15.2 5.6 16.4Q4.2 16.8 4.2 15.2Z';

export default defineIcon({
  name: 'sushi',
  zh: '寿司',
  category: 'food',
  tags: ['nigiri', 'japanese', 'salmon', 'fish', 'rice', 'asian', '日料'],
  variants: ['heart'],
  // A piece of salmon nigiri on its block of rice; it jiggles on hover.
  svg: (u) => {
    const rice = rr(6.6, 12, 17.8, 10.6, 4.4);
    return `<g data-n="g"><path d="${rice}" fill="#fff"/><path d="${rice}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${FISH}" fill="${u.loS}"/></g></g><path d="${FISH}" ${OL}/>
      <path d="M11 13.4L13.4 9.8M17 13.4L19.4 9.8" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const r = rattle(clamp01(p.o), 0.09, 3);
    at(E.g, { transform: scaleAt(1 + r * 0.5, 15.5, 22.4, 1 - r) });
  }
});

import { defineIcon, KR, f, OL, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';

const LID = 'M5 11.6C5 8.4 9.6 7 15.5 7C21.4 7 26 8.4 26 11.6Z';

export default defineIcon({
  name: 'cooking-pot',
  zh: '汤锅',
  category: 'home',
  tags: ['pot', 'cooking', 'kitchen', 'stew', 'recipe', 'boil', '锅', '烹饪'],
  variants: ['clock'],
  // A cooking pot with a lid; the lid lifts and rattles on hover as the pot boils.
  svg: (u) => {
    const body = rr(6, 11.6, 19, 11.6, KR), ears = rr(2.8, 13.4, 5, 3.2, 1.4) + rr(23.2, 13.4, 5, 3.2, 1.4);
    const knob = rr(13.2, 4.4, 4.6, 3.4, 1.2);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${ears}" fill="${u.loS}"/></g></g><path d="${ears}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.lo(11.6)}"/></g></g><path d="${body}" ${OL}/>
      <g data-n="lid"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${knob}" fill="${u.loS}"/></g></g><path d="${knob}" ${OL}/>
      <g filter="${u.hi}"><path d="${LID}" fill="${u.upS}"/></g><path d="${LID}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.lid, { transform: `translate(0 ${f(-2.4 * o)}) rotate(${f(rattle(o, 6, 3))} 15.5 11.6)` });
  }
});

import { defineIcon, f, OL, WHITE, rp, rattle, clamp01, at } from '../packages/core/src/kit.js';

const BODY = 'M26 12.5C23.8 7.6 19.8 5.4 15.6 5.4C11.8 5.4 8.8 8 7.4 12.5C8.8 17 11.8 19.6 15.6 19.6C19.8 19.6 23.8 17.4 26 12.5Z';
const TAIL = rp([[10, 12.5], [3, 6.8], [4.6, 12.5], [3, 18.2]], [0.8, 1.4, 1, 1.4]);

export default defineIcon({
  name: 'fish',
  zh: '鱼',
  category: 'nature',
  tags: ['fish', 'sea', 'ocean', 'aquarium', 'seafood', 'pet', '海鲜'],
  // A fish with a lighter tail; on hover it swishes its tail and its body sways after it.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="t"><path d="${TAIL}" fill="${u.upS}"/></g></g></g><g data-n="tO"><path d="${TAIL}" stroke-linejoin="round" ${OL}/></g>
    <g data-n="b"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g><path d="${BODY}" stroke-linejoin="round" ${OL}/>
      <circle cx="20.6" cy="10.8" r="1.4" ${WHITE}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), a = rattle(o, 22, 3), b = -0.25 * a;
    at(E.b, { transform: `rotate(${f(b)} 16 12.5)` });
    const t = `rotate(${f(b)} 16 12.5) rotate(${f(a)} 9.2 12.5)`;
    at(E.t, { transform: t }); at(E.tO, { transform: t });
  }
});

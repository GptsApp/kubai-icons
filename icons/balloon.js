import { defineIcon, f, OL, DEEPS, WHITES, rp, clamp01, rattle, at } from '../packages/core/src/kit.js';

const BODY = 'M15.5 1.4C20.9 1.4 24.4 5.6 24.4 10.2C24.4 15 20.2 18.8 15.5 18.8C10.8 18.8 6.6 15 6.6 10.2C6.6 5.6 10.1 1.4 15.5 1.4Z';
const KNOT = rp([[15.5, 18], [17.6, 20.8], [13.4, 20.8]], [0.6, 0.6, 0.6]);

export default defineIcon({
  name: 'balloon',
  zh: '气球',
  category: 'people',
  tags: ['balloon', 'party', 'birthday', 'celebration', 'festival', '派对'],
  // A party balloon on a string; on hover it floats up and sways on its string.
  svg: (u) => `<g data-n="s"><path d="M15.5 20.6Q13.4 22.4 15.5 24.6" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="b"><path d="${BODY}" fill="${u.loS}"/><path d="${KNOT}" fill="${u.upS}"/></g></g></g>
    <g data-n="bO"><path d="${BODY}" ${OL}/><path d="${KNOT}" stroke-linejoin="round" ${OL}/>
      <path d="M10.2 9.4Q10.4 6.2 13.2 5" fill="none" class="ln" ${WHITES}/></g>`,
  target: (h) => ({ o: h ? 1 : 0, y: h ? -1.4 : 0 }),
  draw(p, E) {
    const t = `translate(0 ${f(p.y)}) rotate(${f(rattle(clamp01(p.o), 7, 2))} 15.5 21)`;
    at(E.b, { transform: t }); at(E.bO, { transform: t });
    at(E.s, { transform: `translate(0 ${f(p.y)})` });
  }
});

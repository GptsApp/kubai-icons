import { defineIcon, f, OL, WHITES, circ, frontPiece, at } from '../packages/core/src/kit.js';

const C = [15.5, 12.5], RB = 11;
const BUMPER = frontPiece([C[0], C[1], RB], [C[0], C[1], RB], 17.4, 1.8);

export default defineIcon({
  name: 'vacuum',
  zh: '扫地机器人',
  category: 'home',
  tags: ['robot vacuum', 'cleaner', 'cleaning', 'sweeper', 'smart home', '扫地机', '吸尘器'],
  variants: ['check', 'clock', 'cog'],
  // A robot vacuum seen from above; on hover it turns on the spot to head a new way.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="r1"><path d="${circ(C[0], C[1], RB)}" fill="${u.loS}"/></g></g></g>
      <g data-n="r2"><path d="${circ(C[0], C[1], RB)}" ${OL}/>
        <g transform="rotate(180 ${C[0]} ${C[1]})">
          <g filter="${u.hi}"><path d="${BUMPER}" fill="${u.upS}"/></g><path d="${BUMPER}" ${OL}/></g>
        <g filter="${u.hi}"><path d="${circ(C[0], 13, 3.4)}" fill="${u.upS}"/></g><path d="${circ(C[0], 13, 3.4)}" ${OL}/>
        <path d="M13.4 19.4H17.6" class="ln" ${WHITES}/></g>`,
  target: (h) => ({ a: h ? -40 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(p.a)} ${C[0]} ${C[1]})`;
    at(E.r1, { transform: t }); at(E.r2, { transform: t });
  }
});

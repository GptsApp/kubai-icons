import { defineIcon, f, OL, rp, rr, circ, rattle, clamp01, at } from '../packages/core/src/kit.js';
import { cw, polar } from './_travel-transport.js';

// The arms: a 2.4-wide arc under the shank with a barbed fluke at each end.
const C = [15.5, 12.4], RO = 9.6, RI = 7.2;
function arms() {
  const a0 = 25, a1 = 155, o0 = polar(...C, RO, a0), o1 = polar(...C, RO, a1), i0 = polar(...C, RI, a0), i1 = polar(...C, RI, a1);
  let d = `M${f(o0[0])} ${f(o0[1])}A${RO} ${RO} 0 0 1 ${f(o1[0])} ${f(o1[1])}L${f(i1[0])} ${f(i1[1])}A${RI} ${RI} 0 0 0 ${f(i0[0])} ${f(i0[1])}Z`;
  for (const [a, sgn] of [[a0, 1], [a1, -1]]) {
    const t = [sgn * Math.sin(a * Math.PI / 180), -sgn * Math.cos(a * Math.PI / 180)];
    const o = polar(...C, RO + 1, a), i = polar(...C, RI - 1, a), m = polar(...C, (RO + RI) / 2, a);
    d += rp(cw([o, [m[0] + t[0] * 3.2, m[1] + t[1] * 3.2], i]), 0.5);
  }
  return d;
}

export default defineIcon({
  name: 'anchor',
  zh: '锚',
  category: 'travel',
  tags: ['harbor', 'port', 'marine', 'sea', 'boat', 'dock', '港口'],
  // An anchor hanging from its ring; on hover it sways, each swing smaller, and settles.
  svg: (u) => {
    const body = rr(14.3, 6.6, 2.4, 15.4, 1.2) + arms();
    const bar = rr(9.6, 9.2, 11.8, 2.6, 1.3), ring = circ(15.5, 4.4, 3.1) + circ(15.5, 4.4, 1.4);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="a"><path d="${body}" fill="${u.loS}"/></g></g></g>
      <g data-n="aO"><path d="${body}" ${OL}/></g>
      <g filter="${u.hi}"><g data-n="b"><path d="${bar}" fill="${u.upS}"/><path d="${ring}" fill-rule="evenodd" fill="${u.upS}"/></g></g>
      <g data-n="bO"><path d="${bar}" ${OL}/><path d="${ring}" fill-rule="evenodd" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(rattle(clamp01(p.o), 9, 3))} 15.5 4.4)`;
    for (const k of ['a', 'aO', 'b', 'bO']) at(E[k], { transform: t });
  }
});

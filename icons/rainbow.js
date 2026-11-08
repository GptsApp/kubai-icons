import { defineIcon, f, OL, clamp01, at } from '../packages/core/src/kit.js';

const CX = 15.5, CY = 17, LEG = 2.4, BANDS = [[8.5, 11.5], [5.5, 8.5], [2.5, 5.5]];
const band = (r0, r1) =>
  `M${f(CX - r1)} ${f(CY + LEG)}V${CY}A${f(r1)} ${f(r1)} 0 0 1 ${f(CX + r1)} ${CY}V${f(CY + LEG)}H${f(CX + r0)}V${CY}A${f(r0)} ${f(r0)} 0 0 0 ${f(CX - r0)} ${CY}V${f(CY + LEG)}Z`;

export default defineIcon({
  name: 'rainbow',
  zh: '彩虹',
  category: 'weather',
  tags: ['rainbow', 'pride', 'arc', 'after rain', 'colors'],
  // Three arched bands; on hover a ripple runs through them from the outer band inwards.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="b0" fill="${u.loS}"/></g></g><path data-n="b0O" ${OL}/>
    <g filter="${u.hi}"><path data-n="b1" fill="${u.upS}"/></g><path data-n="b1O" ${OL}/>
    <path data-n="b2" fill="#fff"/><path data-n="b2O" ${OL}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    BANDS.forEach(([r0, r1], i) => {
      const t = clamp01((o - i * 0.12) / 0.76), k = 1.2 * Math.sin(Math.PI * t) * (1 - 0.3 * t);
      const d = band(r0 + k, r1 + k);
      at(E[`b${i}`], { d }); at(E[`b${i}O`], { d });
    });
  }
});

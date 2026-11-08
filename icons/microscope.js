import { defineIcon, f, OL, DEEP, rr, at } from '../packages/core/src/kit.js';

// The arm: a quarter ring from behind the tube round to the base.
const C = [12.8, 13.8], RO = 8.6, RI = 5.6, A0 = -68 * Math.PI / 180;
const pt = (r, a) => [C[0] + r * Math.cos(a), C[1] + r * Math.sin(a)];
const ARM = (() => {
  const o0 = pt(RO, A0), o1 = pt(RO, Math.PI / 2), i1 = pt(RI, Math.PI / 2), i0 = pt(RI, A0);
  return `M${f(o0[0])} ${f(o0[1])}A${RO} ${RO} 0 0 1 ${f(o1[0])} ${f(o1[1])}L${f(i1[0])} ${f(i1[1])}A${RI} ${RI} 0 0 0 ${f(i0[0])} ${f(i0[1])}Z`;
})();
const BASE = rr(5.6, 19.8, 19.8, 3.8, 1.9), STAGE = rr(6.6, 15.2, 12.4, 2.6, 1.3);
const TUBE = rr(-3, -6, 6, 9.4, 1.6), EYE = rr(-2.2, -8, 4.4, 2.6, 1), LENS = rr(-1.8, 3, 3.6, 2.4, 0.8);

export default defineIcon({
  name: 'microscope',
  zh: '显微镜',
  category: 'science',
  tags: ['biology', 'lab', 'research', 'magnify', '实验', '研究'],
  // A microscope on its stand; on hover the tube is focused down toward the stage.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${ARM}" fill="${u.loS}"/></g></g><path d="${ARM}" ${OL}/>
    <g filter="${u.hi}"><path d="${STAGE}" fill="${u.upS}"/></g><path d="${STAGE}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BASE}" fill="${u.upS}"/></g></g><path d="${BASE}" ${OL}/>
    <g data-n="t"><path d="${LENS}" ${DEEP}/><path d="${EYE}" ${DEEP}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${TUBE}" fill="${u.upS}"/></g></g><path d="${TUBE}" ${OL}/></g>`,
  target: (h) => ({ y: h ? 0.8 : 0 }),
  draw(p, E) { at(E.t, { transform: `translate(11.6 7.6) rotate(-28) translate(0 ${f(p.y)})` }); }
});

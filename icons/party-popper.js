import { defineIcon, f, OL, DEEP, DEEPS, rp, at } from '../packages/core/src/kit.js';

// The cone's mouth runs from (8.8, 8.8) to (19.6, 19.6); confetti bursts from its middle.
const MO = [14.2, 14.2];
const mouth = (() => {
  const rx = 7.64, ry = 2.6, a = [MO[0] - rx * Math.SQRT1_2, MO[1] - rx * Math.SQRT1_2], b = [MO[0] + rx * Math.SQRT1_2, MO[1] + rx * Math.SQRT1_2];
  return `M${f(a[0])} ${f(a[1])}A${rx} ${ry} 45 1 0 ${f(b[0])} ${f(b[1])}A${rx} ${ry} 45 1 0 ${f(a[0])} ${f(a[1])}Z`;
})();
const BITS = [[21.4, 4.6], [25.8, 13.4], [17, 4], [22.4, 9.8]];

export default defineIcon({
  name: 'party-popper',
  zh: '庆祝',
  category: 'people',
  tags: ['celebrate', 'party', 'confetti', 'congratulations', 'birthday', 'success', '派对'],
  // A party popper; on hover it pops and the confetti flies further out.
  svg: (u) => {
    const cone = rp([[3.8, 24.2], [8.8, 8.8], [19.6, 19.6]], [1.4, 1, 1]);
    return `<g data-n="cn"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${cone}" fill="${u.loS}"/></g></g><path d="${cone}" ${OL}/>
      <path d="M7.2 15.6L12.4 20.8" class="ln" stroke-linecap="round" stroke="#fff" data-w="stroke"/>
      <g filter="${u.hi}"><path d="${mouth}" fill="${u.upS}"/></g><path d="${mouth}" ${OL}/></g>
      <circle data-n="b0" r="1.5" ${DEEP}/><circle data-n="b1" r="1.5" ${DEEP}/>
      <path data-n="b2" d="M0 0Q-1.6 -2 0 -4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path data-n="b3" d="M0 0Q2.4 -1.8 4.4 -0.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`;
  },
  target: (h) => ({ s: h ? 1.14 : 1, k: h ? 0.5 : 0 }),
  draw(p, E) {
    BITS.forEach(([x, y], i) => {
      const t = `translate(${f(MO[0] + (x - MO[0]) * p.s)} ${f(MO[1] + (y - MO[1]) * p.s)})`;
      at(E['b' + i], i < 2 ? { cx: 0, cy: 0, transform: t } : { transform: `${t} rotate(${f(p.k * 30 * (i === 2 ? -1 : 1))})` });
    });
    at(E.cn, { transform: `translate(${f(-p.k)} ${f(p.k)})` });
  }
});

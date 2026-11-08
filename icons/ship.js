import { defineIcon, f, OL, DEEP, DEEPS, rp, rr, poly, rattle, clamp01, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'ship',
  zh: '轮船',
  category: 'transport',
  tags: ['boat', 'ferry', 'cruise', 'sea', 'shipping', 'vessel', '渡轮', '邮轮'],
  variants: ['check', 'clock'],
  // A ship on the water; on hover it rocks on the swell while the waves roll past.
  svg: (u) => {
    const cabin = rr(8.4, 6.6, 12.6, 8, 1.6), hull = rp([[3.6, 12.6], [27.6, 12.6], [23.6, 20], [7.4, 20]], [1.2, 1.2, 2, 2]);
    const stack = rp([[15.8, 2.2], [19.4, 2.2], [19.4, 7], [15.8, 7]], [0.8, 0.8, 0, 0]);
    return `<g data-n="s">
      <path d="${stack}" ${DEEP}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${cabin}" fill="${u.loS}"/></g></g><path d="${cabin}" ${OL}/>
      <path d="${rr(10.8, 8.6, 3, 2.4, 0.8) + rr(15.6, 8.6, 3, 2.4, 0.8)}" fill="#fff"/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${hull}" fill="${u.upS}"/></g></g><path d="${hull}" ${OL}/></g>
      <path data-n="wv" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.s, { transform: `rotate(${f(rattle(o, 4, 2))} 15.5 18)` });
    // A swell line that travels one wavelength to the right.
    const pts = [];
    for (let x = 4.4; x <= 26.61; x += 0.6) pts.push([x, 23.2 + 0.9 * Math.sin(2 * Math.PI * ((x - 4.4) / 7.4 - o))]);
    const d = poly(pts);
    at(E.wv, { d });
  }
});

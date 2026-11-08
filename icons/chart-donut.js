import { defineIcon, f, OL, circ, at, clamp01, bump } from '../packages/core/src/kit.js';

const RO = 11.2, RI = 5.6;
const pt = (a, r) => [15.5 + r * Math.sin(a * Math.PI / 180), 12.5 - r * Math.cos(a * Math.PI / 180)];
// The highlighted share from 12 o'clock through sw degrees, its outer edge at radius ro.
const segment = (sw, ro = RO) => {
  const a = pt(0, ro), b = pt(sw, ro), c = pt(sw, RI), d = pt(0, RI), l = sw > 180 ? 1 : 0;
  return `M${f(a[0])} ${f(a[1])}A${f(ro)} ${f(ro)} 0 ${l} 1 ${f(b[0])} ${f(b[1])}L${f(c[0])} ${f(c[1])}A${RI} ${RI} 0 ${l} 0 ${f(d[0])} ${f(d[1])}Z`;
};

export default defineIcon({
  name: 'chart-donut',
  zh: '环形图',
  category: 'charts',
  tags: ['chart', 'donut', 'ring', 'progress', 'share', 'statistics', '占比'],
  variants: ['plus', 'x', 'search', 'cog'],
  // A donut chart; on hover its highlighted share swells out past the ring as it grows round
  // it, then settles back.
  svg: (u) => {
    const ring = circ(15.5, 12.5, RO) + 'M' + f(15.5 - RI) + ' 12.5' + circ(15.5, 12.5, RI).slice(circ(15.5, 12.5, RI).indexOf('A'));
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${ring}" fill-rule="evenodd" fill="${u.loS}"/></g></g>
      <path d="${ring}" fill-rule="evenodd" ${OL}/>
      <g filter="${u.hi}"><path data-n="sg" fill="${u.upS}"/></g><path data-n="sgO" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), d = segment(130 + 106 * o, RO + 1.6 * bump(o));
    at(E.sg, { d }); at(E.sgO, { d });
  }
});

import { defineIcon, f, OL, circ, at } from '../packages/core/src/kit.js';

// A band of the ring from a0 to a1 degrees (clockwise from north) with round ends.
function band(a0, a1, r1 = 7, r2 = 11.5) {
  const m = (r1 + r2) / 2, w = (r2 - r1) / 2;
  const pt = (r, a) => `${f(15.5 + r * Math.sin(a * Math.PI / 180))} ${f(12.5 - r * Math.cos(a * Math.PI / 180))}`;
  const big = a1 - a0 > 180 ? 1 : 0;
  return `M${pt(r2, a0)}A${r2} ${r2} 0 ${big} 1 ${pt(r2, a1)}A${w} ${w} 0 0 1 ${pt(r1, a1)}A${r1} ${r1} 0 ${big} 0 ${pt(r1, a0)}A${w} ${w} 0 0 1 ${pt(r2, a0)}Z`;
}
const RING = circ(15.5, 12.5, 11.5) + circ(15.5, 12.5, 7).replace(/A7 7 0 1 0/g, 'A7 7 0 1 1');
const ARC = band(-10, 110);

export default defineIcon({
  name: 'loader',
  zh: '加载',
  category: 'interface',
  tags: ['loading', 'spinner', 'progress', 'wait', 'busy', '载入'],
  // A spinner ring; on hover its bright arc runs one full turn.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${RING}" fill="${u.loS}" fill-rule="evenodd"/></g></g>
    <path d="${RING}" fill-rule="evenodd" ${OL}/>
    <g filter="${u.hi}"><g data-n="arc"><path d="${ARC}" fill="${u.upS}"/></g></g><g data-n="arcO"><path d="${ARC}" ${OL}/></g>`,
  target: (h) => ({ rot: h ? 360 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(p.rot)} 15.5 12.5)`;
    at(E.arc, { transform: t }); at(E.arcO, { transform: t });
  }
});

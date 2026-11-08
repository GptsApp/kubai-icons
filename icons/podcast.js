import { defineIcon, f, OL, DEEPS, rr, circ, at } from '../packages/core/src/kit.js';

const PC = [15.5, 10.4];
const ring = (r) => {
  const p = (d) => [PC[0] + r * Math.cos(d * Math.PI / 180), PC[1] + r * Math.sin(d * Math.PI / 180)];
  const a = p(128), b = p(52);
  return `M${f(a[0])} ${f(a[1])}A${f(r)} ${f(r)} 0 1 1 ${f(b[0])} ${f(b[1])}`;
};

export default defineIcon({
  name: 'podcast',
  zh: '播客',
  category: 'communication',
  tags: ['broadcast', 'audio', 'show', 'listen', 'episode', '电台'],
  variants: ['plus', 'check', 'down'],
  // A microphone head on its stem inside broadcast rings; on hover the rings spread out.
  svg: (u) => {
    const stem = rr(13.4, 15.2, 4.2, 8.8, 2.1);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${stem}" fill="${u.loS}"/></g></g><path d="${stem}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(PC[0], PC[1], 3.4)}" fill="${u.upS}"/></g></g><path d="${circ(PC[0], PC[1], 3.4)}" ${OL}/>
      <path data-n="w1" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path data-n="w2" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`;
  },
  target: (h) => ({ r: h ? [7.4, 11.2] : [6.8, 10.4], o: h ? 1 : 0.35 }),
  draw(p, E) { at(E.w1, { d: ring(p.r[0]) }); at(E.w2, { d: ring(p.r[1]), opacity: f(p.o) }); }
});

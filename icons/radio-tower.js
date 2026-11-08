import { defineIcon, f, OL, DEEPS, rp, circ, at } from '../packages/core/src/kit.js';

const BC = [15.5, 7.4];
const waves = (r) => {
  const p = (d) => [BC[0] + r * Math.cos(d * Math.PI / 180), BC[1] + r * Math.sin(d * Math.PI / 180)];
  const arc = (a0, a1) => { const a = p(a0), b = p(a1); return `M${f(a[0])} ${f(a[1])}A${f(r)} ${f(r)} 0 0 1 ${f(b[0])} ${f(b[1])}`; };
  return arc(-38, 38) + arc(142, 218);
};

export default defineIcon({
  name: 'radio-tower',
  zh: '信号塔',
  category: 'communication',
  tags: ['broadcast', 'antenna', 'signal', 'transmitter', 'radio', 'live', '基站'],
  off: true,
  // A transmitter mast with a beacon; on hover its waves spread out on both sides.
  svg: (u) => {
    const mast = rp([[15.5, 8.6], [20.6, 23.8], [10.4, 23.8]], [1, 1.2, 1.2]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${mast}" fill="${u.loS}"/></g></g><path d="${mast}" ${OL}/>
      <path d="M13.6 19.2H17.4" class="ln" stroke="#fff" data-w="stroke" stroke-linecap="round"/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(BC[0], BC[1], 3)}" fill="${u.upS}"/></g></g><path d="${circ(BC[0], BC[1], 3)}" ${OL}/>
      <path data-n="w1" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path data-n="w2" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`;
  },
  target: (h) => ({ r: h ? [6.6, 10.6] : [6, 9.6], o: h ? 1 : 0.35 }),
  draw(p, E) { at(E.w1, { d: waves(p.r[0]) }); at(E.w2, { d: waves(p.r[1]), opacity: f(p.o) }); }
});

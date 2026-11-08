import { defineIcon, f, OL, DEEPS, circ, at } from '../packages/core/src/kit.js';

// A pair of arcs either side of the centre at radius r, each spanning 80 degrees.
const waves = (r) => {
  const a = 40 * Math.PI / 180, x = r * Math.cos(a), y = r * Math.sin(a);
  return `M${f(15.5 + x)} ${f(12.5 - y)}A${f(r)} ${f(r)} 0 0 1 ${f(15.5 + x)} ${f(12.5 + y)}M${f(15.5 - x)} ${f(12.5 + y)}A${f(r)} ${f(r)} 0 0 1 ${f(15.5 - x)} ${f(12.5 - y)}`;
};

export default defineIcon({
  name: 'live',
  zh: '直播',
  category: 'media',
  tags: ['broadcast', 'streaming', 'on air', 'signal', 'live stream', '广播'],
  off: true,
  // A broadcast point sending out waves; on hover the waves spread out and the far pair lights up.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 3.8)}" fill="${u.loS}"/></g></g><path d="${circ(15.5, 12.5, 3.8)}" ${OL}/>
    <path data-n="w1" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <path data-n="w2" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ r: h ? [8.2, 11.6] : [7.6, 10.8], o: h ? 1 : 0.35 }),
  draw(p, E) { at(E.w1, { d: waves(p.r[0]) }); at(E.w2, { d: waves(p.r[1]), opacity: f(p.o) }); }
});

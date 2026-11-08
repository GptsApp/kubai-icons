import { defineIcon, f, OL, DEEPS, clamp01, rattle, at } from '../packages/core/src/kit.js';
import { handset } from './_comm-people.js';

// The sound arcs share one centre near the handset's face.
const PC = [11.6, 13.4];
const wave = (r) => {
  const p = (d) => [PC[0] + r * Math.cos(d * Math.PI / 180), PC[1] + r * Math.sin(d * Math.PI / 180)];
  const a = p(-78), b = p(-12);
  return `M${f(a[0])} ${f(a[1])}A${f(r)} ${f(r)} 0 0 1 ${f(b[0])} ${f(b[1])}`;
};

export default defineIcon({
  name: 'phone-call',
  zh: '来电',
  category: 'communication',
  tags: ['call', 'ringing', 'incoming', 'telephone', '通话'],
  // A ringing handset with sound arcs; on hover it rattles and the arcs spread out.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="hd" fill="${u.loS}"/></g></g><path data-n="hdO" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="cp" fill="${u.upS}"/></g></g><path data-n="cpO" ${OL}/>
    <path data-n="w1" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <path data-n="w2" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0, r: h ? [9.4, 13.6] : [8.8, 12.6], w: h ? 1 : 0.35 }),
  draw(p, E) {
    const g = handset(12.2, 14.6, 0.86, -135 + rattle(clamp01(p.o), 12, 3));
    at(E.hd, { d: g.handle }); at(E.hdO, { d: g.handle });
    at(E.cp, { d: g.cups }); at(E.cpO, { d: g.cups });
    at(E.w1, { d: wave(p.r[0]) }); at(E.w2, { d: wave(p.r[1]), opacity: f(p.w) });
  }
});

import { defineIcon, KR, CR, f, DEEPS, rr, at, clamp01, rattle } from '../packages/core/src/kit.js';
import { solid } from './_devices.js';

export default defineIcon({
  name: 'tv',
  zh: '电视',
  category: 'devices',
  tags: ['television', 'screen', 'channel', 'watch', '电视机'],
  variants: ['plus', 'check', 'x', 'star', 'heart', 'clock'],
  off: true,
  // A television with rabbit-ear antennas; on hover the antennas swing out to find a signal.
  svg: (u) => `<path data-n="ant" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      ${solid(u, rr(4, 6.4, 23, 15.2, KR), u.loS)}
      <path d="${rr(6, 8.4, 19, 11.2, CR)}" fill="#fff"/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // Each ear swings out, overshoots a little and settles 14 degrees wider.
    const o = clamp01(p.o), a = 14 * o + rattle(o, 6, 3);
    const tip = (s) => { const r = s * (42 + a) * Math.PI / 180; return [15.5 + 7 * Math.sin(r), 6.6 - 7 * Math.cos(r)]; };
    const l = tip(-1), r = tip(1);
    at(E.ant, { d: `M15.5 6.6L${f(l[0])} ${f(l[1])}M15.5 6.6L${f(r[0])} ${f(r[1])}` });
  }
});

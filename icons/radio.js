import { defineIcon, KR, CR, f, OL, DEEP, DEEPS, SOFT, rr, circ, at, clamp01, rattle, wave, bump } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'radio',
  zh: '收音机',
  category: 'media',
  tags: ['fm', 'broadcast', 'tuner', 'station', 'podcast', '电台'],
  off: true,
  // A radio with a speaker and a tuning window; on hover the needle sweeps to another station,
  // the speaker beats and the antenna sways.
  svg: (u) => {
    const body = rr(4, 7, 23, 14.8, KR);
    return `<path data-n="ant" d="M20.4 7.6L25 2.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/><circle data-n="ball" cx="25.2" cy="2.4" r="1.6" ${DEEP}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
    <path d="${circ(10.8, 14.4, 4.6)}" fill="#fff"/><path data-n="cone" d="${circ(10.8, 14.4, 2.2)}" ${SOFT}/>
    <path d="${rr(17.6, 9.6, 7.4, 4.6, CR)}" fill="#fff"/>
    <path data-n="nd" d="M0 10.9V12.9" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    <path d="${circ(21.3, 17.7, 2.1)}" fill="#fff" data-w="fill"/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The needle overshoots the station and settles; the cone pulses twice.
    const o = clamp01(p.o), x = 19.6 + 3.4 * (o + 0.6 * bump(o));
    at(E.nd, { transform: `translate(${f(x)} 0)` });
    // The antenna turns about its foot at (20.4, 7.6).
    const a = rattle(o, 16, 3) * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    const rot = (x0, y0) => [20.4 + (x0 - 20.4) * c - (y0 - 7.6) * s, 7.6 + (x0 - 20.4) * s + (y0 - 7.6) * c].map(f);
    const [tx, ty] = rot(25, 2.6), [bx, by] = rot(25.2, 2.4);
    at(E.ant, { d: `M20.4 7.6L${tx} ${ty}` }); at(E.ball, { cx: bx, cy: by });
    at(E.cone, { d: circ(10.8, 14.4, 2.2 + 2 * wave(o, (t) => (1 - t) * Math.sin(2 * Math.PI * t) ** 2)) });
  }
});

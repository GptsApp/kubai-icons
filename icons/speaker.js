import { defineIcon, KR, f, OL, SOFT, rr, circ, at, clamp01, wave } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'speaker',
  zh: '音箱',
  category: 'media',
  tags: ['loudspeaker', 'hifi', 'woofer', 'audio', 'sound', 'stereo', '扬声器'],
  off: true,
  // A speaker cabinet with a tweeter and a woofer; on hover both cones pump out with the beat.
  svg: (u) => {
    const body = rr(6.3, 1, 18.4, 23, KR);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
    <path data-n="tw" d="${circ(15.5, 5.6, 2.2)}" fill="#fff"/><path d="${circ(15.5, 15.8, 6)}" fill="#fff"/>
    <circle data-n="cone" cx="15.5" cy="15.8" ${SOFT}/><circle data-n="cap" cx="15.5" cy="15.8" fill="${u.pure('#5393FF')}"/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // Two beats, the first the strongest, then the cone stays pushed out a little.
    const o = clamp01(p.o), b = 0.5 * o + wave(o, (t) => (1 - t) * Math.sin(2 * Math.PI * t) ** 2);
    at(E.cone, { r: f(3.6 + 1.6 * b) }); at(E.cap, { r: f(1.6 + 1.1 * b) });
    at(E.tw, { d: circ(15.5, 5.6, 2.2 + 0.6 * wave(o, (t) => (1 - t) * Math.sin(2 * Math.PI * t) ** 2)) });
  }
});

import { defineIcon, KR, f, OL, rp, rr, at, clamp01 } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'bed',
  zh: '床',
  category: 'home',
  tags: ['sleep', 'bedroom', 'hotel', 'rest', 'night', '睡觉', '住宿'],
  variants: ['plus', 'check', 'clock'],
  // A bed seen from the side; on hover the blanket turns far down toward the foot and the
  // pillow plumps up.
  svg: (u) => {
    const frame = rp([[4, 3.6], [9, 3.6], [9, 13.6], [27, 13.6], [27, 22.8], [24.4, 22.8], [24.4, 20.4], [6.6, 20.4], [6.6, 22.8], [4, 22.8]],
      [2, 2, 0.4, KR, 0.8, 0.8, 0.6, 0.6, 0.8, 0.8]);
    const pillow = rr(10.4, 9.4, 6.4, 4.6, 2);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${frame}" fill="${u.loS}"/></g></g><path d="${frame}" ${OL}/>
      <path d="${rp([[9, 13.6], [27, 13.6], [27, 16.4], [9, 16.4]], [0, 1.4, 0, 0])}" fill="#fff"/>
      <g filter="${u.hi}"><path data-n="pl" d="${pillow}" fill="${u.upS}"/></g><path data-n="plO" d="${pillow}" ${OL}/>
      <g filter="${u.hi}"><path data-n="cover" fill="${u.upS}"/></g><path data-n="coverO" ${OL}/>`;
  },
  target: (h) => ({ x: h ? 21.4 : 14.6 }),
  draw(p, E) {
    // The pillow grows up and out from its lower edge while the blanket moves, then settles.
    const g = 0.9 * Math.sin(Math.PI * clamp01((p.x - 14.6) / 6.8));
    const pillow = rr(10.4 - g * 0.4, 9.4 - g * 1.4, 6.4 + g * 0.8, 4.6 + g * 1.4, 2);
    at(E.pl, { d: pillow }); at(E.plO, { d: pillow });
    const d = rp([[p.x, 11.6], [27, 11.6], [27, 17.8], [p.x, 17.8]], [1.8, 1.8, 0.6, 1.8]);
    at(E.cover, { d }); at(E.coverO, { d });
  }
});

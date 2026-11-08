import { defineIcon, KR, CR, f, OL, DEEP, R, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'hospital',
  zh: '医院',
  category: 'home',
  tags: ['clinic', 'medical', 'health', 'emergency', 'doctor', '诊所'],
  variants: ['check', 'search', 'clock', 'heart'],
  // A hospital with a cross sign on its front; the sign lights up on hover.
  svg: (u) => {
    const body = rr(5.2, 6.4, 20.6, 16.4, KR), sign = rr(10.4, 2, 10.2, 9.6, 2);
    const door = rp(R(12.9, 16.4, 5.2, 6.4), [CR, CR, 0, 0]);
    const cross = rr(14.2, 3.8, 2.6, 6, 0.5) + rr(12.5, 5.5, 6, 2.6, 0.5);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${rr(7.8, 14, 3, 3.4, 0.8) + rr(20.2, 14, 3, 3.4, 0.8) + door}" fill="#fff"/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${sign}" fill="${u.upS}"/></g></g>
      <path data-n="lit" d="${sign}" fill="#fff"/><path d="${sign}" ${OL}/>
      <path d="${cross}" ${DEEP}/>`;
  },
  target: (h) => ({ lit: h ? 1 : 0 }),
  draw(p, E) { at(E.lit, { opacity: f(p.lit) }); }
});

import { defineIcon, KR, CR, f, OL, ACC, DEEPS, rr, at } from '../packages/core/src/kit.js';

const SIGN = 'M11.6 14.6C12.6 10.4 14.4 9.6 14.2 12.4C14 14.8 13.4 15.6 14.8 14.4C16 13.2 16.6 11.4 17.6 12.4C18.2 13 17.8 14.6 19.2 13.6C20.2 12.9 20.8 12.4 22.6 12.6';

export default defineIcon({
  name: 'signature',
  zh: '签名',
  category: 'text',
  tags: ['signature', 'sign', 'autograph', 'e-sign', 'approve', '签字'],
  // A signature field; on hover the signature is written out to its end and the sign-here cross turns into a tick.
  svg: (u) => {
    const body = rr(4, 3.3, 23, 18.4, KR);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${rr(6.4, 5.7, 18.2, 13.6, CR)}" fill="#fff"/>
      <path data-n="x" d="M8.4 11.6L10.4 13.6M10.4 11.6L8.4 13.6" class="ln" ${DEEPS}/>
      <path d="M8.6 16.8H22.4" ${ACC}/>
      <path data-n="sig" d="${SIGN}" pathLength="10" stroke-dasharray="10" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>`;
  },
  target: (h) => ({ s: h ? 1 : 0.5 }),
  draw(p, E) {
    const s = Math.max(0, Math.min(1, p.s)), w = Math.min(1, (s - 0.5) / 0.35), t = Math.max(0, (s - 0.75) / 0.25);
    const m = (a, b) => `${f(a[0] + (b[0] - a[0]) * t)} ${f(a[1] + (b[1] - a[1]) * t)}`;
    at(E.x, { d: `M${m([8.4, 11.6], [7.6, 12.4])}L${m([10.4, 13.6], [9, 13.8])}M${m([10.4, 11.6], [11, 11.2])}L${m([8.4, 13.6], [9, 13.8])}` });
    at(E.sig, { 'stroke-dashoffset': f(10 * (1 - (0.5 + 0.5 * w))) });
  }
});

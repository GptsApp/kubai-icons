import { defineIcon, KR, CR, f, OL, DEEPS, LINE, SOFT, WHITES, R, rp, rr, ellipse, lines, clamp01, at } from '../packages/core/src/kit.js';

const X = 7, Y = 1.4, W = 17, H = 22.2;

export default defineIcon({
  name: 'passport',
  zh: '护照',
  category: 'travel',
  tags: ['id', 'identity', 'visa', 'border', 'document', '证件'],
  variants: ['check', 'x', 'clock'],
  // A passport with a globe on its cover; on hover the cover swings open on its spine,
  // showing the photo page.
  svg: (u) => {
    const back = rr(X, Y, W, H, KR);
    return `<g filter="${u.sh}"><path d="${back}" fill="${u.loS}"/></g><path d="${back}" ${OL}/>
      <path d="${rp(R(9.4, 3.6, 12.4, 17.8), [0, CR, CR, 0])}" fill="#fff"/>
      <path d="${rr(12.6, 6.2, 5.6, 6.4, 1.2)}" ${SOFT}/>
      <path d="${lines(12.6, 15.6, [7.4, 4.6])}" ${LINE}/>
      <g filter="${u.hi}"><path data-n="cv" fill="${u.loS}"/></g><path data-n="cvO" ${OL}/>
      <g data-n="em"><g filter="${u.hi}"><path data-n="gl" fill="${u.upS}"/></g><path data-n="glO" ${OL}/>
        <path data-n="mer" fill="none" stroke-width="1.6" ${DEEPS}/>
        <path data-n="ln" class="ln" ${WHITES}/></g>`;
  },
  target: (h) => ({ s: h ? 0.2 : 1 }),
  draw(p, E) {
    const s = Math.max(0.05, p.s), w = W * s, k = Math.min(KR, w / 2);
    const cv = rp(R(X, Y, w, H), [KR, k, k, KR]);
    at(E.cv, { d: cv }); at(E.cvO, { d: cv });
    const cx = X + 8.5 * s, g = ellipse(cx, 10.2, 4.6 * s, 4.6);
    at(E.gl, { d: g }); at(E.glO, { d: g });
    at(E.mer, { d: ellipse(cx, 10.2, 2 * s, 4.6) });
    at(E.ln, { d: `M${f(X + 5 * s)} 18H${f(X + 12 * s)}` });
    at(E.em, { opacity: f(clamp01((s - 0.3) / 0.4)) });
  }
});

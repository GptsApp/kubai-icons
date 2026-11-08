import { defineIcon, KR, f, OL, DEEP, DEEPS, WHITES, R, rp, rr, lines, at } from '../packages/core/src/kit.js';

const HINGE = 7.4, W = 19.6;

export default defineIcon({
  name: 'newspaper',
  zh: '报纸',
  category: 'files',
  tags: ['news', 'newspaper', 'article', 'press', 'feed', 'blog', '新闻'],
  variants: ['plus', 'check', 'x', 'alert', 'clock', 'star', 'heart', 'search', 'sync', 'sparkle'],
  // A folded newspaper; on hover its front page turns back over the fold, showing the page inside.
  svg: (u) => {
    const back = rr(4, 3.3, 23, 18.4, KR);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${back}" fill="${u.loS}"/></g></g><path d="${back}" ${OL}/>
      <path d="${lines(14.4, 9.4, [9.6, 6.8])}${lines(14.4, 15.4, [8.2])}" class="ln" ${WHITES}/>
      <g><g filter="${u.hi}"><path data-n="pf" fill="${u.upS}"/></g>
        <path data-n="shade" ${DEEP} opacity="0"/>
        <path data-n="pO" ${OL}/>
        <g data-n="print">
          <path d="${lines(10.4, 7.2, [13])}" class="ln" ${DEEPS}/>
          <path d="${rr(10.4, 10.6, 6.2, 6.6, 1)}" fill="${u.loS}"/>
          <path d="${lines(18.8, 11.8, [4.6, 3.4])}" class="ln" ${DEEPS} stroke-opacity=".55"/>
        </g></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The page narrows toward the fold like a turning leaf and darkens as it faces away.
    const o = Math.max(0, Math.min(1, p.o)), s = 1 - 0.8 * o;
    const d = rp(R(HINGE, 3.3, W * s, 18.4), [1.8, KR, KR, 1.8]);
    at(E.pf, { d }); at(E.pO, { d }); at(E.shade, { d, opacity: f(0.35 * o) });
    at(E.print, { transform: `translate(${HINGE} 0) scale(${f(Math.max(0.001, s))} 1) translate(${-HINGE} 0)`, opacity: f(Math.max(0, 1 - 1.6 * o)) });
  }
});

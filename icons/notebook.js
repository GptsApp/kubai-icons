import { defineIcon, KR, CR, f, OL, ACC, DEEP, DEEPS, R, rp, rr, lines, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'notebook',
  zh: '笔记本',
  category: 'files',
  tags: ['journal', 'diary', 'notes', 'spiral'],
  variants: ['plus', 'check', 'x', 'heart', 'star', 'lock', 'search', 'sparkle', 'clock'],
  // A spiral notebook. On hover the cover turns over on its rings and folds away behind,
  // leaving the lined first page.
  svg: (u) => {
    const back = rr(6.3, 1, 18.4, 23, KR);
    const rings = [5.5, 10.2, 14.8, 19.5].map((y) => rr(3.8, y - 1.2, 7.4, 2.4, 1.2)).join('');
    return `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${back}" fill="${u.loS}"/></g></g>
    <path d="${back}" ${OL}/>
    <path d="${rr(9.4, 3, 13.3, 19, CR)}" fill="#fff"/>
    <path d="${lines(13.4, 8.4, [7.4, 5])}" ${ACC}/>
    <g data-n="cvG"><g filter="${u.hi}"><path data-n="cv" fill="${u.upS}"/></g>
      <path data-n="shade" ${DEEP} opacity="0"/>
      <path data-n="cvO" ${OL}/>
      <g data-n="label"><path d="${lines(13.4, 7.4, [7])}" class="ln" ${DEEPS} stroke-opacity=".55"/></g></g>
    <path d="${rings}" ${DEEP}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The cover's width shrinks to its hinge on the rings, darkening as it faces away; at
    // the end it has gone round behind the back.
    const o = Math.max(0, Math.min(1, p.o));
    const s = Math.cos(o * Math.PI / 2), w = 15.3 * s;
    const d = rp(R(9.4, 1, w, 23), [1.6, KR, KR, 1.6]);
    at(E.cv, { d }); at(E.cvO, { d }); at(E.shade, { d, opacity: f(0.4 * Math.sin(o * Math.PI / 2)) });
    at(E.label, { transform: `translate(9.4 0) scale(${f(Math.max(0.001, s))} 1) translate(-9.4 0)` });
    at(E.cvG, { opacity: o > 0.985 ? 0 : 1 });
  }
});

import { defineIcon, KR, f, OL, ACC, DEEP, rp, at, clamp01 } from '../packages/core/src/kit.js';

const COVER = rp([[4, 3.6], [27, 3.6], [27, 21.2], [15.5, 22.8], [4, 21.2]], [KR, KR, KR, 1.2, KR]);
const LEFT = 'M15.5 7C12.8 5.6 9.4 5.2 6.2 5.6V19.2C9.4 18.8 12.8 19.4 15.5 20.6Z';
const RIGHT = 'M15.5 7C18.2 5.6 21.6 5.2 24.8 5.6V19.2C21.6 18.8 18.2 19.4 15.5 20.6Z';
const LINES_R = 'M17.8 10.6H23M17.8 13.6H21.4', LINES_L = 'M13.2 10.6H8M13.2 13.6H9.6';

export default defineIcon({
  name: 'book-open',
  zh: '打开的书',
  category: 'education',
  tags: ['read', 'reading', 'library', 'study', 'docs', '阅读'],
  variants: ['check', 'star', 'plus', 'clock'],
  // An open book; on hover the right page turns over onto the left.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${COVER}" fill="${u.loS}"/></g></g><path d="${COVER}" ${OL}/>
    <path d="${LEFT}" fill="#fff"/><path d="${LINES_L}" ${ACC}/>
    <path d="${RIGHT}" fill="#fff"/><path d="${LINES_R}" ${ACC}/>
    <g data-n="pg"><path d="${RIGHT}" fill="#fff"/><path d="${LINES_R}" ${ACC}/><path data-n="sh" d="${RIGHT}" ${DEEP} opacity="0"/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The page swings about the spine: it narrows, darkens edge-on, then lies mirrored on the left.
    const o = clamp01(p.o), s = Math.cos(o * Math.PI);
    at(E.pg, { transform: `translate(15.5 0) scale(${f(Math.abs(s) < 0.001 ? 0.001 : s)} 1) translate(-15.5 0)` });
    at(E.sh, { opacity: f(0.4 * Math.sin(o * Math.PI)) });
  }
});

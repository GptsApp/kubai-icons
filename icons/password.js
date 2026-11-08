import { defineIcon, KR, CR, f, OL, DEEP, DEEPS, rr, at, clamp01 } from '../packages/core/src/kit.js';

const FRAME = rr(4, 6.2, 23, 12.6, KR);

export default defineIcon({
  name: 'password',
  zh: '密码',
  category: 'security',
  tags: ['password field', 'pin', 'secret', 'login', 'credentials', '口令'],
  variants: ['check', 'x', 'lock'],
  // A password field with three masked characters; on hover a fourth is typed and the
  // caret steps on.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${FRAME}" fill="${u.loS}"/></g></g>
    <path d="${FRAME}" ${OL}/>
    <path d="${rr(6.2, 8.4, 18.6, 8.2, CR)}" fill="#fff"/>
    <g ${DEEP}><circle cx="9.3" cy="12.5" r="1.4"/><circle cx="12.9" cy="12.5" r="1.4"/><circle cx="16.5" cy="12.5" r="1.4"/>
      <circle data-n="d4" cx="20.1" cy="12.5"/></g>
    <path data-n="car" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ x: h ? 22.9 : 19.3 }),
  draw(p, E) {
    // The caret steps on first; the new dot then swells past its size behind it and settles.
    const q = clamp01((p.x - 19.3) / 3.6), s = clamp01((q - 0.3) / 0.7);
    at(E.d4, { r: f(1.4 * s + Math.sin(Math.PI * s)) });
    at(E.car, { d: `M${f(19.3 + 3.6 * Math.min(1, q / 0.45))} 10.2V14.8` });
  }
});

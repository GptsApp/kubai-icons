import { defineIcon, KR, CR, f, DEEP, DEEPS, R, rp, rr, at, clamp01, bump } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

export default defineIcon({
  name: 'camcorder',
  zh: '摄像机',
  category: 'media',
  tags: ['video camera', 'handycam', 'record', 'footage', 'filming', 'retro', '录像机', 'DV'],
  variants: ['x', 'lock', 'clock'],
  off: true,
  // A handheld video camera with a top handle, an eyepiece, a flared lens and a screen showing
  // the record dot; on hover the lens zooms out and the dot pulses.
  svg: (u) => `<path d="M9.4 8.4V6Q9.4 3.8 11.6 3.8H16Q18.2 3.8 18.2 6V8.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      ${front(u, rr(3, 9.6, 5, 5.6, 1.6), u.upS)}
      ${back(u, '', u.loS, 'br')}
      ${front(u, '', u.upS, 'hd')}
      ${back(u, rr(5.6, 7.6, 15.6, 14.2, KR))}
      <path d="${rr(7.6, 9.8, 11.6, 9.8, CR)}" fill="#fff"/>
      <circle data-n="dot" cx="13.4" cy="14.7" ${DEEP}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), x = 1.7 * o;
    const br = rp(R(20, 11.2, 4 + x, 7), 0);
    const hd = rp([[23 + x, 11.6], [26.6 + x, 8.8], [26.6 + x, 20.6], [23 + x, 17.8]], [0.6, 1.4, 1.4, 0.6]);
    at(E.br, { d: br }); at(E.brO, { d: br });
    at(E.hd, { d: hd }); at(E.hdO, { d: hd });
    at(E.dot, { r: f(2.4 + 1 * bump(o)) });
  }
});

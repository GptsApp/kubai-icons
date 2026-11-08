import { defineIcon, f, DEEP, R, rp, rr, circ, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

const C = [14.2, 11.8], BODY = 10.6;
const HOLES = [0, 1, 2, 3, 4].map((i) => {
  const a = i * 72 * Math.PI / 180;
  return circ(6.1 * Math.sin(a), -6.1 * Math.cos(a), 2.5);
}).join('');

export default defineIcon({
  name: 'film-reel',
  zh: '电影胶卷盘',
  category: 'media',
  tags: ['reel', 'movie', 'cinema', 'spool', 'projection', 'footage', '胶卷', '电影'],
  variants: ['plus', 'check', 'star'],
  // A film reel with five round windows and a tail of film; on hover the reel turns and the
  // tail runs out.
  svg: (u) => `${front(u, '', u.upS, 'tail')}
      <path data-n="hl" ${DEEP}/>
      ${back(u, circ(C[0], C[1], BODY))}
      <g data-n="spin"><path d="${HOLES}" fill="#fff"/></g>
      <circle cx="${C[0]}" cy="${C[1]}" r="1.7" ${DEEP}/>`,
  target: (h) => ({ rot: h ? 144 : 0, w: h ? 2.6 : 0 }),
  draw(p, E) {
    const d = rp(R(14, 18.6, 12.8 + p.w, 5.2), [0, 1.4, 1.4, 0]);
    at(E.tail, { d }); at(E.tailO, { d });
    at(E.hl, { d: rr(22 + p.w, 20, 2.4, 2.4, 0.6) });
    at(E.spin, { transform: `translate(${C[0]} ${C[1]}) rotate(${f(p.rot)})` });
  }
});

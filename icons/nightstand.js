import { defineIcon, KR, f, OL, DEEP, DEEPS, rp, rr, circ, at } from '../packages/core/src/kit.js';
import { back, front, liveFront, setPath } from './_b1-home.js';

export default defineIcon({
  name: 'nightstand',
  zh: '床头柜',
  category: 'home',
  tags: ['bedside table', 'night table', 'drawer', 'bedroom', 'furniture', '边柜', '家具'],
  // A bedside table with a lamp on top; its drawer slides out and the lamp lights on hover.
  svg: (u) => {
    const shade = rp([[12, 0.8], [19, 0.8], [21.6, 7], [9.4, 7]], [1.2, 1.2, 1.4, 1.4]);
    return `<path d="M15.5 6.8V10.6" fill="none" stroke-width="2.4" ${DEEPS}/>
      <path d="${rr(8, 19, 3.2, 5.8, 0.8) + rr(19.8, 19, 3.2, 5.8, 0.8)}" ${DEEP}/>
      ${back(u, rr(5.6, 10.4, 19.8, 11.2, KR))}
      ${liveFront(u, 'dr')}<path data-n="kn" ${DEEP}/>
      ${front(u, shade)}<path data-n="glow" d="${shade}" fill="#fff" opacity="0"/><path d="${shade}" ${OL}/>`;
  },
  target: (h) => ({ s: h ? 1 : 0, g: h ? 0.9 : 0 }),
  draw(p, E) {
    const g = p.s * 1.3;
    setPath(E, 'dr', rr(8.6 - g, 13.4 + g * 0.2, 13.8 + g * 2, 5.2 + g, 1.8));
    at(E.kn, { d: circ(15.5, 16 + g * 0.7, 1.5 + g * 0.2) });
    at(E.glow, { opacity: f(p.g) });
  }
});

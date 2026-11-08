import { defineIcon, DEEP, rp, rr, at, bump, scaleAt, clamp01 } from '../packages/core/src/kit.js';
import { back, front } from './_b1-home.js';

export default defineIcon({
  name: 'stool',
  zh: '凳子',
  category: 'home',
  tags: ['seat', 'bar stool', 'furniture', 'kitchen', 'sit', '板凳', '吧凳', '家具'],
  // A wooden stool; it gives under a sitter's weight on hover and springs back.
  svg: (u) => {
    const a = rp([[8.8, 5], [12.2, 5], [9.6, 24], [6.2, 24]], [0, 0, 1.2, 1.2]), b = rp([[18.8, 5], [22.2, 5], [24.8, 24], [21.4, 24]], [0, 0, 1.2, 1.2]);
    return `<g data-n="g">
      <path d="${rr(10, 13.8, 11, 2.6, 0.6)}" ${DEEP}/>
      ${back(u, a)}${back(u, b)}
      ${front(u, rr(5.6, 1, 19.8, 5.4, 2.6))}
    </g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const b = bump(clamp01(p.o));
    at(E.g, { transform: scaleAt(1 + 0.05 * b, 15.5, 24, 1 - 0.14 * b) });
  }
});

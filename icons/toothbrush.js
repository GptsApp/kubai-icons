import { defineIcon, f, R, rp, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { back, front, place } from './_b1-home.js';

const DEG = -35, CX = 15.5, CY = 13.4;
const handle = [[-13.7, 0.8], [3, 1], [5.6, 0], [13.7, 0], [13.7, 4.4], [5.6, 4.4], [3, 3.6], [-13.7, 4.6]];
const TUFTS = [3, 6.3, 9.6];
const on = (pts) => place(pts, DEG, CX, CY);

export default defineIcon({
  name: 'toothbrush',
  zh: '牙刷',
  category: 'home',
  tags: ['teeth', 'dental', 'brush', 'hygiene', 'bathroom', 'morning', '刷牙', '洗漱', '口腔'],
  // A toothbrush held at an angle; it scrubs back and forth along its length on hover.
  svg: (u) => `<g data-n="g">
      ${TUFTS.map((x) => front(u, rp(on(R(x, -5.8, 3.3, 7)), [1.3, 1.3, 0, 0]))).join('')}
      ${back(u, rp(on(handle), [2, 0.5, 0.5, 2, 2, 0.5, 0.5, 2]))}
    </g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const t = rattle(clamp01(p.o), 4.4, 3), a = DEG * Math.PI / 180;
    at(E.g, { transform: `translate(${f(t * Math.cos(a))} ${f(t * Math.sin(a))})` });
  }
});

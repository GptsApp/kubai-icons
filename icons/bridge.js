import { defineIcon, f, rp, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

const TOWER = (x) => rp([[x, 22.6], [x, 5.4], [x + 2.4, 2], [x + 4.8, 5.4], [x + 4.8, 22.6]], [0.6, 0.4, 1, 0.4, 0.6]);
const LEAF_L = rp([[10.2, 13.6], [15.5, 13.6], [15.5, 16.4], [10.2, 16.4]], [0, 0.4, 0.4, 0]);
const LEAF_R = rp([[15.5, 13.6], [20.8, 13.6], [20.8, 16.4], [15.5, 16.4]], [0.4, 0, 0, 0.4]);

export default defineIcon({
  name: 'bridge',
  zh: '桥',
  category: 'travel',
  tags: ['bridge', 'drawbridge', 'river', 'crossing', 'landmark', 'city', '桥梁'],
  // A drawbridge between two towers joined by a high walkway; on hover its two leaves rise.
  svg: (u) => `<g data-n="l">${front(u, LEAF_L, u.upS)}</g><g data-n="r">${front(u, LEAF_R, u.upS)}</g>
    ${back(u, TOWER(5.4) + TOWER(20.8), u.loS)}
    ${front(u, rr(10.2, 6.2, 10.6, 2.4, 0.4), u.upS)}
    ${front(u, rr(3.4, 13.6, 6.8, 2.8, 1.4) + rr(20.8, 13.6, 6.8, 2.8, 1.4), u.upS)}`,
  target: (h) => ({ a: h ? 34 : 0 }),
  draw(p, E) {
    at(E.l, { transform: `rotate(${f(-p.a)} 10.2 16.4)` });
    at(E.r, { transform: `rotate(${f(p.a)} 20.8 16.4)` });
  }
});

import { defineIcon, f, rp, R, at, WHITE } from '../packages/core/src/kit.js';
import { solid } from './_w2-dev.js';

const L = [[9, 1.2], [13.4, 1.2], [15.5, 9.6], [15.5, 24], [5.6, 24], [5.6, 11.4], [9, 7.4]];
const RAD = [1.2, 1.2, 0, 0, 2.2, 1.6, 1.8];
const LEFT = rp(L, RAD), RIGHT = rp(L.map(([x, y]) => [31 - x, y]).reverse(), [...RAD].reverse());
const BACK = rp(R(10.6, 3.2, 9.8, 12), [1.6, 1.6, 0, 0]);
const stripes = (x) => `<path d="M${x} 13.2h9.9v3h-9.9zM${x} 18.6h9.9v3h-9.9z" ${WHITE}/>`;

export default defineIcon({
  name: 'safety-vest',
  zh: '反光背心',
  category: 'tools',
  tags: ['hi-vis', 'high visibility', 'reflective', 'construction', 'worker', '工作服', '马甲'],
  // A reflective site vest; on hover its two front panels swing open.
  svg: (u) => `${solid(u, BACK, u.upS, { sh: false })}
    <g data-n="l">${solid(u, LEFT, u.loS)}${stripes(5.6)}</g>
    <g data-n="r">${solid(u, RIGHT, u.loS)}${stripes(15.5)}</g>`,
  target: (h) => ({ x: h ? 2.6 : 0 }),
  draw(p, E) {
    at(E.l, { transform: `translate(${f(-p.x)} 0)` });
    at(E.r, { transform: `translate(${f(p.x)} 0)` });
  }
});

import { defineIcon, f, rp } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

const D = 4.3, GEM = rp([[0, -D], [D, 0], [0, D], [-D, 0]], 1);
const AT = [[0, -1], [1, 0], [0, 1], [-1, 0]];

export default defineIcon({
  name: 'component',
  zh: '组件',
  category: 'development',
  tags: ['component', 'design system', 'symbol', 'instance', 'reusable', '元件'],
  variants: ['plus', 'check', 'x'],
  // Four diamonds set in a diamond; on hover they draw apart from the centre.
  svg: (u) => AT.map((_, i) => rig(u, 'g' + i, [{ d: GEM, fill: i % 2 ? u.upS : u.loS }])).join(''),
  target: (h) => ({ r: h ? 7.8 : 7.2 }),
  draw(p, E) {
    AT.forEach(([x, y], i) => pose(E, 'g' + i, 1, `translate(${f(15.5 + x * p.r)} ${f(12.5 + y * p.r)})`));
  }
});

import { defineIcon, f, rattle, clamp01 } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

// Two jigsaw pieces: the left one's tab sits in the right one's socket, and the right
// piece carries a tab on its top.
const K = 2.5, H = Math.sqrt(K * K - 1.6 * 1.6);
const A = `M6.2 6H14.5V${f(12.5 - H)}A${K} ${K} 0 1 1 14.5 ${f(12.5 + H)}V21H6.2Q4 21 4 18.8V8.2Q4 6 6.2 6Z`;
const B = `M14.5 6H${f(20.8 - H)}A${K} ${K} 0 1 1 ${f(20.8 + H)} 6H24.8Q27 6 27 8.2V18.8Q27 21 24.8 21H14.5V${f(12.5 + H)}A${K} ${K} 0 1 0 14.5 ${f(12.5 - H)}Z`;

export default defineIcon({
  name: 'puzzle',
  zh: '拼图',
  category: 'development',
  tags: ['plugin', 'extension', 'addon', 'module', 'jigsaw', '插件', '扩展'],
  variants: ['plus', 'minus', 'check', 'x', 'search', 'cog'],
  // Two fitted jigsaw pieces; on hover the right one is pressed home with a small wobble.
  svg: (u) => rig(u, 'a', [{ d: A, fill: u.loS }]) + rig(u, 'b', [{ d: B, fill: u.upS }]),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    pose(E, 'a', 1, `translate(0 ${f(rattle(o, -0.8, 2))})`);
    pose(E, 'b', 1, `rotate(${f(rattle(o, 7, 2))} 14.5 21) translate(0 ${f(rattle(o, -1.4, 1))})`);
  }
});

import { defineIcon, f, at, clamp01, rattle } from '../packages/core/src/kit.js';
import { DISC, back, MARK } from './_interface.js';

export default defineIcon({
  name: 'circle-x',
  zh: '关闭',
  category: 'interface',
  tags: ['close', 'cancel', 'clear', 'dismiss', 'error', '取消'],
  // A round close button whose cross shakes side to side and tightens on hover.
  svg: (u) => `${back(u, DISC)}<path data-n="m" ${MARK}/>`,
  target: (h) => ({ a: h ? 3.2 : 3.7, o: h ? 1 : 0 }),
  draw(p, E) {
    // Arm ends at 45 degrees plus the shake; at rest this is the plain diagonal cross.
    const t = rattle(clamp01(p.o), 20, 3) * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
    const x = p.a * (c - s), y = p.a * (c + s);
    at(E.m, { d: `M${f(15.5 - x)} ${f(12.5 - y)}L${f(15.5 + x)} ${f(12.5 + y)}M${f(15.5 + y)} ${f(12.5 - x)}L${f(15.5 - y)} ${f(12.5 + x)}` });
  }
});

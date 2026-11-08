import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { DISC, back, MARK } from './_interface.js';

export default defineIcon({
  name: 'circle-minus',
  zh: '移除',
  category: 'interface',
  tags: ['remove', 'subtract', 'minus', 'delete', '减少'],
  // A round remove button whose bar spins half a turn and draws in from both ends on hover.
  svg: (u) => `${back(u, DISC)}<path data-n="m" ${MARK}/>`,
  target: (h) => ({ a: h ? 3.8 : 5.2, r: h ? 180 : 0 }),
  draw(p, E) {
    // Kept in the plain H form when level.
    if (!p.r) return at(E.m, { d: `M${f(15.5 - p.a)} 12.5H${f(15.5 + p.a)}` });
    const t = p.r * Math.PI / 180, x = p.a * Math.cos(t), y = p.a * Math.sin(t);
    at(E.m, { d: `M${f(15.5 - x)} ${f(12.5 - y)}L${f(15.5 + x)} ${f(12.5 + y)}` });
  }
});

import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { TILE, back, MARK } from './_interface.js';

export default defineIcon({
  name: 'menu',
  zh: '菜单',
  category: 'interface',
  tags: ['hamburger', 'navigation', 'bars', 'drawer', '导航'],
  // A menu button with three bars; on hover the outer bars fold into a cross as the
  // middle one draws away, the button turning into its own close.
  svg: (u) => `${back(u, TILE)}<path data-n="t" ${MARK}/><path data-n="m" ${MARK}/><path data-n="b" ${MARK}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o)), half = 5.2, mid = half * (1 - o);
    const bar = (dy, a) => {
      const r = a * Math.PI / 180, cx = 15.5, cy = 12.5 + dy, dx = Math.cos(r) * half, dyy = Math.sin(r) * half;
      return `M${f(cx - dx)} ${f(cy - dyy)}L${f(cx + dx)} ${f(cy + dyy)}`;
    };
    at(E.t, { d: bar(-4.8 * (1 - o), 45 * o) });
    at(E.b, { d: bar(4.8 * (1 - o), -45 * o) });
    at(E.m, { d: `M${f(15.5 - mid)} 12.5H${f(15.5 + mid)}`, opacity: o > 0.98 ? 0 : 1 });
  }
});

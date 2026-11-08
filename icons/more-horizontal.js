import { defineIcon, f, rr, at } from '../packages/core/src/kit.js';
import { back, stagger } from './_interface.js';

export default defineIcon({
  name: 'more-horizontal',
  zh: '更多',
  category: 'interface',
  tags: ['more', 'ellipsis', 'dots', 'options', 'overflow', '省略号'],
  // A pill-shaped "more" button; on hover its three dots hop one after another.
  svg: (u) => `${back(u, rr(4, 6.5, 23, 12, 6))}
    ${[0, 1, 2].map((i) => `<circle data-n="d${i}" cx="${9.8 + 5.7 * i}" r="2" fill="#fff" data-w="fill"/>`).join('')}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    for (let i = 0; i < 3; i++) at(E['d' + i], { cy: f(12.5 - 3 * Math.sin(Math.PI * stagger(p.o, i, 3, 0.7))) });
  }
});

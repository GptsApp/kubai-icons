import { defineIcon, f, rr, at } from '../packages/core/src/kit.js';
import { back, stagger } from './_interface.js';

export default defineIcon({
  name: 'more-vertical',
  zh: '更多操作',
  category: 'interface',
  tags: ['more', 'ellipsis', 'dots', 'kebab', 'options', 'overflow', '省略号'],
  // An upright "more" button; on hover its three dots nudge sideways one after another.
  svg: (u) => `${back(u, rr(9.5, 1, 12, 23, 6))}
    ${[0, 1, 2].map((i) => `<circle data-n="d${i}" cy="${6.8 + 5.7 * i}" r="2" fill="#fff" data-w="fill"/>`).join('')}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    for (let i = 0; i < 3; i++) at(E['d' + i], { cx: f(15.5 + 3 * Math.sin(Math.PI * stagger(p.o, i, 3, 0.7))) });
  }
});

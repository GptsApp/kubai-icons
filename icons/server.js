import { defineIcon, f, WHITE, WHITES, rr, circ, at } from '../packages/core/src/kit.js';
import { solid, span } from './_devices.js';

const Y = [1.3, 8.9, 16.5];

export default defineIcon({
  name: 'server',
  zh: '服务器',
  category: 'devices',
  tags: ['rack', 'hosting', 'database', 'backend', 'cloud', '机房'],
  variants: ['plus', 'minus', 'check', 'x', 'alert', 'info', 'up', 'down', 'sync', 'lock', 'search', 'cog', 'clock', 'bolt'],
  // Three stacked rack units, each with a status light and a load meter; on hover the meters fill
  // up one unit after another.
  svg: (u) => Y.map((y, i) => `${solid(u, rr(5.2, y, 20.6, 6.6, 1.8), u.loS)}
      <path d="${circ(9, y + 3.3, 1.3)}" ${WHITE}/>
      <path data-n="m${i}" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/>`).join(''),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    Y.forEach((y, i) => {
      const w = 3.6 + 6.4 * span(p.o, i * 0.2, i * 0.2 + 0.5);
      at(E['m' + i], { d: `M12.4 ${f(y + 3.3)}H${f(12.4 + w)}` });
    });
  }
});

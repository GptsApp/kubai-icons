import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { node, move, MARK } from './_w2-dev.js';

const HUB = [15.5, 12];
const OUT = [[7, 5.2], [24, 5.2], [15.5, 21.2]];

export default defineIcon({
  name: 'network',
  zh: '网络',
  category: 'development',
  tags: ['network', 'graph', 'nodes', 'connections', 'topology', 'hub', '节点', '拓扑'],
  variants: ['plus', 'check', 'x', 'cog', 'search'],
  badgeAt: [24.2, 19.6],
  // A hub node linked to three others; on hover the outer nodes reach further out.
  svg: (u) => `<path data-n="ln" ${MARK}/>${OUT.map((_, i) => node(u, 'n' + i, 3, u.loS)).join('')}${node(u, 'h', 4, u.upS)}`,
  target: (h) => ({ s: h ? 1 : 0 }),
  draw(p, E) {
    let d = '';
    OUT.forEach(([x, y], i) => {
      const dx = x - HUB[0], dy = y - HUB[1], l = Math.hypot(dx, dy);
      const q = [x + dx / l * p.s, y + dy / l * p.s];
      move(E, 'n' + i, q[0], q[1]);
      d += `M${HUB[0]} ${HUB[1]}L${f(q[0])} ${f(q[1])}`;
    });
    move(E, 'h', HUB[0], HUB[1]);
    at(E.ln, { d });
  }
});

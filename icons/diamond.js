import { defineIcon, f, rp, at } from '../packages/core/src/kit.js';
import { turning } from './_science-edu-sports.js';

const gem = (w, h, r) => rp([[0, -h], [w, 0], [0, h], [-w, 0]], r);

export default defineIcon({
  name: 'diamond',
  zh: '菱形',
  category: 'shapes',
  tags: ['rhombus', 'shape', 'gem', '菱形'],
  // A rhombus with a lighter rhombus inset; on hover it turns over about its upright axis.
  svg: (u) => turning(u, gem(10, 11.8, 2.4), gem(4.6, 5.4, 1.2)),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const s = Math.cos(Math.max(0, Math.min(1, p.o)) * Math.PI);
    const t = `translate(15.5 12.5) scale(${f(Math.abs(s) < 0.001 ? 0.001 : s)} 1)`;
    ['o', 'oO', 'i', 'iO'].forEach((n) => at(E[n], { transform: t }));
  }
});

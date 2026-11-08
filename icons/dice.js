import { defineIcon, f, DEEP, rr, rattle, at, clamp01, bump } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

// Pip spots by position (row-major on a 3×3 grid) and the spots each face shows.
const PIPS = [[-4.4, -4.4], [4.4, -4.4], [-4.4, 0], [0, 0], [4.4, 0], [-4.4, 4.4], [4.4, 4.4]];
const FACES = { 5: [0, 1, 3, 5, 6], 2: [0, 6], 6: [0, 1, 2, 4, 5, 6] };

export default defineIcon({
  name: 'dice',
  zh: '骰子',
  category: 'sports',
  tags: ['die', 'game', 'random', 'roll', 'board game', 'luck', '桌游'],
  // A die showing five; on hover it is rolled, tumbles and settles on six.
  svg: (u) => `${layer(u, 'b', rr(-10.3, -10.3, 20.6, 20.6, 3.4), u.loS)}
    ${layer(u, 'f', rr(-8.1, -8.1, 16.2, 16.2, 2), u.upS, { sh: false, extra: PIPS.map((q, i) => `<circle data-n="p${i}" cx="${q[0]}" cy="${q[1]}" r="1.7" ${DEEP}/>`).join('') })}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), face = o < 0.34 ? 5 : o < 0.67 ? 2 : 6;
    const t = `translate(15.5 ${f(12.5 - 2 * bump(o))}) rotate(${f(90 * o + rattle(o, 14, 2))})`;
    moveAll(E, ['b', 'f'], t);
    PIPS.forEach((_, i) => at(E[`p${i}`], { opacity: FACES[face].includes(i) ? 1 : 0 }));
  }
});

import { defineIcon, f, rr, rattle, clamp01 } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

const BAR = rr(10.8, 11.1, 9.4, 2.8, 0.6);
const OUTER = rr(3.8, 7.4, 4, 10.2, 1.6) + rr(23.2, 7.4, 4, 10.2, 1.6);
const INNER = rr(7, 4.4, 4.4, 16.2, 1.8) + rr(19.6, 4.4, 4.4, 16.2, 1.8);
const NAMES = ['b', 'o', 'i'];

export default defineIcon({
  name: 'dumbbell',
  zh: '哑铃',
  category: 'sports',
  tags: ['gym', 'fitness', 'workout', 'weight', 'exercise', '健身', '举重'],
  // A dumbbell; on hover it is lifted and tilts, wobbling a little before it holds still.
  svg: (u) => `${layer(u, 'b', BAR, u.upS)}${layer(u, 'o', OUTER, u.loS)}${layer(u, 'i', INNER, u.loS)}`,
  target: (h) => ({ y: h ? -1.4 : 0, a: h ? -10 : 0, o: h ? 1 : 0 }),
  draw(p, E) { moveAll(E, NAMES, `translate(0 ${f(p.y)}) rotate(${f(p.a + rattle(clamp01(p.o), 5, 2))} 15.5 12.5)`); }
});

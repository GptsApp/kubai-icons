import { defineIcon, f, rp, clamp01 } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

// A shuttlecock standing on its cork, drawn upright and turned 28° to the right.
const SKIRT = rp([[8, 1.8], [23, 1.8], [19.4, 15.4], [11.6, 15.4]], [1.4, 1.4, 0.4, 0.4]);
const CORK = 'M11.4 15.2H19.6V17A4.1 4.1 0 0 1 11.4 17Z';
const LINES = 'M13.6 14.6L12.2 3.8M17.4 14.6L18.8 3.8M10.2 9.2H20.8';

export default defineIcon({
  name: 'badminton',
  zh: '羽毛球',
  category: 'sports',
  tags: ['badminton', 'shuttlecock', 'shuttle', 'birdie', 'racket sport', 'sport', '羽球'],
  // A shuttlecock; on hover it is struck and flies up, turning nose-first.
  svg: (u) => `${layer(u, 's', SKIRT, u.loS, { extra: `<path d="${LINES}" fill="none" class="ln" stroke-linecap="round" stroke="#fff" data-w="stroke"/>` })}
    ${layer(u, 'c', CORK, u.upS)}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    moveAll(E, ['s', 'c'], `translate(${f(-0.6 + 1.2 * o)} ${f(0.4 - 1.6 * o)}) rotate(${f(30 + 14 * o)} 15.5 12.4)`);
  }
});

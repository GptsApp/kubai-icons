import { defineIcon, f, SOFTS, ellipse, clamp01 } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

const RIM = 'M4 12V14A11.5 5.8 0 0 0 27 14V12Z';

export default defineIcon({
  name: 'frisbee',
  zh: '飞盘',
  category: 'sports',
  tags: ['flying disc', 'frisbee', 'ultimate', 'throw', 'outdoor', 'play', '飞碟'],
  // A flying disc seen at an angle; on hover it is thrown, lifting and tilting as it flies.
  svg: (u) => `${layer(u, 'w', RIM, u.loS)}${layer(u, 't', ellipse(15.5, 12, 11.5, 5.8), u.upS, { sh: false, extra: `<path d="${ellipse(15.5, 12, 6.8, 3)}" fill="none" class="ln" ${SOFTS}/>` })}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    moveAll(E, ['w', 't'], `translate(${f(1 * o)} ${f(-2 * o)}) rotate(${f(-10 * o)} 15.5 13)`);
  }
});

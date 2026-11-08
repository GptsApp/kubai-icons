import { defineIcon, f, DEEP, DEEPS, circ } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

const PIN = 'M20.6 1.4C22.4 1.4 23.4 2.8 23.4 4.6C23.4 6.4 22.4 7.4 22.4 8.8C22.4 10.6 25.2 13 25.2 17C25.2 19.8 24.4 21.8 23.6 23.4H17.6C16.8 21.8 16 19.8 16 17C16 13 18.8 10.6 18.8 8.8C18.8 7.4 17.8 6.4 17.8 4.6C17.8 2.8 18.8 1.4 20.6 1.4Z';
const HOLES = [[-1.8, -3], [1.4, -3.2], [-0.2, -0.4]];

export default defineIcon({
  name: 'bowling',
  zh: '保龄球',
  category: 'sports',
  tags: ['bowling', 'pin', 'ball', 'strike', 'game'],
  // A bowling ball in front of a pin; on hover the ball rolls into it and the pin tips over.
  svg: (u) => `${layer(u, 'p', PIN, u.upS, { extra: `<path d="M19 8.6H22.2" class="ln" ${DEEPS}/>` })}
    ${layer(u, 'b', circ(0, 0, 7), u.loS, { extra: HOLES.map((q) => `<circle cx="${q[0]}" cy="${q[1]}" r="1.25" ${DEEP}/>`).join('') })}`,
  target: (h) => ({ x: h ? 1.4 : 0, a: h ? 70 : 0, pin: h ? 16 : 0 }),
  draw(p, E) {
    moveAll(E, ['p'], `rotate(${f(p.pin)} 23.6 23.4)`);
    moveAll(E, ['b'], `translate(${f(10.4 + p.x)} 16.4) rotate(${f(p.a)})`);
  }
});

import { defineIcon, f, rp, circ, clamp01, bump } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

const HEAD = circ(13.4, 9.6, 7.6);
const GRIP = rp([[10.8, 14.6], [16, 14.6], [15, 23.2], [11.8, 23.2]], [0.6, 0.6, 1.6, 1.6]);

export default defineIcon({
  name: 'ping-pong',
  zh: '乒乓球',
  category: 'sports',
  tags: ['table tennis', 'ping pong', 'paddle', 'bat', 'racket', 'sport', '乒乓'],
  // A table-tennis bat and ball; on hover the bat swings at the ball and sends it flying.
  svg: (u) => `${layer(u, 'g', GRIP, u.upS)}${layer(u, 'h', HEAD, u.loS)}
    ${layer(u, 'b', circ(0, 0, 2.4), u.upS)}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), up = bump(o);
    moveAll(E, ['h', 'g'], `rotate(${f(8 * up)} 13.4 23.2)`);
    moveAll(E, ['b'], `translate(${f(25.4 + 0.8 * o)} ${f(4.4 - 1.8 * o)})`);
  }
});

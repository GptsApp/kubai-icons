import { defineIcon, f, circ, rr, at, clamp01 } from '../packages/core/src/kit.js';
import { reveal } from './_home-food.js';
import { solid, light } from './_b2-kitchen.js';

const BODY = 'M13.7 7.8C18.4 7.8 20.8 11 20.8 15C20.8 18.4 19.2 21 17.6 22.6H9.8C8.2 21 6.6 18.4 6.6 15C6.6 11 9 7.8 13.7 7.8Z';
const SPOUT = 'M9 12.4C7.6 11.6 6.6 8.6 5.2 7.4H3.2Q2.4 7.4 2.6 8.2C3.6 12.8 5.4 18 9 19.6Z';
const LID = 'M8.6 10.6C9.6 7.6 11.4 6 13.7 6C16 6 17.8 7.6 18.8 10.6Q19.1 11.6 18 11.6H9.4Q8.3 11.6 8.6 10.6Z';

export default defineIcon({
  name: 'teapot',
  zh: '茶壶',
  category: 'food',
  tags: ['tea', 'pot', 'pour', 'drink', 'brew', 'afternoon tea', '泡茶', '茶'],
  variants: [],
  // A round teapot with a side handle; on hover it tips forward and pours from its spout.
  svg: (u) => {
    const handle = rr(17.6, 9.6, 10.6, 10.4, 4) + rr(20.2, 12.2, 5.6, 5.2, 1.8);
    return `<path data-n="st" d="M3.2 9.8C2.6 12.6 2.8 17 2.8 22.4" pathLength="1" fill="none" stroke-width="2.2" stroke-linecap="round" data-t="stroke:#5393FF"/>
      <g data-n="g">${solid(u, handle, 'fill-rule="evenodd"')}${solid(u, SPOUT)}${solid(u, BODY)}${light(u, circ(13.7, 3.9, 2.1))}${light(u, LID)}</g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.g, { transform: `translate(${f(o)} 0) rotate(${f(-12 * o)} 13.7 16)` });
    at(E.st, reveal(clamp01((o - 0.3) / 0.7)));
  }
});

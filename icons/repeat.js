import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { button, tri } from './_media.js';

// The upper half of the loop: up the left side, along the top and into a head. The lower
// half is the same piece turned half a revolution.
const HALF = `M9 12.4V10.2Q9 7.6 11.6 7.6H20.4`;
const HEAD = tri(19.8, 23.2, 7.6, 2.6);

export default defineIcon({
  name: 'repeat',
  zh: '循环播放',
  category: 'media',
  tags: ['loop', 'repeat all', 'again', 'cycle', '重复'],
  // A looping pair of arrows that run half a lap round the button on hover.
  svg: (u) => {
    const half = `<path d="${HALF}" fill="none" stroke-width="2.2" stroke-linecap="round" stroke="#fff" data-w="stroke"/><path d="${HEAD}" fill="#fff" data-w="fill"/>`;
    return `${button(u)}
    <g data-n="loop">${half}<g transform="rotate(180 15.5 12.5)">${half}</g></g>`;
  },
  target: (h) => ({ rot: h ? 180 : 0 }),
  draw(p, E) { at(E.loop, { transform: `rotate(${f(p.rot)} 15.5 12.5)` }); }
});

import { defineIcon, rr, at } from '../packages/core/src/kit.js';
import { button, tri, tr } from './_media.js';

export default defineIcon({
  name: 'skip-back',
  zh: '上一首',
  category: 'media',
  tags: ['previous', 'track', 'skip', 'back', '上一个'],
  // A previous-track button: the bar and triangle step back on hover.
  svg: (u) => `${button(u)}
    <g data-n="m"><path d="${rr(8.8, 7.3, 2.8, 10.4, 1)}" fill="#fff" data-w="fill"/>
      <path d="${tri(21.2, 12.8, 12.5, 5.2)}" fill="#fff" data-w="fill"/></g>`,
  target: (h) => ({ x: h ? -1.4 : 0 }),
  draw(p, E) { at(E.m, { transform: tr(p.x) }); }
});

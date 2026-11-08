import { defineIcon, rr, at } from '../packages/core/src/kit.js';
import { button, tri, tr } from './_media.js';

export default defineIcon({
  name: 'skip-forward',
  zh: '下一首',
  category: 'media',
  tags: ['next', 'track', 'skip', 'forward', '下一个'],
  // A next-track button: the triangle and bar step forward on hover.
  svg: (u) => `${button(u)}
    <g data-n="m"><path d="${tri(9.8, 18.2, 12.5, 5.2)}" fill="#fff" data-w="fill"/>
      <path d="${rr(19.4, 7.3, 2.8, 10.4, 1)}" fill="#fff" data-w="fill"/></g>`,
  target: (h) => ({ x: h ? 1.4 : 0 }),
  draw(p, E) { at(E.m, { transform: tr(p.x) }); }
});

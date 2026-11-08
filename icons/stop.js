import { defineIcon, rr, at, scaleAt } from '../packages/core/src/kit.js';
import { button } from './_media.js';

export default defineIcon({
  name: 'stop',
  zh: '停止',
  category: 'media',
  tags: ['end', 'halt', 'audio', 'video', '停止播放'],
  // A stop button; on hover its square presses in.
  svg: (u) => `${button(u)}
    <path data-n="sq" d="${rr(10.2, 7.2, 10.6, 10.6, 1.4)}" fill="#fff" data-w="fill"/>`,
  target: (h) => ({ s: h ? 0.74 : 1 }),
  draw(p, E) { at(E.sq, { transform: scaleAt(p.s, 15.5, 12.5) }); }
});

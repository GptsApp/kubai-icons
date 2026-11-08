import { defineIcon, rp, at } from '../packages/core/src/kit.js';
import { button } from './_media.js';

export default defineIcon({
  name: 'pause',
  zh: '暂停',
  category: 'media',
  tags: ['hold', 'break', 'resume', 'audio', 'video', '暂停播放'],
  // A pause button whose two bars fold into a play triangle on hover.
  svg: (u) => `${button(u)}
    <path data-n="l" fill="#fff" data-w="fill"/><path data-n="r" fill="#fff" data-w="fill"/>`,
  target: (h) => ({
    l: h ? [[12.2, 7.2], [16.4, 9.6], [16.4, 15.4], [12.2, 17.8]] : [[11, 7.2], [14.2, 7.2], [14.2, 17.8], [11, 17.8]],
    r: h ? [[16, 9.4], [21.4, 12.5], [21.4, 12.5], [16, 15.6]] : [[16.8, 7.2], [20, 7.2], [20, 17.8], [16.8, 17.8]]
  }),
  draw(p, E) { at(E.l, { d: rp(p.l, 0.8) }); at(E.r, { d: rp(p.r, 0.8) }); }
});

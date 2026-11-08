import { defineIcon, OL, rp, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'play',
  zh: '播放',
  category: 'media',
  tags: ['start', 'pause', 'video', 'audio', 'resume'],
  // A play button that turns into pause on hover.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 11.5)}" fill="${u.loS}"/></g></g>
    <path d="${circ(15.5, 12.5, 11.5)}" ${OL}/>
    <path data-n="l" fill="#fff" data-w="fill"/><path data-n="r" fill="#fff" data-w="fill"/>`,
  target: (h) => ({
    l: h ? [[11, 7.2], [14.2, 7.2], [14.2, 17.8], [11, 17.8]] : [[12.2, 7.2], [16.4, 9.6], [16.4, 15.4], [12.2, 17.8]],
    r: h ? [[16.8, 7.2], [20, 7.2], [20, 17.8], [16.8, 17.8]] : [[16, 9.4], [21.4, 12.5], [21.4, 12.5], [16, 15.6]]
  }),
  draw(p, E) { at(E.l, { d: rp(p.l, 0.8) }); at(E.r, { d: rp(p.r, 0.8) }); }
});

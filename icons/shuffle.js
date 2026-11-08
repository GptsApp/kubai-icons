import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { button, tri } from './_media.js';

// One crossing track from (8.4, y0) to (20.8, y1); the head sits on its right end.
const track = (y0, y1) => `M8.4 ${f(y0)}H10.4C14 ${f(y0)} 15.4 ${f(y1)} 19 ${f(y1)}H20.8`;

export default defineIcon({
  name: 'shuffle',
  zh: '随机播放',
  category: 'media',
  tags: ['random', 'mix', 'shuffle play', 'crossing arrows', '乱序'],
  // Two crossing arrows; on hover they trade places, like tracks being mixed.
  svg: (u) => `${button(u)}
    <mask id="${u.id('gap')}" maskUnits="userSpaceOnUse" x="0" y="-2" width="31" height="29">
      <rect x="0" y="-2" width="31" height="29" fill="#fff"/>
      <path data-n="bm" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/></mask>
    <path data-n="a" mask="url(#${u.id('gap')})" fill="none" stroke-width="2.2" stroke-linecap="round" stroke="#fff" data-w="stroke"/>
    <path data-n="ah" fill="#fff" data-w="fill"/>
    <path data-n="b" fill="none" stroke-width="2.2" stroke-linecap="round" stroke="#fff" data-w="stroke"/>
    <path data-n="bh" fill="#fff" data-w="fill"/>`,
  target: (h) => ({ s: h ? -1 : 1 }),
  draw(p, E) {
    const d = 3.7 * p.s, a = track(12.5 - d, 12.5 + d), b = track(12.5 + d, 12.5 - d);
    at(E.a, { d: a }); at(E.b, { d: b }); at(E.bm, { d: b });
    at(E.ah, { d: tri(20.2, 24.2, 12.5 + d, 2.8) });
    at(E.bh, { d: tri(20.2, 24.2, 12.5 - d, 2.8) });
  }
});

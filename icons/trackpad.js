import { defineIcon, f, WHITE, rr, circ, at } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';

export default defineIcon({
  name: 'trackpad',
  zh: '触控板',
  category: 'devices',
  tags: ['touchpad', 'touch', 'gesture', 'scroll', 'mouse', '触摸板'],
  variants: ['check', 'cog'],
  // A trackpad touched by two fingers; on hover the two touches swipe down to scroll.
  svg: (u) => `${back(u, rr(4.4, 3.6, 22.2, 17.8, 2.6), u.lo(17.8))}<path data-n="t" ${WHITE}/>`,
  target: (h) => ({ y: h ? 14.8 : 9.6 }),
  draw(p, E) { at(E.t, { d: circ(12.9, p.y, 1.8) + circ(18.1, p.y, 1.8) }); }
});

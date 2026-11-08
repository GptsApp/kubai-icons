import { defineIcon, f, WHITE, rr, at } from '../packages/core/src/kit.js';
import { back, front, atAll } from './_commerce-charts.js';

// The leg's top edge sits under the cuff and follows it.
const sock = (y) => `M9 ${f(y)}H19V11L23.6 14C26.6 15.9 27.6 17.8 27 20C26.4 22.4 24.2 23.8 21.6 23.8H14C11 23.8 9 21.8 9 18.8Z`;
const CUFF = rr(7.6, 1.6, 12.8, 5.6, 1.8);
const TOE = 'M21.4 12.6L23.6 14C26.6 15.9 27.6 17.8 27 20C26.4 22.4 24.2 23.8 21.6 23.8H19.2C21.4 20.6 22.2 16.4 21.4 12.6Z';
const HEEL = 'M9 16.4C11.8 16.4 14.6 19 14.6 23.8H14C11 23.8 9 21.8 9 18.8Z';

export default defineIcon({
  name: 'sock',
  zh: '袜子',
  category: 'commerce',
  tags: ['socks', 'clothing', 'apparel', 'laundry', 'foot', 'wear', '短袜', '服饰'],
  variants: ['plus', 'check', 'heart'],
  // A sock with a ribbed cuff, heel and toe patches; on hover the cuff is pulled up the leg.
  svg: (u) => `<g transform="translate(-2 0)">${back(u, sock(4), u.loS, 'b')}
    <g filter="${u.hi}"><path d="${TOE}" fill="${u.upS}"/><path d="${HEEL}" fill="${u.upS}"/></g>
    <path data-n="st" d="${rr(9, 9, 10, 2.4, 0)}" ${WHITE}/>
    <g data-n="cu">${front(u, CUFF, u.upS)}</g></g>`,
  target: (h) => ({ y: h ? 2.2 : 0 }),
  draw(p, E) {
    atAll(E, ['b', 'bO'], { d: sock(4 - p.y) });
    at(E.cu, { transform: `translate(0 ${f(-p.y)})` });
    at(E.st, { transform: `translate(0 ${f(-p.y * 0.5)})` });
  }
});

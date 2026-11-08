import { defineIcon, KR, f, R, rp, rr, at } from '../packages/core/src/kit.js';
import { back, wheel } from './_b6-vehicles.js';

export default defineIcon({
  name: 'trailer',
  zh: '挂车',
  category: 'transport',
  tags: ['tow', 'towing', 'hitch', 'utility trailer', 'haul', 'cargo', '拖车', '拖斗'],
  // A box trailer on one axle with a drawbar on a jack stand; on hover it tips
  // back on its axle, lifting the drawbar as if being hitched up.
  svg: (u) => `<g data-n="t">
    <path d="${rr(20, 13, 8.6, 2.8, 1.2) + rr(23.6, 13.6, 2.6, 7.6, 1.1)}" fill="${u.pure('#2F6FE0')}"/>
    ${back(u, rr(3.6, 3.8, 18.4, 13.6, KR), u.loS)}
    ${back(u, rp(R(3.6, 10.4, 18.4, 7), [1.8, 1.8, KR, KR]), u.upS)}
    ${wheel(u, 12.8, 17.4, 3.8)}</g>`,
  target: (h) => ({ a: h ? -9 : 0 }),
  draw(p, E) { at(E.t, { transform: `rotate(${f(p.a)} 12.8 17.4)` }); }
});

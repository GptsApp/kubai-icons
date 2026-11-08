import { defineIcon, DEEP, rp, rr, at, wave } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';

const SHELL = rp([[3.8, 3.6], [27.2, 3.6], [27.2, 14], [21.4, 21.4], [9.6, 21.4], [3.8, 14]], [2.2, 2.2, 1.6, 1.8, 1.8, 1.6]);
const HOLE = rp([[6.4, 6.2], [24.6, 6.2], [24.6, 13.2], [20.3, 18.8], [10.7, 18.8], [6.4, 13.2]], [1.2, 1.2, 1.2, 1.2, 1.2, 1.2]);
const TONGUE = rr(8.9, 8.8, 13.2, 3.6, 1);

export default defineIcon({
  name: 'hdmi-port',
  zh: 'HDMI 接口',
  category: 'devices',
  tags: ['hdmi', 'video port', 'display output', 'connector', 'av', 'tv input', '视频接口', '高清接口'],
  variants: ['check', 'x', 'alert'],
  // An HDMI socket, its chamfered outline filling the shape, with a contact tongue inside; on
  // hover the signal runs along the contacts.
  svg: (u) => `${back(u, SHELL)}
      <path d="${HOLE}" fill="#fff"/>
      <path d="${TONGUE}" ${DEEP}/>
      <clipPath id="${u.id('tg')}"><path d="${TONGUE}"/></clipPath>
      <g clip-path="url(#${u.id('tg')})"><path data-n="gl" fill="#fff" opacity=".85"/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const x = wave(p.o, (t) => 4 + 21 * t);
    at(E.gl, { d: rp([[x, 8.6], [x + 5, 8.6], [x + 4, 12.6], [x - 1, 12.6]], 0) });
  }
});

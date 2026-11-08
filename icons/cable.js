import { defineIcon, f, DEEPS, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

const L = 10.4, Rx = 20.6;
const plug = (u, x, n) => `<g data-n="${n}">${front(u, rr(x - 2.1, 1.4, 4.2, 5.4, 1.2))}${back(u, rr(x - 3, 6, 6, 9.4, 2.2))}</g>`;

export default defineIcon({
  name: 'cable',
  zh: '数据线',
  category: 'devices',
  tags: ['usb cable', 'usb-c', 'cord', 'wire', 'connector', '充电线', '线缆'],
  variants: ['check', 'x'],
  // A USB cable with a connector at each end; on hover one connector pushes up as if plugged in.
  svg: (u) => `<path data-n="cord" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>${plug(u, L, 'a')}${plug(u, Rx, 'b')}`,
  target: (h) => ({ y: h ? -1.4 : 0 }),
  draw(p, E) {
    at(E.a, { transform: `translate(0 ${f(p.y)})` });
    at(E.cord, { d: `M${L} ${f(14 + p.y)}V18A5.1 5.1 0 0 0 ${Rx} 18V14` });
  }
});

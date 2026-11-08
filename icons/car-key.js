import { defineIcon, f, DEEP, DEEPS, rp, rr, clamp01, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';
import { arcPath } from './_devices.js';

// The blade along +x from its pivot, teeth on the lower edge.
const BLADE = rp([[-2, -2], [12.4, -2], [14.4, 0], [14.4, 2], [11.4, 2], [11.4, 0.4], [8.6, 0.4], [8.6, 2], [-2, 2]], [0.4, 0.6, 0.6, 0.4, 0.3, 0.3, 0.3, 0.3, 0.4]);
const FOB = rr(4.4, 9.6, 11.6, 13.4, 4);

export default defineIcon({
  name: 'car-key',
  zh: '车钥匙',
  category: 'transport',
  tags: ['car key', 'key fob', 'remote', 'unlock', 'vehicle', 'rental', '遥控钥匙'],
  variants: ['lock', 'check', 'x'],
  // A car key fob with its blade out; on hover a button is pressed and the signal goes out.
  svg: (u) => `<g transform="translate(12.8 13.2) rotate(-42)">${back(u, BLADE, u.loS)}</g>
    ${front(u, FOB, u.upS)}
    <path d="${rr(7.4, 12.8, 5.6, 3, 1.5) + rr(7.4, 17.6, 5.6, 3, 1.5)}" ${DEEP}/>
    <g data-n="s"><path data-n="a0" d="${arcPath(6.4, 8, 3.2, 280, 350)}" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <path data-n="a1" d="${arcPath(6.4, 8, 6, 280, 350)}" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.a0, { opacity: f(clamp01(o * 2.5)) });
    at(E.a1, { opacity: f(clamp01(o * 2.5 - 0.8)) });
  }
});

import { defineIcon, f, DEEP, DEEPS, rp, at, clamp01, bump } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';
import { axis } from './_b7-devices.js';

const TIP = [5.8, 22.2], on = axis(TIP[0], TIP[1], 45);
const BARREL = rp([on(1.8, -1.5), on(5.4, -3), on(27, -3), on(27, 3), on(5.4, 3), on(1.8, 1.5)], [0.2, 1.4, 2.6, 2.6, 1.4, 0.2]);
const NIB = rp([on(0, -1.3), on(2.6, -1.5), on(2.6, 1.5), on(0, 1.3)], [1.2, 0.1, 0.1, 1.2]);
const BUTTON = rp([on(11.6, -1.3), on(19.8, -1.3), on(19.8, 1.3), on(11.6, 1.3)], 1.3);

export default defineIcon({
  name: 'stylus',
  zh: '触控笔',
  category: 'devices',
  tags: ['touch pen', 'digital pen', 'tablet pen', 'pointer', 'handwriting', 'input', '手写笔', '电容笔'],
  variants: ['check', 'x'],
  // A slim, smooth stylus with a rounded nib and a side button; on hover it taps the surface
  // and a ripple spreads from the nib.
  svg: (u) => `<circle data-n="rip" cx="${TIP[0]}" cy="${TIP[1]}" fill="none" stroke-width="1.6" ${DEEPS}/>
      <g data-n="g"><path d="${NIB}" ${DEEP}/>${back(u, BARREL)}
        <path d="${BUTTON}" ${DEEP}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), b = bump(o), [dx, dy] = on(-1.6 * b, 0);
    at(E.g, { transform: `translate(${f(dx - TIP[0])} ${f(dy - TIP[1])})` });
    at(E.rip, { r: f(1 + 3.8 * o), opacity: f(b) });
  }
});

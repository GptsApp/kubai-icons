import { defineIcon, f, OL, ACC, LINE, DEEP, circ, at } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';
import { arcPath } from './_devices.js';

const C = [15.5, 12.5], RT = 5.2;
const pt = (a) => [C[0] + RT * Math.sin(a * Math.PI / 180), C[1] - RT * Math.cos(a * Math.PI / 180)];

export default defineIcon({
  name: 'thermostat',
  zh: '温控器',
  category: 'home',
  tags: ['thermostat', 'temperature', 'heating', 'climate', 'smart home', '恒温器', '空调温度'],
  variants: ['check', 'clock', 'cog'],
  off: true,
  // A round wall thermostat; on hover its dial is turned up and the setting arc grows.
  svg: (u) => `${back(u, circ(C[0], C[1], 11))}
      <path d="${circ(C[0], C[1], 8)}" fill="#fff"/>
      <path d="${arcPath(C[0], C[1], RT, -135, 135)}" ${LINE}/>
      <path data-n="arc" ${ACC}/>
      <path data-n="dot" ${DEEP}/>`,
  target: (h) => ({ a: h ? 125 : 10 }),
  draw(p, E) {
    at(E.arc, { d: arcPath(C[0], C[1], RT, -135, p.a) });
    // The knob grows a little while it is being turned.
    const d = pt(p.a), t = (p.a - 10) / 115;
    at(E.dot, { d: circ(d[0], d[1], 1.6 + 0.5 * Math.sin(Math.PI * Math.max(0, Math.min(1, t)))) });
  }
});

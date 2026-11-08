import { defineIcon } from '../packages/core/src/kit.js';
import { liveBody, leanBody, swell, liveMark, place, arrow, f, at } from './_arrows.js';

const J = [0, 1.6], TIP = [5, -4.6];

export default defineIcon({
  name: 'split',
  zh: '拆分',
  category: 'arrows',
  tags: ['split', 'fork', 'branch', 'diverge', 'divide', '分叉'],
  // A tile with one stem forking into two arrows towards the upper corners; on hover the
  // stem flows up and both heads dart out with the face leaning after them, then settle.
  svg: (u) => liveBody(u, 'tile') + liveMark('m'),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const w = swell(p.o), s = 0.7 * p.o + 1.6 * w;
    const d = Math.hypot(TIP[0] - J[0], TIP[1] - J[1]), ux = (TIP[0] - J[0]) / d, uy = (TIP[1] - J[1]) / d;
    const r = arrow(J[0], J[1], TIP[0] + ux * s, TIP[1] + uy * s, 3.2, 2.6);
    const l = arrow(-J[0], J[1], -TIP[0] - ux * s, TIP[1] + uy * s, 3.2, 2.6);
    leanBody(E, 'tile', 0, -0.8 * w);
    at(E.m, { transform: place(0) });
    at(E.mS, { d: `M0 ${f(5.6 - 0.8 * s)}V${J[1]}${r.shaft.replace(/^M[^L]+/, '')}${l.shaft}` });
    at(E.mH, { d: r.head + l.head });
  }
});

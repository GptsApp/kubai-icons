import { defineIcon } from '../packages/core/src/kit.js';
import { liveBody, leanBody, swell, liveMark, place, arrow, f, at } from './_arrows.js';

const HEAD = 2.8, HALF = 2.3;

export default defineIcon({
  name: 'move',
  zh: '移动',
  category: 'arrows',
  tags: ['drag', 'pan', 'reposition', 'four ways', 'arrows', '拖动'],
  // A disc with a cross of four arrows; on hover every arrow darts outward as the face
  // swells with them, then settles a little out.
  svg: (u) => liveBody(u) + liveMark('m'),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const w = swell(p.o), t = 5.6 + 0.7 * p.o + 1.3 * w, b = f(t - HEAD + 0.6);
    const heads = [[t, 0], [0, t], [-t, 0], [0, -t]].map(([x, y]) => arrow(0, 0, x, y, HEAD, HALF).head).join('');
    leanBody(E, 'disc', 0, 0, 0.6 * w);
    at(E.m, { transform: place(0) });
    at(E.mS, { d: `M${-b} 0H${b}M0 ${-b}V${b}` });
    at(E.mH, { d: heads });
  }
});

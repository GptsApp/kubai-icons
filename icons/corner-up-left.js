import { defineIcon } from '../packages/core/src/kit.js';
import { liveBody, leanBody, swell, liveMark, place, arrow, f, at } from './_arrows.js';

export default defineIcon({
  name: 'corner-up-left',
  zh: '向左上转弯',
  category: 'arrows',
  tags: ['corner', 'turn', 'back', 'reply', 'up left', '返回'],
  // A tile with an arrow that runs up and turns left; on hover the arrow flows along its
  // path, its head darting left with the face leaning after it, then settles.
  svg: (u) => liveBody(u, 'tile') + liveMark('m'),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The corner-down-right geometry, turned half a revolution.
    const w = swell(p.o), L = 0.8 * p.o + 1.9 * w, t = 4.4 + L;
    const a = arrow(-1.2, 3, t, 3, 3.4, 2.8);
    leanBody(E, 'tile', -0.8 * w, 0);
    at(E.m, { transform: `${place(0, -0.4, 0)} rotate(180)` });
    at(E.mS, { d: `M-4.4 ${f(-4.8 + 0.6 * L)}V0.2A2.8 2.8 0 0 0 -1.6 3H${f(t - 2.8)}` });
    at(E.mH, { d: a.head });
  }
});

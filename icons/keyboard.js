import { defineIcon, KR, CR, f, OL, rr, at } from '../packages/core/src/kit.js';
import { span } from './_devices.js';

// Key rects [x, y, w] on three rows, 3 tall.
const W = 5.1, ROWS = [6.6, 11, 15.4], COL = [6, 12.95, 19.9];
const KEYS = COL.flatMap((x) => [[x, ROWS[0], W], [x, ROWS[1], W]]);
// The keys typed on hover, in order, and the space bar that stays down at the end.
const TYPED = [[COL[0], ROWS[1], W], [COL[1], ROWS[0], W], [COL[2], ROWS[1], W]], SPACE = [9.5, ROWS[2], 12];

export default defineIcon({
  name: 'keyboard',
  zh: '键盘',
  category: 'devices',
  tags: ['type', 'keys', 'input', 'typing', '打字'],
  variants: ['cog', 'plus', 'lock'],
  // A keyboard; on hover three keys are typed in turn and the space bar is pressed.
  svg: (u) => {
    const body = rr(4, 4.6, 23, 15.8, KR);
    const still = KEYS.filter((k) => !TYPED.some((t) => t[0] === k[0] && t[1] === k[1]));
    const key = (n) => `<g data-n="${n}"><path data-n="${n}w" fill="#fff"/><path data-n="${n}l" fill="${u.pure('#4389FF')}" opacity="0"/></g>`;
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${still.map(([x, y, w]) => rr(x, y, w, 3, 0.8)).join('')}" fill="#fff"/>
      ${key('k0')}${key('k1')}${key('k2')}${key('sp')}`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const press = (n, [x, y, w], v) => {
      const s = 1 - 0.14 * v, cx = x + w / 2, cy = y + 1.5;
      const d = rr(cx - (w / 2) * s, cy - 1.5 * s, w * s, 3 * s, 0.8);
      at(E[n + 'w'], { d }); at(E[n + 'l'], { d, opacity: f(v) });
    };
    // Each key snaps down and lights, then fades slowly, so the typed keys overlap.
    const tap = (t) => (t <= 0 || t >= 1 ? 0 : t < 0.2 ? t / 0.2 : 1 - (t - 0.2) / 0.8);
    TYPED.forEach((k, i) => press('k' + i, k, tap(span(p.o, i * 0.14, i * 0.14 + 0.6))));
    press('sp', SPACE, span(p.o, 0.42, 0.7));
  }
});

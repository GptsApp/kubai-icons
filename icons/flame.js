import { defineIcon, f, OL, clamp01, at, wave } from '../packages/core/src/kit.js';
import { flameShape } from './_weather-nature.js';

// The outer flame: a main tongue with tip (tx, ty) and a smaller tongue at (sx, sy) on its left.
const outer = (tx, ty, sx, sy) => `M15.5 23.8C10.8 23.8 7.2 20.4 7.2 16C7.2 13.2 8 10.8 ${f(sx)} ${f(sy)}`
  + `C${f(sx + 0.9)} ${f(sy + 2.6)} 11 12.6 12.6 13C12.2 8.8 ${f(tx - 3.4)} ${f(ty + 4.4)} ${f(tx)} ${f(ty)}`
  + `C${f(tx + 1.4)} ${f(ty + 4.6)} 23.8 9.6 23.8 16C23.8 20.4 20.2 23.8 15.5 23.8Z`;

export default defineIcon({
  name: 'flame',
  zh: '火焰',
  category: 'nature',
  tags: ['fire', 'hot', 'trending', 'popular', 'burn', 'streak', '热门'],
  // A flame of two tongues round a lighter core; on hover it flickers, the tongues licking
  // side to side out of step, until it burns steady again.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="fl" fill="${u.loS}"/></g></g><path data-n="flO" stroke-linejoin="round" ${OL}/>
    <g filter="${u.hi}"><path data-n="co" fill="${u.upS}"/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), w = (ph) => wave(o, (t) => (1 - t) * Math.sin(3 * Math.PI * t - ph));
    const lift = 1.4 * wave(o, (t) => (1 - t) * Math.abs(Math.sin(3 * Math.PI * t)));
    const d = outer(16.6 + 2.8 * w(0), 1.2 - lift, 9 + 1.6 * w(1.2), 8.6 - lift * 0.6);
    at(E.fl, { d }); at(E.flO, { d });
    at(E.co, { d: flameShape(21.6, 4.4, 9.6 + lift * 0.6, 0.4 + 1.8 * w(0.8)) });
  }
});

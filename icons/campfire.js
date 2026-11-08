import { defineIcon, f, OL, clamp01, at, wave } from '../packages/core/src/kit.js';
import { flameShape, capsule } from './_weather-nature.js';
import { front } from './_commerce-charts.js';

export default defineIcon({
  name: 'campfire',
  zh: '篝火',
  category: 'travel',
  tags: ['bonfire', 'camping', 'fire', 'outdoor', 'camp', 'warmth', '营火', '露营'],
  // A fire burning on two crossed logs; on hover the flames flicker and burn steady again.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="fl" fill="${u.loS}"/></g></g><path data-n="flO" stroke-linejoin="round" ${OL}/>
    <g filter="${u.hi}"><path data-n="co" fill="${u.upS}"/></g>
    ${front(u, capsule(5.2, 22, 25.8, 16.8, 3.2), u.upS)}
    ${front(u, capsule(5.2, 16.8, 25.8, 22, 3.2), u.upS)}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), w = (ph) => wave(o, (t) => (1 - t) * Math.sin(3 * Math.PI * t - ph));
    const lift = 1.4 * wave(o, (t) => (1 - t) * Math.abs(Math.sin(3 * Math.PI * t)));
    const d = flameShape(19.4, 6.6, 17.4 + lift, 2.4 * w(0));
    at(E.fl, { d }); at(E.flO, { d });
    at(E.co, { d: flameShape(19.4, 3.4, 9.4 + lift * 0.6, 1.6 * w(0.8)) });
  }
});

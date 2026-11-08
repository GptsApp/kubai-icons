import { defineIcon, f, DEEPS, rr, at, clamp01 } from '../packages/core/src/kit.js';
import { back, liveFront, setPath } from './_b1-home.js';

const OUT = 10.4;
const panel = (s, o) => {
  const x = (v) => f(15.5 + s * v), i = 3.6 * o + 0, t = 6.6 + 1.6 * o, b = 5.6 + 2.2 * o;
  return `M${x(OUT)} 3H${x(i)}Q${x(i + 0.2)} 11 ${x(t)} 15Q${x(t - 1)} 19 ${x(b)} 22.8Q${x(b)} 23.8 ${x(b + 0.8)} 23.8H${x(OUT - 0.9)}Q${x(OUT)} 23.8 ${x(OUT)} 22.9Z`;
};

export default defineIcon({
  name: 'curtains',
  zh: '窗帘',
  category: 'home',
  tags: ['drapes', 'window', 'blinds', 'privacy', 'living room', '帘子', '窗户'],
  // Two curtains tied back on a rail; they draw further apart on hover.
  svg: (u) => `${back(u, rr(7.6, 3, 15.8, 20.8, 1.2))}
      ${liveFront(u, 'l')}${liveFront(u, 'r')}
      <path data-n="tie" fill="none" stroke-width="2.4" ${DEEPS}/>
      ${back(u, rr(3.6, 1.2, 23.8, 3.6, 1.8))}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), t = 6.4 + 1.6 * o;
    setPath(E, 'l', panel(-1, o)); setPath(E, 'r', panel(1, o));
    at(E.tie, { d: `M${f(15.5 - OUT)} 15H${f(15.5 - t)}M${f(15.5 + t)} 15H${f(15.5 + OUT)}` });
  }
});

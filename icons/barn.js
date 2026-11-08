import { defineIcon, KR, f, SOFTS, R, rp, at, clamp01 } from '../packages/core/src/kit.js';
import { back, front, setD } from './_b6-vehicles.js';

const X0 = 7.2, X1 = 23.8, MID = 16, TOP = 12.4, BOT = 23;

export default defineIcon({
  name: 'barn',
  zh: '谷仓',
  category: 'home',
  tags: ['farm', 'ranch', 'granary', 'stable', 'countryside', 'storage', '农场', '仓房'],
  // A gambrel-roofed barn with double doors; on hover the two doors swing apart onto the
  // pale interior.
  svg: (u) => {
    const body = rp([[15.5, 1.4], [23, 4.6], [27.4, 11.6], [27.4, 23], [3.6, 23], [3.6, 11.6], [8, 4.6]], [1.6, 1, 1, KR, KR, 1, 1]);
    const brace = (n) => `<path data-n="${n}" fill="none" stroke-width="1.6" stroke-linecap="round" ${SOFTS}/>`;
    return `${back(u, body, u.loS)}
      <circle cx="15.5" cy="7.8" r="2.8" fill="#fff"/>
      <path d="${rp(R(X0, TOP, X1 - X0, BOT - TOP), [1, 1, 0, 0])}" fill="#fff"/>
      ${front(u, '', u.upS, 'l')}${brace('lb')}
      ${front(u, '', u.upS, 'r')}${brace('rb')}`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = p.o, wl = (MID - X0) + (2.4 - (MID - X0)) * o, wr = (X1 - MID) + (2.4 - (X1 - MID)) * o;
    setD(E, 'l', rp(R(X0, TOP, wl, BOT - TOP), [1, 0, 0, 0]));
    setD(E, 'r', rp(R(X1 - wr, TOP, wr, BOT - TOP), [0, 1, 0, 0]));
    const fade = f(1 - clamp01(o / 0.6));
    at(E.lb, { d: `M${f(X0 + wl - 2.2)} ${TOP + 2}L${f(X0 + 1.6)} ${BOT - 2}`, opacity: fade });
    at(E.rb, { d: `M${f(X1 - wr + 1.2)} ${TOP + 2}L${f(X1 - 1.6)} ${BOT - 2}`, opacity: fade });
  }
});

import { defineIcon, f, WHITE, rp, ellipse, clamp01, at, wave } from '../packages/core/src/kit.js';
import { solid } from './_b5-parts.js';

const Y = 15.4;
const SAUCER = ellipse(15.5, Y, 12, 5.4);
const DOME = `M8 ${Y - 2}C8 ${Y - 13} 23 ${Y - 13} 23 ${Y - 2}Z`;
const LIGHTS = [8.6, 15.5, 22.4];

export default defineIcon({
  name: 'ufo',
  zh: '飞碟',
  category: 'science',
  tags: ['flying saucer', 'alien craft', 'spaceship', 'abduction', 'space', '外星', '不明飞行物'],
  // A flying saucer with a domed cabin; on hover it rises and shines a widening beam of light down as its lamps run.
  svg: (u) => `<linearGradient id="${u.id('f')}" gradientUnits="userSpaceOnUse" x1="0" y1="15" x2="0" y2="26"><stop offset="0" stop-color="#fff"/><stop offset="0.45" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
    <mask id="${u.id('m')}" maskUnits="userSpaceOnUse" x="0" y="-2" width="31" height="29"><rect x="0" y="-2" width="31" height="29" fill="url(#${u.id('f')})"/></mask>
    <g mask="url(#${u.id('m')})"><path data-n="bm" fill="${u.upS}"/><path data-n="eg" fill="none" stroke-width="1" data-t="stroke:#5393FF"/></g>
    <g data-n="g">${solid(u, DOME, u.upS)}${solid(u, SAUCER, u.loS)}
      ${LIGHTS.map((x, i) => `<circle data-n="l${i}" cx="${x}" cy="${Y + 0.6}" r="1.5" ${WHITE}/>`).join('')}</g>`,
  target: (h) => ({ y: h ? -3.6 : 0, b: h ? 1 : 0, o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.g, { transform: `translate(0 ${f(p.y)})` });
    const b = clamp01(p.b), top = Y + 2 + p.y, L = 13 * b, w0 = 6, w1 = w0 + 5 * b;
    at(E.bm, { d: rp([[15.5 - w0, top], [15.5 + w0, top], [15.5 + w1, top + L], [15.5 - w1, top + L]], 0) });
    at(E.eg, { d: `M${f(15.5 - w0)} ${f(top)}L${f(15.5 - w1)} ${f(top + L)}M${f(15.5 + w0)} ${f(top)}L${f(15.5 + w1)} ${f(top + L)}` });
    E.bm.setAttribute('opacity', b > 0.02 ? 1 : 0); E.eg.setAttribute('opacity', b > 0.02 ? 1 : 0);
    const o = clamp01(p.o);
    LIGHTS.forEach((_, i) => at(E[`l${i}`], { r: f(1.5 + wave(o, (t) => 0.7 * Math.max(0, Math.sin(Math.PI * Math.min(1, Math.max(0, t * 2 - i * 0.5)))))) }));
  }
});

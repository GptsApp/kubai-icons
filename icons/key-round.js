import { defineIcon, f, OL, rp, rr, circ, at, clamp01 } from '../packages/core/src/kit.js';
import { stage } from './_security-time-health.js';

// Drawn level about the origin, then turned so the head sits top right.
const SHAFT = rr(-12.4, -1.8, 15, 3.6, 0.6);
const BIT = rp([[-12.4, -4.8], [-9.4, -4.8], [-9.4, -1], [-12.4, -1]], [0.5, 0.5, 0, 0]) + rp([[-7.8, -4], [-5.4, -4], [-5.4, -1], [-7.8, -1]], [0.5, 0.5, 0, 0]);
const HEAD = circ(6, 0, 6) + circ(8.4, 0, 1.6);
const PLACE = 'translate(15.5 12.5) rotate(-45)';

export default defineIcon({
  name: 'key-round',
  zh: '密钥',
  category: 'security',
  tags: ['key', 'password', 'access', 'credential', 'api key', '钥匙'],
  variants: ['plus', 'check', 'x', 'sync'],
  // A round-headed key; on hover it slides into the lock and turns over.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g transform="${PLACE}"><g data-n="k">
      <path d="${SHAFT + BIT}" fill="${u.loS}"/><path d="${HEAD}" fill-rule="evenodd" fill="${u.upS}"/></g></g></g></g>
    <g transform="${PLACE}"><g data-n="ko"><path d="${SHAFT + BIT}" ${OL}/><path d="${HEAD}" fill-rule="evenodd" ${OL}/></g></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), sy = Math.cos(stage(o, 0.35, 1) * Math.PI);
    const t = `translate(${f(-1.6 * stage(o, 0, 0.35))} 0) scale(1 ${f(Math.abs(sy) < 0.001 ? 0.001 : sy)})`;
    at(E.k, { transform: t }); at(E.ko, { transform: t });
  }
});

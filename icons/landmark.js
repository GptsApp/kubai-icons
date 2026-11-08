import { defineIcon, f, rp, rr, R, circ, at, clamp01 } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

export default defineIcon({
  name: 'landmark',
  zh: '银行',
  category: 'commerce',
  tags: ['bank', 'building', 'finance', 'government', 'museum', 'institution', '机构'],
  variants: ['plus', 'check', 'x', 'search', 'lock', 'cog'],
  // A columned bank building; on hover the coin on its pediment is tossed
  // up toward the viewer, spins once and lands back.
  svg: (u) => `${back(u, rr(5.6, 8, 19.8, 11.6, 0.6), u.loS)}
    <path d="${[7.8, 12.1, 16.5, 20.8].map((x) => rp(R(x, 9.6, 2.4, 9), 0.4)).join('')}" fill="#fff"/>
    ${front(u, rp([[3.8, 9.2], [15.5, 1.6], [27.2, 9.2]], [1.2, 1.8, 1.2]), u.upS)}
    ${front(u, rr(3.8, 18.6, 23.4, 4.2, 1.6), u.upS)}
    <path data-n="em" d="${circ(15.5, 6.3, 1.9)}" data-t="fill:#2F6FE0"/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), c = Math.cos(2 * Math.PI * o), sx = Math.sign(c || 1) * Math.max(0.12, Math.abs(c));
    const s = 1 + 0.45 * Math.sin(Math.PI * o), ty = 6.3 - 6.3 * s - 7 * Math.sin(Math.PI * o);
    at(E.em, { transform: `translate(15.5 ${f(ty)}) scale(${f(sx * s)} ${f(s)}) translate(-15.5 0)` });
  }
});

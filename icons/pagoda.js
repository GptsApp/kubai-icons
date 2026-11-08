import { defineIcon, f, rr, clamp01, at, rattle } from '../packages/core/src/kit.js';
import { back, front } from './_b6-vehicles.js';

const CX = 15.5;
/** An upswept roof, its eave line at y, tip to tip w, ridge half-width t. */
const roof = (y, w, t) => {
  const l = CX - w / 2, r = CX + w / 2;
  return `M${f(l)} ${f(y - 1.4)}Q${f(CX - t - 2.2)} ${f(y - 1.6)} ${f(CX - t)} ${f(y - 4)}H${f(CX + t)}Q${f(CX + t + 2.2)} ${f(y - 1.6)} ${f(r)} ${f(y - 1.4)}L${f(r - 2)} ${f(y + 1)}H${f(l + 2)}Z`;
};

export default defineIcon({
  name: 'pagoda',
  zh: '宝塔',
  category: 'travel',
  tags: ['temple', 'tower', 'asia', 'shrine', 'landmark', 'tiered', '塔', '古塔'],
  // A three-tiered pagoda with upswept eaves; on hover the tiers sway and settle, the
  // higher ones furthest.
  svg: (u) => `${back(u, rr(9, 16.4, 13, 6.2, 0), u.loS)}
    <path d="M13.4 22.6V19.2A2.1 2.1 0 0 1 17.6 19.2V22.6Z" fill="${u.pure('#2F6FE0')}"/>
    ${front(u, rr(6, 22, 19, 2.4, 1), u.upS)}
    <g data-n="a">${back(u, rr(10.9, 11.4, 9.2, 3.4, 0), u.loS)}${front(u, roof(16, 23.6, 4.4), u.upS)}</g>
    <g data-n="b">${back(u, rr(12.5, 6.6, 6, 2.8, 0), u.loS)}${front(u, roof(11, 18.4, 2.8), u.upS)}</g>
    <g data-n="c"><path d="${rr(14.3, 0.4, 2.4, 3.6, 0.9)}" fill="${u.pure('#2F6FE0')}"/>${front(u, roof(6, 13.4, 1.2), u.upS)}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    [['a', 0.9], ['b', 1.7], ['c', 2.6]].forEach(([n, k]) => at(E[n], { transform: `translate(${f(rattle(o, k, 3))} 0)` }));
  }
});

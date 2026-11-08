import { defineIcon, f, rp, clamp01, bump, at, DEEPS } from '../packages/core/src/kit.js';
import { solid } from './_w2-dev.js';

const BODY = rp([
  [3.2, 5.8], [9.2, 4.2], [27.6, 4.2], [27.6, 10.6], [22.2, 12.6], [21.2, 18.6], [12.8, 18.6], [11.8, 12.6], [8.6, 10.8]
], [1, 1.4, 1.6, 1.6, 2, 0.4, 0.4, 2, 3.4]);
const BASE = rp([[10.8, 17.4], [23.2, 17.4], [26.2, 21.7], [7.8, 21.7]], [1.2, 1.2, 1, 1]);
const RAYS = [-52, 0, 52];

export default defineIcon({
  name: 'anvil',
  zh: '铁砧',
  category: 'tools',
  tags: ['forge', 'blacksmith', 'metal', 'heavy', 'strike', '打铁', '铁匠'],
  // A blacksmith's anvil; on hover a blow lands on its face, it jolts and sparks fly.
  svg: (u) => `<path data-n="rays" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    ${solid(u, BASE, u.upS)}
    <g data-n="top">${solid(u, BODY, u.loS)}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const b = bump(clamp01(p.o));
    let d = '';
    for (const a of RAYS) {
      const s = Math.sin(a * Math.PI / 180), c = Math.cos(a * Math.PI / 180);
      const r0 = 2.6 + 1.2 * b, r1 = r0 + 3 * b;
      d += `M${f(17.4 + s * r0)} ${f(3 - c * r0)}L${f(17.4 + s * r1)} ${f(3 - c * r1)}`;
    }
    at(E.rays, { d, opacity: b > 0.04 ? 1 : 0 });
    at(E.top, { transform: `translate(0 ${f(1.2 * b)})` });
  }
});

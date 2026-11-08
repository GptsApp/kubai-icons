import { defineIcon, KR, f, DEEPS, rp, rr, at } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';

// The panel in perspective: top edge narrower than the bottom.
const Q = [[7.4, 3.2], [23.6, 3.2], [26.8, 15.8], [4.2, 15.8]];
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const at2 = (s, t) => lerp(lerp(Q[0], Q[1], s), lerp(Q[3], Q[2], s), t);
const cell = (s0, s1, t0, t1) => rp([at2(s0, t0), at2(s1, t0), at2(s1, t1), at2(s0, t1)], 0.7);
const COLS = [[0.09, 0.35], [0.38, 0.62], [0.65, 0.91]], ROWS = [[0.14, 0.5], [0.56, 0.86]];
const CELLS = ROWS.flatMap(([t0, t1]) => COLS.map(([s0, s1]) => cell(s0, s1, t0, t1))).join('');

export default defineIcon({
  name: 'solar-panel',
  zh: '太阳能板',
  category: 'nature',
  tags: ['solar', 'photovoltaic', 'renewable', 'energy', 'sun power', '光伏', '太阳能'],
  variants: ['bolt', 'check'],
  // A solar panel on a post; on hover a broad glint of sunlight runs across its cells.
  svg: (u) => `<path d="M15.5 15V21" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      ${back(u, rr(10.2, 20.2, 10.6, 3, 1.5))}
      ${back(u, rp(Q, KR))}
      <clipPath id="${u.id('cl')}"><path d="${CELLS}"/></clipPath>
      <path d="${CELLS}" fill="${u.pure('#4389FF')}"/>
      <g clip-path="url(#${u.id('cl')})"><path data-n="gl" fill="#fff" opacity=".55"/></g>`,
  target: (h) => ({ x: h ? 32 : -2 }),
  draw(p, E) {
    // The glint widens as it enters the cells.
    const w = 3.4 + 3 * Math.min(1, (p.x + 2) / 10);
    at(E.gl, { d: rp([[p.x, 2], [p.x + w, 2], [p.x + w - 5, 17], [p.x - 5, 17]], 0) });
  }
});

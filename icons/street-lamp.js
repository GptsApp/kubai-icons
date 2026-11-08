import { defineIcon, f, OL, DEEPS, rp, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_b6-vehicles.js';

const HL = 8.2, HR = 22.8;
const head = (x) => rp([[x - 3, 2.2], [x + 3, 2.2], [x + 4.8, 7.4], [x - 4.8, 7.4]], [1.4, 1.4, 1.2, 1.2]);
const beam = (x) => rp([[x - 3.4, 9], [x + 3.4, 9], [x + 4.6, 22.6], [x - 4.6, 22.6]], 0.8);

export default defineIcon({
  name: 'street-lamp',
  zh: '路灯',
  category: 'travel',
  tags: ['streetlight', 'lamp post', 'road', 'lighting', 'night', 'lantern', '街灯'],
  // A tall street lamp whose pole forks into two arms, each carrying a head; on hover both come on and light the road.
  svg: (u) => `<path data-n="bm" d="${beam(HL) + beam(HR)}" data-t="fill:#D3E2FC" opacity="0"/>
    <path d="M15.5 22V9.6C15.5 5.4 14 3.4 9.4 3.4M15.5 9.6C15.5 5.4 17 3.4 21.6 3.4" fill="none" stroke-width="2.4" stroke-linecap="round" ${DEEPS}/>
    ${back(u, rr(10.2, 20.8, 10.6, 3.2, 1.6), u.loS)}
    ${[HL, HR].map((x, i) => `${back(u, head(x), u.upS)}<path data-n="g${i}" d="${head(x)}" fill="#fff" opacity="0"/><path d="${head(x)}" ${OL}/>`).join('')}`,
  target: (h) => ({ g: h ? 0.9 : 0 }),
  draw(p, E) {
    const g = f(p.g);
    at(E.bm, { opacity: g }); at(E.g0, { opacity: g }); at(E.g1, { opacity: g });
  }
});

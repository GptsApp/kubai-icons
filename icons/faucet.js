import { defineIcon, f, DEEP, DEEPS, rp, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_b1-home.js';
import { flame } from './_home-food.js';

export default defineIcon({
  name: 'faucet',
  zh: '水龙头',
  category: 'home',
  tags: ['tap', 'water', 'sink', 'kitchen', 'bathroom', 'plumbing', '龙头', '水管', '洗手'],
  // A tap with a drop at its mouth; on hover the lever lifts and the drop becomes a stream.
  svg: (u) => {
    const body = rp([[7.4, 8.2], [25.8, 8.2], [25.8, 16.2], [20, 16.2], [20, 13.4], [12.8, 13.4], [12.8, 22], [7.4, 22]], [2.2, 3.2, 0.8, 0.8, 1, 1, 0, 0]);
    return `<path d="M10.1 9V4.6" fill="none" stroke-width="2.4" ${DEEPS}/>
      <path data-n="w" ${DEEP}/>
      ${back(u, body)}${front(u, rr(4.2, 20.8, 11.8, 3.2, 1.6))}
      <g data-n="lv">${front(u, rr(7.6, 1.2, 14.6, 3.6, 1.8))}</g>`;
  },
  target: (h) => ({ a: h ? -16 : 0, y: h ? 24.4 : 23.8, l: h ? 7.6 : 4.8 }),
  draw(p, E) {
    at(E.lv, { transform: `rotate(${f(p.a)} 9.4 3)` });
    at(E.w, { d: flame(22.9, p.y, 3.2, p.l) });
  }
});

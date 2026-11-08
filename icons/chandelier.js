import { defineIcon, f, DEEP, DEEPS, SOFTS, rr, circ, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { back, front } from './_b1-home.js';
import { flame } from './_home-food.js';

// Each candle: centre x and the y of its flame's base.
const CANDLES = [[5, 10.6], [10.4, 7.2], [20.6, 7.2], [26, 10.6]];

export default defineIcon({
  name: 'chandelier',
  zh: '枝形吊灯',
  category: 'home',
  tags: ['light', 'ceiling', 'candles', 'pendant', 'ballroom', 'lighting', '吊灯', '水晶灯'],
  // A candle chandelier on its rod; on hover it sways on its mount and the flames rise.
  svg: (u) => {
    const bowl = 'M3.4 13.6H27.6Q27 20.2 15.5 20.2Q4 20.2 3.4 13.6Z';
    const sticks = CANDLES.map(([x, y]) => `M${x} ${y}V14`).join('');
    return `<g data-n="g">
      <path d="M15.5 1V21" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <path d="${sticks}" fill="none" stroke-width="2.6" ${SOFTS}/>
      <path data-n="fl" ${DEEP}/>
      ${back(u, bowl)}
      <path d="${circ(15.5, 22.4, 2)}" ${DEEP}/>
      ${front(u, rr(12.5, 0.4, 6, 2.6, 1.2))}
    </g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), h = 4.6 + 1.6 * o;
    at(E.fl, { d: CANDLES.map(([x, y]) => flame(x, y, 3.6, h)).join('') });
    at(E.g, { transform: `rotate(${f(rattle(o, 6, 2))} 15.5 1)` });
  }
});

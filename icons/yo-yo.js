import { defineIcon, f, DEEP, DEEPS, SOFT, ellipse, bump, clamp01, at } from '../packages/core/src/kit.js';
import { back } from './_commerce-charts.js';

const CY = 16.6, RX = 6.6, RY = 7.4, FX = 12.6, BX = 19;
const LOOP = [15.8, 3.2];
const NOTCH = 10.1;

export default defineIcon({
  name: 'yo-yo',
  zh: '溜溜球',
  category: 'sports',
  tags: ['yoyo', 'toy', 'string', 'spin', 'play', 'trick', '玩具', '悠悠球'],
  // Two discs on an axle seen at an angle, the string rising from between them to a finger loop; on hover it runs down the string and climbs back.
  svg: (u) => `<circle cx="${LOOP[0]}" cy="${LOOP[1]}" r="2.2" fill="none" stroke-width="1.6" ${DEEPS}/>
    <g data-n="b">${back(u, ellipse(BX, CY, RX, RY), u.loS)}</g>
    <path data-n="s" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    <g data-n="f"><path d="${ellipse(FX + 4, CY, 6, 6.4)}" ${DEEP}/>
    ${back(u, ellipse(FX, CY, RX, RY), u.upS)}
    <path d="${ellipse(FX, CY, 2.6, 3)}" ${SOFT}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const y = 3 * bump(clamp01(p.o));
    at(E.b, { transform: `translate(0 ${f(y)})` });
    at(E.f, { transform: `translate(0 ${f(y)})` });
    at(E.s, { d: `M${LOOP[0]} ${LOOP[1] + 2.2}V${f(NOTCH + 2 + y)}` });
  }
});

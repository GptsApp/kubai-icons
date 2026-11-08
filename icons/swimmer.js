import { defineIcon, f, OL, circ, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

const SHOULDER = [14.6, 15];
// The arm from the shoulder, curving up and forward to the hand.
const ARM = 'M0 0Q-1 -8.6 -7.6 -7.8Q-10.2 -7.4 -10.8 -4.4';
const WAVE = 'M3.6 18.2Q6.6 16.4 9.6 18.2T15.5 18.2T21.4 18.2T27.4 18.2V20.4Q27.4 22.6 25.2 22.6H5.8Q3.6 22.6 3.6 20.4Z';
const BODY = 'M10.8 15.6Q16 12.6 25 15.8V19H10.8Z';

export default defineIcon({
  name: 'swimmer',
  zh: '游泳',
  category: 'sports',
  tags: ['swimming', 'swim', 'pool', 'water sport', 'freestyle', 'beach', '泳池'],
  // A swimmer doing front crawl; on hover the arm over the head reaches on into the water.
  svg: (u) => `${back(u, BODY, u.loS)}
    <g filter="${u.sh}"><g data-n="ao"><path d="${ARM}" fill="none" stroke-width="5" stroke-linecap="round" data-t="stroke:#5393FF"/></g>
      <g filter="${u.hi}"><g data-n="a"><path d="${ARM}" fill="none" stroke="${u.loS}" stroke-width="3" stroke-linecap="round"/></g></g></g>
    ${back(u, circ(9.4, 13.6, 2.9), u.upS)}
    ${front(u, WAVE, u.upS)}`,
  target: (h) => ({ r: h ? -22 : 0 }),
  draw(p, E) {
    const t = `translate(${SHOULDER[0]} ${SHOULDER[1]}) rotate(${f(p.r)})`;
    at(E.a, { transform: t }); at(E.ao, { transform: t });
  }
});

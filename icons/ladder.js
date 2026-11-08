import { defineIcon, f, rr, at } from '../packages/core/src/kit.js';
import { solid } from './_w2-dev.js';

// Three rungs, spaced so a clear gap stays open between each pair.
const RAIL_L = rr(6.4, 1, 3.8, 23, 1.9), RAIL_R = rr(20.8, 1, 3.8, 23, 1.9), STEP = 7.4;
const RUNG = rr(9, -1.3, 13, 2.6, 0.4);

export default defineIcon({
  name: 'ladder',
  zh: '梯子',
  category: 'tools',
  tags: ['climb', 'steps', 'rungs', 'access', 'construction', '爬梯'],
  // A straight ladder; on hover its rungs pass downward as if someone climbs it.
  svg: (u) => `<clipPath id="${u.id('r')}"><path d="M9 2.4H22V22.6H9Z"/></clipPath>
    <g clip-path="url(#${u.id('r')})">${[-1, 0, 1, 2].map((k) => `<g data-n="r${k + 1}">${solid(u, RUNG, u.loS, { sh: false })}</g>`).join('')}</g>
    ${solid(u, RAIL_L, u.upS)}${solid(u, RAIL_R, u.upS)}`,
  target: (h) => ({ s: h ? STEP : 0 }),
  draw(p, E) {
    for (let k = -1; k < 3; k++) at(E[`r${k + 1}`], { transform: `translate(0 ${f(5.1 + k * STEP + p.s)})` });
  }
});

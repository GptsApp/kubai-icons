import { defineIcon, f, OL, DEEPS, rp, at } from '../packages/core/src/kit.js';
import { turn } from './_weather-nature.js';

const C = [15.5, 12.5];
const P = (x, y, a) => turn([C[0] + x, C[1] + y], a, C[0], C[1]).map(f).join(' ');
const ARMS = [0, 60, 120, 180, 240, 300].map((a) => `M${P(0, 0, a)}L${P(0, -11, a)}M${P(-3, -10.2, a)}L${P(0, -7.2, a)}L${P(3, -10.2, a)}`).join('');
const HUB = rp(Array.from({ length: 6 }, (_, i) => turn([C[0], C[1] - 4.6], i * 60 + 30, C[0], C[1])), 1.2);

export default defineIcon({
  name: 'snowflake',
  zh: '雪花',
  category: 'weather',
  tags: ['snow', 'winter', 'cold', 'freeze', 'frost', '冰冻'],
  // A six-armed snowflake round a hexagonal hub; on hover it turns a sixth of a turn.
  svg: (u) => `<g data-n="a"><path d="${ARMS}" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="h"><path d="${HUB}" fill="${u.upS}"/></g></g></g><g data-n="hO"><path d="${HUB}" ${OL}/></g>`,
  target: (h) => ({ rot: h ? 60 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(p.rot)} 15.5 12.5)`;
    ['a', 'h', 'hO'].forEach((n) => at(E[n], { transform: t }));
  }
});

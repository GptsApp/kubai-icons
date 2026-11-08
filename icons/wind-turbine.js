import { defineIcon, f, OL, rp, circ, at } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';
import { leaf } from './_home-food.js';

const C = [15.5, 10.6];
const TOWER = rp([[14.4, 11], [16.6, 11], [17.8, 24], [13.2, 24]], [0.4, 0.4, 1, 1]);
const BLADES = [0, 120, 240].map((a) => {
  const r = a * Math.PI / 180, t = [C[0] + 10 * Math.sin(r), C[1] - 10 * Math.cos(r)];
  return leaf([C[0], C[1]], t, 2.5);
}).join('');

export default defineIcon({
  name: 'wind-turbine',
  zh: '风力发电机',
  category: 'nature',
  tags: ['wind power', 'windmill', 'renewable', 'energy', 'turbine', '风电', '风车'],
  variants: ['bolt'],
  // A wind turbine on its tower; on hover its three blades turn a third of a revolution.
  svg: (u) => `${back(u, TOWER)}
      <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="b"><path d="${BLADES}" fill="${u.upS}"/></g></g></g><g data-n="bO"><path d="${BLADES}" ${OL}/></g>
      ${back(u, circ(C[0], C[1], 2.2))}`,
  target: (h) => ({ a: h ? 120 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(p.a)} ${C[0]} ${C[1]})`;
    at(E.b, { transform: t }); at(E.bO, { transform: t });
  }
});

import { defineIcon, f, DEEP, DEEPS, SOFT, WHITES, rr, circ, at } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';
import { span } from './_devices.js';
import { leaf } from './_home-food.js';

const C = [15.5, 12.4];
const wave = (x, y) => `M${f(x)} ${f(y)}Q${f(x + 1.3)} ${f(y - 1.4)} ${f(x + 2.6)} ${f(y)}T${f(x + 5.2)} ${f(y)}T${f(x + 7.8)} ${f(y)}`;
const BLADES = [0, 120, 240].map((a) => `<path d="${leaf(C, [C[0], C[1] - 3.8], 1.9)}" transform="rotate(${a} ${C[0]} ${C[1]})" ${SOFT}/>`).join('');

export default defineIcon({
  name: 'air-purifier',
  zh: '空气净化器',
  category: 'home',
  tags: ['air purifier', 'air cleaner', 'filter', 'clean air', 'ventilation', '净化器', '空气'],
  variants: ['check', 'clock', 'cog'],
  // An air purifier with a fan behind its round grille; on hover the fan spins and clean air rises from the top.
  svg: (u) => `${back(u, rr(8.4, 4.8, 14.2, 19.2, 3.4))}
      <path d="${circ(C[0], C[1], 4.8)}" fill="#fff"/>
      <g data-n="fan">${BLADES}</g>
      <path d="${circ(C[0], C[1], 1.2)}" ${DEEP}/>
      <path d="M13.4 20.2H17.6" class="ln" ${WHITES}/>
      <path data-n="air" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.fan, { transform: `rotate(${f(240 * p.o)} ${C[0]} ${C[1]})` });
    at(E.air, { d: wave(11.6, 2.4 - 1.2 * p.o), opacity: f(0.35 + 0.65 * span(p.o, 0, 0.6)) });
  }
});

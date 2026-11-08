import { defineIcon, f, DEEPS, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { solid, light } from './_b2-kitchen.js';

const CX = 15.5, NECK = 15, TOP = -3.6, BELLY = 4.2, A = 7.6, INNER = 3.9;
// A wire loop of half-width k from the neck, over the top and back.
const loop = (k) => `M${f(CX - 0.1 * k)} ${NECK}C${f(CX - 0.3 * k)} 12 ${f(CX - k)} ${f(BELLY + 4.4)} ${f(CX - k)} ${BELLY}`
  + `C${f(CX - k)} ${f(BELLY - 4.8)} ${f(CX - 0.56 * k)} ${TOP} ${CX} ${TOP}`
  + `C${f(CX + 0.56 * k)} ${TOP} ${f(CX + k)} ${f(BELLY - 4.8)} ${f(CX + k)} ${BELLY}`
  + `C${f(CX + k)} ${f(BELLY + 4.4)} ${f(CX + 0.3 * k)} 12 ${f(CX + 0.1 * k)} ${NECK}`;
// The two inner loops stand a quarter turn apart, so one is always wide while the other is narrow.
const PHASE = [0, Math.PI / 2];

export default defineIcon({
  name: 'whisk',
  zh: '打蛋器',
  category: 'home',
  tags: ['beater', 'whip', 'baking', 'kitchen', 'cooking', 'mix', '搅拌', '烘焙'],
  variants: [],
  // A balloon whisk of wire loops gathered into a narrow neck; on hover the wires turn round the handle as it beats.
  svg: (u) => `<g data-n="g"><g transform="rotate(40 15.5 12.5)">
      <g fill="none" stroke-linecap="round">
        <path data-n="w1" stroke-width="1.6" ${DEEPS}/><path data-n="w0" stroke-width="1.6" ${DEEPS}/>
        <path d="${loop(A)}" stroke-width="2.2" data-t="stroke:#5393FF"/>
      </g>
      ${solid(u, rr(13.3, 18, 4.4, 9.8, 2.2))}${light(u, rr(14, 14.2, 3, 5, 0.8))}
    </g></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), turn = Math.PI * o;
    at(E.g, { transform: `rotate(${f(rattle(o, 9, 3))} 6.4 23.3)` });
    PHASE.forEach((ph, i) => at(E[`w${i}`], { d: loop(INNER * Math.cos(turn * 2 + ph)) }));
  }
});

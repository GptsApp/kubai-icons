import { defineIcon, f, DEEPS, circ } from '../packages/core/src/kit.js';
import { solid } from './_b5-parts.js';
import { layer, moveAll } from './_science-edu-sports.js';

const C = [15.5, 13.8], D = 9, R0 = 4.6, R1 = 3.4, ANGLES = [-90, 30, 150];

export default defineIcon({
  name: 'molecule',
  zh: '分子',
  category: 'science',
  tags: ['chemistry', 'compound', 'bond', 'atoms', 'structure', '化学', '分子式'],
  variants: ['sparkle'],
  // A ball-and-stick molecule; on hover it turns a third of the way about its central atom.
  svg: (u) => `${ANGLES.map((_, i) => layer(u, `b${i}`, circ(0, 0, R1), u.upS)).join('')}
    ${solid(u, circ(C[0], C[1], R0), u.loS)}
    <g data-n="k">${ANGLES.map((a) => `<path transform="rotate(${a})" d="M${f(R0 - 0.2)} 0H${f(D - R1 + 0.2)}" fill="none" stroke-width="2.6" ${DEEPS}/>`).join('')}</g>`,
  target: (h) => ({ a: h ? 120 : 0 }),
  draw(p, E) {
    ANGLES.forEach((a, i) => {
      const r = (a + p.a) * Math.PI / 180;
      moveAll(E, [`b${i}`], `translate(${f(C[0] + D * Math.cos(r))} ${f(C[1] + D * Math.sin(r))})`);
    });
    E.k.setAttribute('transform', `translate(${C[0]} ${C[1]}) rotate(${f(p.a)})`);
  }
});

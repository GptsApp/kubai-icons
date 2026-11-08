import { defineIcon, f, at, rattle, clamp01, circ } from '../packages/core/src/kit.js';
import { DISC, back } from './_interface.js';

// The two halves of the face either side of the slash, which runs top left to bottom right.
const half = (s) => {
  const n = [s * Math.SQRT1_2, -s * Math.SQRT1_2], d = [Math.SQRT1_2, Math.SQRT1_2], o = 1.7, L = 16, F = 14;
  const p = (a, b) => `${f(15.5 + n[0] * a + d[0] * b)} ${f(12.5 + n[1] * a + d[1] * b)}`;
  return `M${p(o, -L)}L${p(o, L)}L${p(o + F, L)}L${p(o + F, -L)}Z`;
};

export default defineIcon({
  name: 'ban',
  zh: '禁止',
  category: 'interface',
  tags: ['block', 'forbidden', 'prohibited', 'no entry', 'cancel', '屏蔽'],
  // A no-entry sign: a white face cut by the disc's own slash. On hover it shakes, no.
  svg: (u) => `<g data-n="sign">${back(u, DISC)}
    <clipPath id="${u.id('cut')}"><path d="${half(1)}${half(-1)}"/></clipPath>
    <path d="${circ(15.5, 12.5, 7.4)}" fill="#fff" clip-path="url(#${u.id('cut')})"/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.sign, { transform: `rotate(${f(rattle(clamp01(p.o), 10, 3))} 15.5 12.5)` }); }
});

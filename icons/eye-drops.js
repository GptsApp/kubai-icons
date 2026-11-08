import { defineIcon, f, DEEP, circ, clamp01, at, wave } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';
import { live, setD } from './_b5-parts.js';

const EY = 18.2;
const eye = (k) => `M4 ${EY}C8 ${f(EY - 7 * k)} 23 ${f(EY - 7 * k)} 27 ${EY}C23 ${f(EY + 7 * k)} 8 ${f(EY + 7 * k)} 4 ${EY}Z`;
const DROP = 'M0 -5.4C1.3 -2.9 4.5 -0.9 4.5 2.1A4.5 4.5 0 0 1 -4.5 2.1C-4.5 -0.9 -1.3 -2.9 0 -5.4Z';
const smooth = (t) => t * t * (3 - 2 * t);

export default defineIcon({
  name: 'eye-drops',
  zh: '滴眼液',
  category: 'health',
  tags: ['eyedrop', 'eye care', 'optometry', 'dropper', 'eye medicine', '眼药水', '滴眼'],
  // A drop above an open eye; on hover the drop falls in, the eye blinks and a new drop forms.
  svg: (u) => `${live(u, 'ey', u.loS)}
    <g data-n="ir"><path d="${circ(15.5, EY, 4.4)}" fill="#fff"/><path d="${circ(15.5, EY, 2.5)}" ${DEEP}/></g>
    ${layer(u, 'dr', DROP, u.upS)}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    const fall = wave(o, (t) => (t < 0.5 ? smooth(t / 0.5) : 0));
    const grow = wave(o, (t) => (t < 0.5 ? 1 : smooth((t - 0.5) / 0.5)));
    const shut = wave(o, (t) => (t < 0.4 || t > 0.9 ? 0 : Math.sin(Math.PI * (t - 0.4) / 0.5)));
    const y = 5.8 + 11 * fall, s = Math.max(0.02, grow * (1 - 0.55 * fall));
    moveAll(E, ['dr'], `translate(15.5 ${f(y)}) scale(${f(s)})`);
    const k = Math.max(0.08, 1 - shut * 0.92);
    setD(E, 'ey', eye(k));
    at(E.ir, { transform: `translate(0 ${EY}) scale(1 ${f(k)}) translate(0 ${-EY})` });
  }
});

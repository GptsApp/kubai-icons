import { defineIcon, f, DEEPS, at, clamp01 } from '../packages/core/src/kit.js';
import { band } from './_science-edu-sports.js';

const Y0 = 2.6, Y1 = 22.4, AMP = 6.2, PERIOD = 19.8, RUNGS = [4.25, 7.55, 10.85, 14.15, 17.45, 20.75];
const wave = (y, ph) => Math.cos(2 * Math.PI * (y - Y0) / PERIOD + ph);
const strand = (sign, ph) => {
  let d = '';
  for (let i = 0; i <= 40; i++) { const y = Y0 + (Y1 - Y0) * i / 40; d += (i ? 'L' : 'M') + f(15.5 + sign * AMP * wave(y, ph)) + ' ' + f(y); }
  return d;
};

export default defineIcon({
  name: 'dna',
  zh: 'DNA 双螺旋',
  category: 'science',
  tags: ['genetics', 'helix', 'biology', 'gene', '基因', '双螺旋'],
  // A double helix with base pairs between its strands; on hover it twists half a turn.
  svg: (u) => `${RUNGS.map((_, i) => `<path data-n="r${i}" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>`).join('')}
    ${band(u, strand(-1, 0), 3.2, u.upS, 'b')}${band(u, strand(1, 0), 3.2, u.loS, 'a')}`,
  target: (h) => ({ ph: h ? Math.PI : 0 }),
  draw(p, E) {
    const a = strand(1, p.ph), b = strand(-1, p.ph);
    at(E.a, { d: a }); at(E.aE, { d: a }); at(E.b, { d: b }); at(E.bE, { d: b });
    RUNGS.forEach((y, i) => {
      const w = AMP * wave(y, p.ph);
      at(E[`r${i}`], { d: `M${f(15.5 - w)} ${y}H${f(15.5 + w)}`, opacity: f(clamp01((Math.abs(w) - 3.6) / 1.2)) });
    });
  }
});

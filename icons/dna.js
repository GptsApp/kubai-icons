import { defineIcon, f, DEEPS, at, clamp01 } from '../packages/core/src/kit.js';
import { band } from './_science-edu-sports.js';

const Y0 = 2.6, Y1 = 22.4, AMP = 6.2, PERIOD = 19.8, RUNGS = [4.25, 7.55, 10.85, 14.15, 17.45, 20.75], PAD = 0.4;
const wave = (y, ph) => Math.cos(2 * Math.PI * (y - Y0) / PERIOD + ph);
const strand = (sign, ph) => {
  let d = '';
  for (let i = 0; i <= 40; i++) { const y = Y0 + (Y1 - Y0) * i / 40; d += (i ? 'L' : 'M') + f(15.5 + sign * AMP * wave(y, ph)) + ' ' + f(y); }
  return d;
};
// Where the second strand passes in front. A right-handed helix shows the same slant on every
// front pass, so the strands take turns on top from one crossing to the next. The fill's bands
// run a little past the outline's, so their clipped edges never blend on the same pixel.
const frontBands = (ph, pad = 0) => {
  const shift = ph * PERIOD / (2 * Math.PI);
  return [-1, 0, 1].map((n) => {
    const y = Y0 + PERIOD * (n + 0.5) - shift;
    const top = Math.max(y, Y0), end = Math.min(y + PERIOD / 2, Y1);
    return end > top ? `M0 ${f(top - pad)}H31V${f(end + pad)}H0Z` : '';
  }).join('');
};

export default defineIcon({
  name: 'dna',
  zh: 'DNA 双螺旋',
  category: 'science',
  tags: ['genetics', 'helix', 'biology', 'gene', '基因', '双螺旋'],
  // A right-handed double helix with base pairs between its strands; on hover it twists half a turn.
  svg: (u) => `${RUNGS.map((_, i) => `<path data-n="r${i}" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>`).join('')}
    ${band(u, strand(-1, 0), 3.2, u.upS, 'b')}${band(u, strand(1, 0), 3.2, u.loS, 'a')}
    <clipPath id="${u.id('frontE')}"><path data-n="cE" d="${frontBands(0)}"/></clipPath>
    <clipPath id="${u.id('front')}"><path data-n="c" d="${frontBands(0, PAD)}"/></clipPath>
    <path data-n="bFE" clip-path="url(#${u.id('frontE')})" d="${strand(-1, 0)}" fill="none" stroke-width="5.2" stroke-linecap="round" stroke-linejoin="round" data-t="stroke:#5393FF"/>
    <g clip-path="url(#${u.id('front')})"><g filter="${u.hi}"><path data-n="bF" d="${strand(-1, 0)}" fill="none" stroke="${u.upS}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></g></g>`,
  target: (h) => ({ ph: h ? Math.PI : 0 }),
  draw(p, E) {
    const a = strand(1, p.ph), b = strand(-1, p.ph);
    at(E.a, { d: a }); at(E.aE, { d: a }); at(E.b, { d: b }); at(E.bE, { d: b });
    at(E.bF, { d: b }); at(E.bFE, { d: b }); at(E.cE, { d: frontBands(p.ph) }); at(E.c, { d: frontBands(p.ph, PAD) });
    RUNGS.forEach((y, i) => {
      const w = AMP * wave(y, p.ph);
      at(E[`r${i}`], { d: `M${f(15.5 - w)} ${y}H${f(15.5 + w)}`, opacity: f(clamp01((Math.abs(w) - 3.6) / 1.2)) });
    });
  }
});

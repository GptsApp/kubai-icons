import { defineIcon, f, OL, DEEPS, rp, at } from '../packages/core/src/kit.js';

const mask = (t, b) => rp([[6.2, 7], [15.5, t], [24.8, 7], [24.8, 18], [15.5, b], [6.2, 18]], [2.2, 8, 2.2, 2.2, 8, 2.2]);

export default defineIcon({
  name: 'face-mask',
  zh: '口罩',
  category: 'health',
  tags: ['mask', 'surgical mask', 'protection', 'virus', 'hygiene', '防护'],
  // A pleated face mask on its ear loops; on hover it puffs out with a breath.
  svg: (u) => `<clipPath id="${u.id('pl')}"><rect x="0" y="10.4" width="31" height="4.4"/></clipPath>
    <path data-n="loops" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="m" fill="${u.loS}"/></g></g>
    <g clip-path="url(#${u.id('pl')})"><g filter="${u.hi}"><path data-n="pl" fill="${u.upS}"/></g></g>
    <path data-n="mO" ${OL}/>`,
  target: (h) => ({ t: h ? 4 : 5, b: h ? 21.4 : 20.4, w: h ? 0.6 : 0 }),
  draw(p, E) {
    const d = mask(p.t, p.b);
    at(E.m, { d }); at(E.pl, { d }); at(E.mO, { d });
    const w = p.w;
    at(E.loops, { d: `M6.6 8.6C${f(2.6 - w)} 8.4 ${f(2.6 - w)} 16.6 6.6 16.4M24.4 8.6C${f(28.4 + w)} 8.4 ${f(28.4 + w)} 16.6 24.4 16.4` });
  }
});

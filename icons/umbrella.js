import { defineIcon, f, OL, DEEPS, at } from '../packages/core/src/kit.js';

const YB = 13.4;

export default defineIcon({
  name: 'umbrella',
  zh: '雨伞',
  category: 'weather',
  tags: ['rain', 'protection', 'insurance', 'cover', 'parasol', '保险'],
  // An umbrella with a lighter middle panel on a hooked handle; on hover it opens wider.
  svg: (u) => `<path d="M15.5 ${YB}V21.4A2.2 2.2 0 0 1 11.1 21.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="cn" fill="${u.loS}"/></g></g><path data-n="cnO" stroke-linejoin="round" ${OL}/>
    <g filter="${u.hi}"><path data-n="gr" fill="${u.upS}"/></g><path data-n="grO" stroke-linejoin="round" ${OL}/>`,
  target: (h) => ({ w: h ? 11.6 : 10.6, top: h ? 2.6 : 1.8 }),
  draw(p, E) {
    const w = p.w, hh = YB - p.top, s = w / 3, dip = YB - 1.8;
    const cn = `M${f(15.5 - w)} ${YB}A${f(w)} ${f(hh)} 0 0 1 ${f(15.5 + w)} ${YB}`
      + `Q${f(15.5 + 2 * s)} ${f(dip)} ${f(15.5 + s)} ${YB}Q15.5 ${f(dip)} ${f(15.5 - s)} ${YB}Q${f(15.5 - 2 * s)} ${f(dip)} ${f(15.5 - w)} ${YB}Z`;
    const gr = `M15.5 ${f(p.top)}A${f(s)} ${f(hh)} 0 0 1 ${f(15.5 + s)} ${YB}Q15.5 ${f(dip)} ${f(15.5 - s)} ${YB}A${f(s)} ${f(hh)} 0 0 1 15.5 ${f(p.top)}Z`;
    at(E.cn, { d: cn }); at(E.cnO, { d: cn }); at(E.gr, { d: gr }); at(E.grO, { d: gr });
  }
});

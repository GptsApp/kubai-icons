import { defineIcon, KR, CR, f, OL, ACC, DEEP, DEEPS, R, rp, rr, arrow, at, scaleAt, bump } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'clipboard-paste',
  zh: '粘贴',
  category: 'text',
  tags: ['paste', 'clipboard', 'insert', 'put', 'edit', '粘贴板'],
  // A clipboard with an arrow pointing down onto its sheet; on hover the arrow pushes down, squashing as it presses, and the line below spreads out as it is pasted.
  svg: (u) => {
    const board = rr(6.3, 2.6, 18.4, 21.2, KR), clip = rp(R(11, 0.8, 9, 4.6), [1.6, 1.6, 1.2, 1.2]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${board}" fill="${u.loS}"/></g></g><path d="${board}" ${OL}/>
      <path d="${rr(8.6, 6.6, 13.8, 15, CR)}" fill="#fff"/>
      <path data-n="ln" d="M12 19.4H19" ${ACC}/>
      <g data-n="ar"><path data-n="sh" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/><path data-n="hd" ${DEEP}/></g>
      <g filter="${u.hi}"><path d="${clip}" fill="${u.upS}"/></g><path d="${clip}" ${OL}/>`;
  },
  target: (h) => ({ y: h ? 1 : 0 }),
  draw(p, E) {
    const a = arrow(15.5, 9.4, 15.5, 15.6, 3, 2.7), o = Math.max(0, Math.min(1, p.y));
    at(E.sh, { d: a.shaft }); at(E.hd, { d: a.head });
    const g = 2 * Math.max(0, (o - 0.3) / 0.7);
    const y = 1.6 * o + 1.5 * bump(o), q = Math.sin(Math.PI * Math.min(1, Math.max(0, (o - 0.25) / 0.5)));
    at(E.ar, { transform: q ? `translate(0 ${f(y)}) ${scaleAt(1 + 0.25 * q, 15.5, 15.6, 1 - 0.18 * q)}` : `translate(0 ${f(y)})` });
    at(E.ln, { d: `M${f(12 - g)} 19.4H${f(19 + g)}` });
  }
});

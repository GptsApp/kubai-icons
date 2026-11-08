import { defineIcon, f, OL, DEEP, DEEPS, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'stethoscope',
  zh: '听诊器',
  category: 'health',
  tags: ['doctor', 'medical', 'checkup', 'diagnosis', 'clinic', '医生'],
  // A stethoscope; on hover its chest piece is lifted to listen, the tube following.
  svg: (u) => `
    <path d="M6 3.4V9C6 13 7.6 15.6 9.2 15.6C10.8 15.6 12.4 13 12.4 9V3.4" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
    <circle cx="6" cy="2.4" r="1.5" ${DEEP}/><circle cx="12.4" cy="2.4" r="1.5" ${DEEP}/>
    <path data-n="tube" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g data-n="cp"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(21, 0, 5)}" fill="${u.loS}"/></g></g><path d="${circ(21, 0, 5)}" ${OL}/>
      <g filter="${u.hi}"><path d="${circ(21, 0, 2)}" fill="${u.upS}"/></g><path d="${circ(21, 0, 2)}" ${OL}/></g>`,
  target: (h) => ({ cy: h ? 9.6 : 11.6 }),
  draw(p, E) {
    at(E.cp, { transform: `translate(0 ${f(p.cy)})` });
    at(E.tube, { d: `M9.2 15.6V18.4C9.2 21.6 11.6 23.2 14.8 23.2C18 23.2 21 21.6 21 18.4V${f(p.cy)}` });
  }
});

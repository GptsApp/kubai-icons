import { defineIcon, f, OL, DEEP, rr, circ, at } from '../packages/core/src/kit.js';
import { polar } from './_security-time-health.js';

const CY = 13.6, CROWN = rr(12.4, 0, 6.2, 2.8, 1.4) + rr(14.4, 2, 2.2, 2.6, 0.4);
const PUSH = polar(15.5, CY, 10.6, 45);

export default defineIcon({
  name: 'stopwatch',
  zh: '秒表',
  category: 'time',
  tags: ['stopwatch', 'lap', 'timing', 'sport', 'measure', '计时'],
  // A stopwatch; on hover its crown is pressed and the hand sweeps once round the dial.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="cr"><path d="${CROWN}" fill="${u.loS}"/></g></g></g><g data-n="crO"><path d="${CROWN}" ${OL}/></g>
    <g transform="translate(${f(PUSH[0])} ${f(PUSH[1])}) rotate(45)"><g filter="${u.hi}"><path d="${rr(-1.5, -1.8, 3, 3.6, 0.8)}" fill="${u.loS}"/></g><path d="${rr(-1.5, -1.8, 3, 3.6, 0.8)}" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, CY, 10)}" fill="${u.loS}"/></g></g>
    <path d="${circ(15.5, CY, 10)}" ${OL}/>
    <path d="${circ(15.5, CY, 7.4)}" fill="#fff"/>
    <path data-n="hand" d="M15.5 ${CY}V${CY - 5.8}" stroke-width="2" stroke-linecap="round" data-t="stroke:#2F6FE0"/>
    <circle cx="15.5" cy="${CY}" r="1.7" ${DEEP}/>`,
  target: (h) => ({ a: h ? 360 : 0, dn: h ? 0.8 : 0 }),
  draw(p, E) {
    at(E.hand, { transform: `rotate(${f(p.a)} 15.5 ${CY})` });
    const t = `translate(0 ${f(p.dn)})`;
    at(E.cr, { transform: t }); at(E.crO, { transform: t });
  }
});

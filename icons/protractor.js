import { defineIcon, f, rattle, clamp01, WHITES } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

const CX = 15.5, CY = 16.8, R = 11.5, IN = 5.6, B = 19.4;
// The half disc and its base, with the half-round window cut out of it (even-odd).
const BODY = `M${CX - R} ${CY}A${R} ${R} 0 0 1 ${CX + R} ${CY}V${B - 1.6}Q${CX + R} ${B} ${CX + R - 1.6} ${B}H${CX - R + 1.6}Q${CX - R} ${B} ${CX - R} ${B - 1.6}Z`
  + `M${CX - IN} ${CY}A${IN} ${IN} 0 0 1 ${CX + IN} ${CY}Q${CX + IN} ${CY + 0.2} ${CX + IN - 0.2} ${CY + 0.2}H${CX - IN + 0.2}Q${CX - IN} ${CY + 0.2} ${CX - IN} ${CY}Z`;
const pt = (r, a) => [CX + r * Math.sin(a * Math.PI / 180), CY - r * Math.cos(a * Math.PI / 180)];
const TICKS = [-60, -30, 0, 30, 60].map((a) => { const s = pt(7.6, a), e = pt(a % 60 ? 9.6 : 10.2, a); return `M${f(s[0])} ${f(s[1])}L${f(e[0])} ${f(e[1])}`; }).join('');

export default defineIcon({
  name: 'protractor',
  zh: '量角器',
  category: 'tools',
  tags: ['protractor', 'angle', 'degrees', 'geometry', 'measure', 'math', '角度'],
  // A protractor with its degree marks; on hover it rocks on its base as if lined up on an
  // angle, then settles.
  svg: (u) => rig(u, 'p', [{ d: BODY, fill: u.loS, rule: 'evenodd' }, `<path d="${TICKS}" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/>`]),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { pose(E, 'p', 2, `rotate(${f(rattle(clamp01(p.o), 12, 2))} ${CX} ${B})`); }
});

import { defineIcon, f, DEEPS, WHITE, circ, rr, clamp01, at } from '../packages/core/src/kit.js';
import { solid } from './_b5-parts.js';

// The case is a crescent: a thick arc about (9, 12.5) with round ends.
const AX = 9, AY = 12.5, RO = 19, RI = 10.4, A = 39 * Math.PI / 180, CAP = (RO - RI) / 2;
const pt = (r, s) => [f(AX + r * Math.cos(A)), f(AY + s * r * Math.sin(A))];
const [ox0, oy0] = pt(RO, -1), [ox1, oy1] = pt(RO, 1), [ix0, iy0] = pt(RI, -1), [ix1, iy1] = pt(RI, 1);
const CASE = `M${ox0} ${oy0}A${RO} ${RO} 0 0 1 ${ox1} ${oy1}A${CAP} ${CAP} 0 0 1 ${ix1} ${iy1}A${RI} ${RI} 0 0 0 ${ix0} ${iy0}A${CAP} ${CAP} 0 0 1 ${ox0} ${oy0}Z`;
const DX = 9.2, DY = 15.8;
const arcAt = (r) => `M${f(DX - r * 0.26)} ${f(DY + r * 0.97)}A${r} ${r} 0 0 1 ${f(DX - r * 0.97)} ${f(DY + r * 0.26)}`;

export default defineIcon({
  name: 'hearing-aid',
  zh: '助听器',
  category: 'health',
  tags: ['hearing', 'deaf', 'audiology', 'ear aid', 'accessibility', '听力', '耳背机'],
  // A behind-the-ear hearing aid: curved case, tube and ear dome; on hover the dome swells and a sound wave spreads from it.
  svg: (u) => `<path d="M19.6 4.4C13.4 -0.6 7.8 3.4 9 12" fill="none" stroke-width="2.6" stroke-linecap="round" ${DEEPS}/>
    ${solid(u, CASE, u.loS)}
    <path d="${rr(21.8, 8.8, 2.8, 7.4, 1.4)}" ${WHITE}/>
    <g data-n="d">${solid(u, circ(DX, DY, 4.4), u.upS)}</g>
    <path data-n="w" d="${arcAt(8)}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), s = 1 + 0.12 * o;
    at(E.d, { transform: `translate(${DX} ${DY}) scale(${f(s)}) translate(${-DX} ${-DY})` });
    at(E.w, { opacity: o > 0.02 ? 1 : 0, 'stroke-dasharray': `${f(11.5 * o)} 40` });
  }
});

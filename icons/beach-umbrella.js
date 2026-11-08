import { defineIcon, f, OL, DEEPS, at, rattle, clamp01 } from '../packages/core/src/kit.js';

// The canopy is a dome of rim radius 11.9 and height 10 over y=12.6, scalloped underneath.
const CX = 15.5, RIM = 12.6, RX = 11.9, RY = 10, APEX = RIM - RY;
const CANOPY = `M3.6 ${RIM}A${RX} ${RY} 0 0 1 27.4 ${RIM}` + [21.45, 15.5, 9.55, 3.6].map((x) => `A2.975 1.5 0 0 0 ${x} ${RIM}`).join('') + 'Z';
const PANEL = 45;

// One stripe between two longitudes (degrees, 0 faces the viewer), bounded by its seams.
function stripe(a, b) {
  const xa = CX + RX * Math.sin(a * Math.PI / 180), xb = CX + RX * Math.sin(b * Math.PI / 180);
  const ra = Math.max(0.001, Math.abs(xa - CX)), rb = Math.max(0.001, Math.abs(xb - CX));
  return `M${f(xa)} 15L${f(xa)} ${RIM}A${f(ra)} ${RY} 0 0 ${xa < CX ? 1 : 0} ${CX} ${APEX}A${f(rb)} ${RY} 0 0 ${xb > CX ? 1 : 0} ${f(xb)} ${RIM}L${f(xb)} 15Z`;
}

export default defineIcon({
  name: 'beach-umbrella',
  zh: '遮阳伞',
  category: 'travel',
  tags: ['beach', 'parasol', 'umbrella', 'vacation', 'holiday', 'summer', '海滩', '度假'],
  // A striped beach umbrella planted in the sand; on hover it turns on its pole and sways in
  // the breeze before it stands still.
  svg: (u) => `<path data-n="u0" d="M15.5 12V22.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <clipPath id="${u.id('cn')}"><path d="${CANOPY}"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="u1" d="${CANOPY}" fill="${u.loS}"/></g></g>
    <g data-n="u2" clip-path="url(#${u.id('cn')})"><g filter="${u.hi}"><path data-n="s0" fill="${u.upS}"/><path data-n="s1" fill="${u.upS}"/><path data-n="s2" fill="${u.upS}"/></g></g>
    <path data-n="u3" d="${CANOPY}" ${OL}/>
    <g filter="${u.hi}"><path d="M6 23.8Q15.5 17.6 25 23.8Z" fill="${u.upS}"/></g><path d="M6 23.8Q15.5 17.6 25 23.8Z" ${OL}/>`,
  target: (h) => ({ a: h ? 90 : 0 }),
  draw(p, E) {
    // The sway tips pole and canopy together about the foot of the pole.
    const w = rattle(clamp01(p.a / 90), 7, 3), t = Math.abs(w) < 1e-4 ? '' : `rotate(${f(w)} ${CX} 22.4)`;
    for (let i = 0; i < 4; i++) t ? E['u' + i].setAttribute('transform', t) : E['u' + i].removeAttribute('transform');
    const out = [];
    for (let k = -4; k < 4; k += 2) {
      const a = Math.max(-90, k * PANEL + p.a - 22.5), b = Math.min(90, (k + 1) * PANEL + p.a - 22.5);
      if (b > a) out.push(stripe(a, b));
    }
    for (let i = 0; i < 3; i++) at(E['s' + i], { d: out[i] || 'M0 0' });
  }
});

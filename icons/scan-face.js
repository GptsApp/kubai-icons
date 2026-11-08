import { defineIcon, f, OL, DEEPS, WHITES, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'scan-face',
  zh: '人脸识别',
  category: 'security',
  tags: ['face id', 'face', 'biometric', 'recognition', 'scan', '刷脸'],
  // A face inside the four corners of a scanner frame; on hover the corners close in
  // on the face and it smiles, recognised.
  svg: (u) => {
    const face = circ(15.5, 12.5, 6.4);
    return `<path data-n="fr" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${face}" fill="${u.loS}"/></g></g>
      <path d="${face}" ${OL}/>
      <path d="M12.3 9.6V11.4M18.7 9.6V11.4" fill="none" stroke-width="2.4" stroke-linecap="round" ${WHITES}/>
      <path data-n="sm" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/>`;
  },
  target: (h) => ({ i: h ? 1.2 : 0, sm: h ? 1.6 : 0.8 }),
  draw(p, E) {
    // Four L-shaped corners, inset by p.i from the square keyline.
    const a = 6.3 + p.i, b = 24.7 - p.i, t = 3.3 + p.i, d = 21.7 - p.i, L = 3.6;
    const c = (x, y, sx, sy) => `M${f(x)} ${f(y + sy * L)}V${f(y + sy * 1.6)}Q${f(x)} ${f(y)} ${f(x + sx * 1.6)} ${f(y)}H${f(x + sx * L)}`;
    at(E.fr, { d: c(a, t, 1, 1) + c(b, t, -1, 1) + c(b, d, -1, -1) + c(a, d, 1, -1) });
    at(E.sm, { d: `M12.4 14.6Q15.5 ${f(15.4 + p.sm)} 18.6 14.6` });
  }
});

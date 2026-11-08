import { defineIcon, f, OL, DEEPS, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';

// The frame: a rounded triangle with its inset hole, both shrunk toward the incentre.
const TRI = [[15.5, 8.4], [27, 20.4], [4, 20.4]], T = 2.6;
const FRAME = (() => {
  const s = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const [A, B, C] = TRI, a = s(B, C), b = s(A, C), c = s(A, B), p = a + b + c;
  const I = [(a * A[0] + b * B[0] + c * C[0]) / p, (a * A[1] + b * B[1] + c * C[1]) / p];
  const r = Math.abs((B[0] - A[0]) * (C[1] - A[1]) - (C[0] - A[0]) * (B[1] - A[1])) / p;
  const k = (r - T) / r, inner = TRI.map(([x, y]) => [I[0] + (x - I[0]) * k, I[1] + (y - I[1]) * k]);
  return rp(TRI, 2) + rp(inner.reverse(), 0.8);
})();

export default defineIcon({
  name: 'hanger',
  zh: '衣架',
  category: 'home',
  tags: ['clothes hanger', 'wardrobe', 'closet', 'cloakroom', 'laundry', 'fashion', '衣帽间', '衣柜'],
  variants: [],
  // A clothes hanger with a bar along its foot; it swings on its hook on hover.
  svg: (u) => {
    const bar = rr(4.2, 18, 22.6, 3.6, 1.8);
    return `<g data-n="g"><path d="M15.5 9V3.8C15.5 2 16.8 0.6 18.4 0.6C20 0.6 21.2 1.8 21.2 3.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${FRAME}" fill="${u.loS}"/></g></g><path d="${FRAME}" ${OL}/>
      <g filter="${u.hi}"><path d="${bar}" fill="${u.upS}"/></g><path d="${bar}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 10, 3))} 15.5 3)` }); }
});

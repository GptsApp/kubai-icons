import { defineIcon, f, circ, rr, DEEPS, WHITE, at } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

const ROD = rr(-10.4, -5.2, 18.4, 10.4, 5.2);
const PLACE = 'translate(13.8 14.2) rotate(-35)';

// A flagellum trailing from the rod's back end, its wave travelling with phase t.
const tail = (y0, t) => {
  const pts = [];
  for (let i = 0; i <= 12; i++) {
    const x = 6 + i * 0.6, g = 0.4 + 0.6 * i / 12;
    pts.push([x, y0 + 1.3 * g * Math.sin(i * 0.62 - t)]);
  }
  return 'M' + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L');
};

export default defineIcon({
  name: 'bacteria',
  zh: '细菌',
  category: 'health',
  tags: ['bacteria', 'bacterium', 'germ', 'microbe', 'infection', 'probiotic', '微生物'],
  // A rod-shaped bacterium with trailing flagella; on hover the flagella beat and it swims
  // forward.
  svg: (u) => `<g data-n="fg"><path data-n="f1" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      <path data-n="f2" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/></g>`
    + rig(u, 'b', [{ d: ROD, fill: u.loS }, `<path d="${circ(-4.8, -1, 1.6) + circ(0.6, 1.6, 1.5)}" ${WHITE}/>`]),
  target: (h) => ({ t: h ? Math.PI * 2 : 0, x: h ? -1 : 0 }),
  draw(p, E) {
    const tr = `${PLACE} translate(${f(p.x)} 0)`;
    pose(E, 'b', 2, tr);
    at(E.fg, { transform: tr });
    at(E.f1, { d: tail(-2.4, p.t) }); at(E.f2, { d: tail(2.4, p.t + 1.6) });
  }
});

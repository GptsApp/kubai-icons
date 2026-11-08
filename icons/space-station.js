import { defineIcon, f, DEEPS, WHITES, rr, circ, clamp01, at, bump, DEEP } from '../packages/core/src/kit.js';
import { solid, live, setD } from './_b5-parts.js';

const T = 10.5, B = 14.5, XS = [4, 20.8], W = 6.2;
const panels = (h) => XS.map((x) => rr(x, T - h, W, h, 0.9) + rr(x, B, W, h, 0.9)).join('');
const seams = (h) => XS.map((x) => `M${f(x + W / 2)} ${f(T - h + 1.6)}V${f(T - 1.4)}M${f(x + W / 2)} ${f(B + 1.4)}V${f(B + h - 1.6)}`).join('');
const CORE = rr(12.1, 4.2, 6.8, 16.6, 2.2);

export default defineIcon({
  name: 'space-station',
  zh: '空间站',
  category: 'science',
  tags: ['orbital station', 'iss', 'solar arrays', 'orbit', 'space', '航天', '太空站'],
  // A space station on its truss with four solar arrays; on hover the arrays turn edge-on to the sun and back.
  svg: (u) => `<path d="M6 12.5H25" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    ${live(u, 'p', u.loS)}
    <path data-n="sm" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/>
    ${solid(u, CORE, u.upS)}
    <path d="${circ(15.5, 12.5, 2.2)}" ${DEEP}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const h = 8.4 - 4.2 * bump(clamp01(p.o));
    setD(E, 'p', panels(h));
    at(E.sm, { d: seams(h) });
  }
});

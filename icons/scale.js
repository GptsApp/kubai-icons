import { defineIcon, f, OL, rr, at, clamp01, rattle } from '../packages/core/src/kit.js';
import { back, atAll } from './_commerce-charts.js';

const PIVOT = [15.5, 5.6], ARM = 8, DROP = 8.6, PAN = 4;
const pan = (x, y) => `M${f(x - PAN)} ${f(y)}H${f(x + PAN)}A${PAN} ${PAN} 0 0 1 ${f(x - PAN)} ${f(y)}Z`;

export default defineIcon({
  name: 'scale',
  zh: '天平',
  category: 'commerce',
  tags: ['balance', 'justice', 'law', 'weigh', 'compare', 'legal', '公平', '法律'],
  variants: [],
  // A balance scale; on hover the beam tips under a weight, rocks and settles tilted.
  svg: (u) => `${back(u, rr(14.2, 5, 2.6, 15.8, 0.6), u.loS)}
    ${back(u, rr(10.6, 20, 9.8, 2.8, 1.4), u.upS)}
    <path data-n="hL" fill="none" class="ln" data-t="stroke:#2F6FE0" stroke-linejoin="round"/>
    <path data-n="hR" fill="none" class="ln" data-t="stroke:#2F6FE0" stroke-linejoin="round"/>
    ${back(u, '', u.upS, 'pL')}${back(u, '', u.upS, 'pR')}
    <g data-n="bm"><g filter="${u.hi}"><path d="${rr(5.9, 4.4, 19.2, 2.4, 1.2)}" fill="${u.upS}"/></g><path d="${rr(5.9, 4.4, 19.2, 2.4, 1.2)}" ${OL}/></g>
    <circle cx="15.5" cy="5.6" r="1.7" data-t="fill:#2F6FE0"/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), a = 7 * o + rattle(o, 7, 2), r = a * Math.PI / 180;
    at(E.bm, { transform: `rotate(${f(a)} ${PIVOT[0]} ${PIVOT[1]})` });
    [['L', -1], ['R', 1]].forEach(([s, k]) => {
      const hx = PIVOT[0] + k * ARM * Math.cos(r), hy = PIVOT[1] + k * ARM * Math.sin(r), py = hy + DROP;
      const d = pan(hx, py);
      atAll(E, ['p' + s, 'p' + s + 'O'], { d });
      at(E['h' + s], { d: `M${f(hx - PAN + 0.6)} ${f(py)}L${f(hx)} ${f(hy)}L${f(hx + PAN - 0.6)} ${f(py)}` });
    });
  }
});

import { defineIcon, f, DEEP, R, rp, rr, at, rattle, clamp01, bump, scaleAt } from '../packages/core/src/kit.js';
import { back, front, atAll } from './_commerce-charts.js';

const BOW = rp([[15.5, 14], [8.8, 10.4], [8.8, 17.6]], [0.6, 1.3, 1.3]) + rp([[15.5, 14], [22.2, 17.6], [22.2, 10.4]], [0.6, 1.3, 1.3]);
const KNOT = rr(13.6, 11.6, 3.8, 4.8, 1.2);

export default defineIcon({
  name: 'gift-bag',
  zh: '礼品袋',
  category: 'commerce',
  tags: ['present', 'bag', 'ribbon', 'birthday', 'reward', 'party', '礼物', '礼袋'],
  variants: ['plus', 'check', 'heart', 'star'],
  // A paper bag tied with a ribbon and a big bow; on hover it is lifted by its handle and the bow pops.
  svg: (u) => `${back(u, rr(6.3, 7.4, 18.4, 15.4, 2), u.loS, 'bk')}
    <path data-n="hd" d="M11.4 10V6.8A4.1 4.1 0 0 1 19.6 6.8V10" fill="none" stroke-width="2.2" stroke-linecap="round" data-t="stroke:#2F6FE0"/>
    ${front(u, rp(R(6.3, 9.6, 18.4, 13.2), [1.8, 1.8, 2.2, 2.2]), u.upS, 'fr')}
    <path data-n="rb" d="${rr(13.9, 9.6, 3.2, 13.2, 0)}" fill="#fff"/>
    <g data-n="bw"><path d="${BOW}" ${DEEP}/><path d="${KNOT}" ${DEEP}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    const t = `translate(0 ${f(-1.2 * Math.sin(Math.PI * o / 2))}) rotate(${f(rattle(o, 8, 3))} 15.5 2.7)`;
    atAll(E, ['bk', 'bkO', 'hd', 'fr', 'frO', 'rb'], { transform: t });
    at(E.bw, { transform: `${t} ${scaleAt(1 + 0.22 * bump(o), 15.5, 14)}` });
  }
});

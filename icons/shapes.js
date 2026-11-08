import { defineIcon, f, OL, rr, circ, at } from '../packages/core/src/kit.js';
import { polygon } from './_science-edu-sports.js';

export default defineIcon({
  name: 'shapes',
  zh: '形状',
  category: 'shapes',
  tags: ['shape', 'geometry', 'circle', 'square', 'triangle', '图形', '几何'],
  // A triangle over a square and a circle; on hover the triangle and the square turn in place.
  svg: (u) => {
    const tri = polygon(3, 6.8, 0, 0, 0, 1.4), sq = rr(-4.6, -4.6, 9.2, 9.2, 1.8), ball = circ(21.2, 18.2, 4.6);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="t"><path d="${tri}" fill="${u.loS}"/></g></g></g><g data-n="tO"><path d="${tri}" ${OL}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="s"><path d="${sq}" fill="${u.upS}"/></g></g></g><g data-n="sO"><path d="${sq}" ${OL}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="c" d="${ball}" fill="${u.loS}"/></g></g><path data-n="cO" d="${ball}" ${OL}/>`;
  },
  target: (h) => ({ t: h ? 120 : 0, s: h ? -90 : 0, r: h ? 5 : 4.6 }),
  draw(p, E) {
    const t = `translate(15.5 8) rotate(${f(p.t)})`, s = `translate(9.8 18.2) rotate(${f(p.s)})`;
    at(E.t, { transform: t }); at(E.tO, { transform: t }); at(E.s, { transform: s }); at(E.sO, { transform: s });
    const d = circ(21.2, 18.2, p.r); at(E.c, { d }); at(E.cO, { d });
  }
});

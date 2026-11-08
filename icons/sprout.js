import { defineIcon, f, OL, DEEPS, at } from '../packages/core/src/kit.js';
import { leafShape } from './_weather-nature.js';

const LEFT = leafShape(10.4, 7.4), RIGHT = leafShape(13.4, 9);

export default defineIcon({
  name: 'sprout',
  zh: '新芽',
  category: 'nature',
  tags: ['seedling', 'grow', 'plant', 'eco', 'start', 'growth', '成长'],
  // A seedling with two leaves on its stem; on hover it grows taller and its leaves open.
  svg: (u) => `<path data-n="st" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="l"><path d="${LEFT}" fill="${u.loS}"/></g></g></g><g data-n="lO"><path d="${LEFT}" stroke-linejoin="round" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="r"><path d="${RIGHT}" fill="${u.upS}"/></g></g></g><g data-n="rO"><path d="${RIGHT}" stroke-linejoin="round" ${OL}/></g>`,
  target: (h) => ({ y: h ? 11.6 : 13.4, a: h ? 8 : 0, s: h ? 1.06 : 1 }),
  draw(p, E) {
    at(E.st, { d: `M15.5 23.6V${f(p.y + 1.4)}` });
    const l = `translate(15.5 ${f(p.y + 2.4)}) rotate(${f(-58 - p.a)}) scale(${f(p.s)})`;
    const r = `translate(15.5 ${f(p.y)}) rotate(${f(52 + p.a)}) scale(${f(p.s)})`;
    at(E.l, { transform: l }); at(E.lO, { transform: l }); at(E.r, { transform: r }); at(E.rO, { transform: r });
  }
});

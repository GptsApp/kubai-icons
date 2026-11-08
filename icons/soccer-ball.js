import { defineIcon, f, OL, DEEP, DEEPS, rp, circ, at } from '../packages/core/src/kit.js';
import { regular } from './_science-edu-sports.js';

// A centre patch, a seam from each of its corners and five patches cut by the edge.
const C = regular(5, 4.8, 0, 0, 0);
const SEAMS = regular(5, 7.4, 0, 0, 0).map((q, i) => `M${f(C[i][0])} ${f(C[i][1])}L${f(q[0])} ${f(q[1])}`).join('');
const EDGE = [0, 1, 2, 3, 4].map((i) => {
  const a = i * 72 * Math.PI / 180, cx = 11.6 * Math.sin(a), cy = -11.6 * Math.cos(a);
  return rp(regular(5, 4.8, cx, cy, i * 72 + 36), 0.8);
}).join('');

export default defineIcon({
  name: 'soccer-ball',
  zh: '足球',
  category: 'sports',
  tags: ['football', 'soccer', 'ball', 'sport', 'goal'],
  // A football; on hover it rolls a fifth of a turn.
  svg: (u) => `<clipPath id="${u.id('sb')}"><path d="${circ(15.5, 12.5, 11.5)}"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 11.5)}" fill="${u.upS}"/></g></g>
    <g clip-path="url(#${u.id('sb')})"><g data-n="p">
      <path d="${SEAMS}" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <path d="${rp(C, 0.8) + EDGE}" ${DEEP}/></g></g>
    <path d="${circ(15.5, 12.5, 11.5)}" ${OL}/>`,
  target: (h) => ({ a: h ? 72 : 0 }),
  draw(p, E) { at(E.p, { transform: `translate(15.5 12.5) rotate(${f(p.a)})` }); }
});

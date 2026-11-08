import { defineIcon, f, OL, rp, rr, at, scaleAt } from '../packages/core/src/kit.js';
import { leaf } from './_home-food.js';

export default defineIcon({
  name: 'plant',
  zh: '盆栽',
  category: 'home',
  tags: ['potted plant', 'houseplant', 'leaves', 'garden', 'grow', '绿植', '植物'],
  variants: ['plus', 'check', 'heart'],
  // A potted plant whose leaves grow taller and spread on hover.
  svg: (u) => {
    const pot = rp([[9, 15], [22, 15], [20.4, 23.2], [10.6, 23.2]], [0.6, 0.6, 1.8, 1.8]), rim = rr(7.4, 12.8, 16.2, 3.8, 1.6);
    const lf = (n, d) => `<g data-n="${n}"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${d}" fill="${u.loS}"/></g></g><path d="${d}" ${OL}/></g>`;
    return `${lf('l', leaf([14.6, 14.4], [6.4, 5.4], 3.2))}${lf('r', leaf([16.4, 14.4], [24.6, 5.4], 3.2))}${lf('m', leaf([15.5, 14.4], [15.5, 1.6], 3.6))}
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${pot}" fill="${u.loS}"/></g></g><path d="${pot}" ${OL}/>
      <g filter="${u.hi}"><path d="${rim}" fill="${u.upS}"/></g><path d="${rim}" ${OL}/>`;
  },
  target: (h) => ({ s: h ? 1.08 : 1, a: h ? 7 : 0 }),
  draw(p, E) {
    at(E.m, { transform: scaleAt(p.s, 15.5, 14.4) });
    at(E.l, { transform: `rotate(${f(-p.a)} 14.6 14.4) ${scaleAt(p.s, 14.6, 14.4)}` });
    at(E.r, { transform: `rotate(${f(p.a)} 16.4 14.4) ${scaleAt(p.s, 16.4, 14.4)}` });
  }
});

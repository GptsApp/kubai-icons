import { defineIcon, f, OL, DEEP, DEEPS, R, rp, rr, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'bath',
  zh: '浴缸',
  category: 'home',
  tags: ['bathtub', 'bathroom', 'wash', 'spa', 'relax', '泡澡'],
  // A bathtub under a tap; soap bubbles float up out of it on hover.
  svg: (u) => {
    const tub = rp(R(4.6, 10.6, 21.8, 9.8), [0, 0, 4.6, 4.6]), rim = rr(3.2, 8.8, 24.6, 3.4, 1.7);
    const bubble = (n) => `<g filter="${u.hi}"><path data-n="${n}" fill="${u.upS}"/></g><path data-n="${n}O" ${OL}/>`;
    return `<path d="M7.2 9V5.2Q7.2 3.4 9 3.4H10.6Q12.4 3.4 12.4 5.2V5.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      ${bubble('b1')}${bubble('b2')}
      <path d="${rr(7.6, 19.4, 2.8, 3.6, 0.8) + rr(20.6, 19.4, 2.8, 3.6, 0.8)}" ${DEEP}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${tub}" fill="${u.loS}"/></g></g><path d="${tub}" ${OL}/>
      <g filter="${u.hi}"><path d="${rim}" fill="${u.upS}"/></g><path d="${rim}" ${OL}/>`;
  },
  // Each bubble is [cx, cy, r]; at rest both sit hidden in the tub.
  target: (h) => ({ b1: h ? [16, 4.4, 2.2] : [16.6, 14, 1.6], b2: h ? [22, 2.6, 1.6] : [21, 14, 1.4] }),
  draw(p, E) {
    ['b1', 'b2'].forEach((n) => { const d = circ(...p[n]); at(E[n], { d }); at(E[`${n}O`], { d }); });
  }
});

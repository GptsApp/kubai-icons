import { defineIcon, KR, f, OL, rp, rr, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'factory',
  zh: '工厂',
  category: 'home',
  tags: ['industry', 'plant', 'manufacturing', 'production', '厂房'],
  variants: ['check', 'x', 'plus', 'cog'],
  // A sawtooth-roofed factory; puffs of smoke rise from its chimney on hover.
  svg: (u) => {
    const chimney = rr(20.6, 4.4, 4.6, 12, 1.2);
    const body = rp([[4, 22.8], [4, 12.6], [10.4, 8.6], [10.4, 12.6], [16.8, 8.6], [16.8, 12.6], [27, 12.6], [27, 22.8]],
      [KR, 0.8, 0.8, 0.4, 0.8, 0.4, 1.4, KR]);
    const puff = (n) => `<g filter="${u.hi}"><path data-n="${n}" fill="${u.upS}"/></g><path data-n="${n}O" ${OL}/>`;
    return `${puff('p1')}${puff('p2')}
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${chimney}" fill="${u.loS}"/></g></g><path d="${chimney}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.upS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${rr(6.8, 15.6, 3.4, 3.4, 0.8) + rr(13.8, 15.6, 3.4, 3.4, 0.8) + rr(20.8, 15.6, 3.4, 3.4, 0.8)}" fill="#fff"/>`;
  },
  // Each puff is [cx, cy, r]; at rest both sit small inside the chimney.
  target: (h) => ({ p1: h ? [22.2, 1.4, 2.2] : [22.9, 7.4, 0.6], p2: h ? [26.6, -0.4, 1.5] : [22.9, 7.4, 0.6] }),
  draw(p, E) {
    ['p1', 'p2'].forEach((n) => {
      const d = circ(p[n][0], p[n][1], p[n][2]);
      at(E[n], { d }); at(E[`${n}O`], { d });
    });
  }
});

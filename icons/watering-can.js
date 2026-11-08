import { defineIcon, KR, f, OL, DEEP, rp, rr, at, clamp01 } from '../packages/core/src/kit.js';
import { flame } from './_home-food.js';

export default defineIcon({
  name: 'watering-can',
  zh: '浇水壶',
  category: 'home',
  tags: ['garden', 'gardening', 'plant', 'water', 'watering', 'sprinkle', '浇花', '花洒'],
  variants: ['clock'],
  // A watering can; on hover it tips forward and drops fall from its rose.
  svg: (u) => {
    const body = rp([[6.4, 10.6], [17.6, 10.6], [19, 23.2], [5, 23.2]], [KR, KR, KR, KR]), handle = rr(1.6, 9, 8, 10.6, 3.6) + rr(3.8, 11.2, 3.6, 6.2, 1.4);
    const cap = rr(8.6, 8.6, 6.8, 3.2, 1.2);
    const spout = rp([[17.6, 16.6], [22.2, 9.8], [24.2, 11.2], [18.6, 20.6]], [0.6, 0.6, 0.6, 0.6]);
    const rose = rr(-2.2, -1.6, 4.4, 3.2, 1.2);
    const drop = (n, x, y) => `<path data-n="${n}" d="${flame(x, y, 2.6, 4)}" ${DEEP}/>`;
    return `${drop('d1', 25.2, 17.6)}${drop('d2', 27.8, 20.2)}<g data-n="g">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${handle}" fill-rule="evenodd" fill="${u.loS}"/></g></g><path d="${handle}" fill-rule="evenodd" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${spout}" fill="${u.loS}"/></g></g><path d="${spout}" ${OL}/>
      <g transform="translate(23.4 9.6) rotate(36)"><g filter="${u.hi}"><path d="${rose}" fill="${u.upS}"/></g><path d="${rose}" ${OL}/></g>
      <g filter="${u.hi}"><path d="${cap}" fill="${u.upS}"/></g><path d="${cap}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.g, { transform: `rotate(${f(14 * o)} 19 23.2)` });
    [['d1', 0.3], ['d2', 0.45]].forEach(([n, t]) => {
      const k = clamp01((o - t) / (1 - t));
      at(E[n], { opacity: f(k), transform: `translate(0 ${f(-2 + 2 * k)})` });
    });
  }
});

import { defineIcon, f, OL, ellipse, at } from '../packages/core/src/kit.js';

// Three stacked discs; each is a side wall under a lighter top face.
const X0 = 6.3, X1 = 24.7, RX = 9.2, RY = 2.8, HS = 5.4, TOP = [4.4, 9.8, 15.2];
const wall = (y) => `M${X0} ${f(y)}V${f(y + HS)}A${RX} ${RY} 0 0 0 ${X1} ${f(y + HS)}V${f(y)}Z`;

export default defineIcon({
  name: 'database',
  zh: '数据库',
  category: 'development',
  tags: ['data', 'storage', 'sql', 'db', 'records', '存储'],
  variants: ['plus', 'minus', 'check', 'x', 'search', 'lock', 'sync', 'cog', 'alert'],
  // A stack of three data discs; on hover the top disc lifts clear of the others.
  svg: (u) => [2, 1, 0].map((i) => `<g data-n="g${i}">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${wall(TOP[i])}" fill="${u.loS}"/></g></g><path d="${wall(TOP[i])}" ${OL}/>
      <g filter="${u.hi}"><path d="${ellipse(15.5, TOP[i], RX, RY)}" fill="${u.upS}"/></g><path d="${ellipse(15.5, TOP[i], RX, RY)}" ${OL}/></g>`).join(''),
  target: (h) => ({ y: h ? [-3.6, 0.4, 0.4] : [0, 0, 0] }),
  draw(p, E) { p.y.forEach((y, i) => at(E['g' + i], { transform: `translate(0 ${f(y)})` })); }
});

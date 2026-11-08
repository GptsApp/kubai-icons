import { defineIcon, f, OL, DEEP, at } from '../packages/core/src/kit.js';

const CRACK = 'L16.6 18.4L14.4 14.2L16.8 10.2L14.2 6.4Z';
const HALVES = {
  l: { d: `M15.5 2.5A10 10 0 0 0 15.5 22.5${CRACK}`, chips: [[10.4, 10.2], [11.6, 17]] },
  r: { d: `M15.5 2.5A10 10 0 0 1 15.5 22.5${CRACK}`, chips: [[20.2, 12]] }
};

export default defineIcon({
  name: 'cookie',
  zh: '饼干',
  category: 'food',
  tags: ['biscuit', 'snack', 'dessert', 'chocolate chip', 'cookies', 'consent', '曲奇'],
  variants: ['check', 'x', 'cog'],
  // A chocolate-chip cookie that breaks in two along a crack on hover.
  svg: (u) => Object.entries(HALVES).map(([n, h]) => `<g data-n="${n}">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${h.d}" fill="${u.loS}"/></g></g>
      <path d="${h.d}" ${OL}/>
      ${h.chips.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" ${DEEP}/>`).join('')}</g>`).join(''),
  target: (h) => ({ x: h ? 2.6 : 0, a: h ? 6 : 0 }),
  draw(p, E) {
    at(E.l, { transform: `translate(${f(-p.x)} ${f(p.x * 0.2)}) rotate(${f(-p.a)} 15.5 12.5)` });
    at(E.r, { transform: `translate(${f(p.x)} ${f(-p.x * 0.2)}) rotate(${f(p.a)} 15.5 12.5)` });
  }
});

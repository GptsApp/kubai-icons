import { defineIcon, f, DEEP, rr, at } from '../packages/core/src/kit.js';
import { solid, circCW } from './_devices.js';

const bud = (cx) => circCW(cx, 9, 3.6) + rr(cx - 1.5, 9, 3, 9, 1.5);

export default defineIcon({
  name: 'earbuds',
  zh: '无线耳机',
  category: 'devices',
  tags: ['airpods', 'earphones', 'wireless', 'headphones', 'audio', '耳机'],
  variants: ['plus', 'check', 'x', 'bolt'],
  // Two earbuds in their charging case; on hover they lift out and tilt apart.
  svg: (u) => `<g data-n="l">${solid(u, bud(10.6), u.loS)}</g><g data-n="r">${solid(u, bud(20.4), u.loS)}</g>
      ${solid(u, rr(5.2, 13.4, 20.6, 10.2, 4), u.upS)}
      <circle cx="15.5" cy="18.6" r="1.3" ${DEEP}/>`,
  target: (h) => ({ y: h ? -2.6 : 0, a: h ? 9 : 0 }),
  draw(p, E) {
    at(E.l, { transform: `translate(0 ${f(p.y)}) rotate(${f(-p.a)} 10.6 15)` });
    at(E.r, { transform: `translate(0 ${f(p.y)}) rotate(${f(p.a)} 20.4 15)` });
  }
});

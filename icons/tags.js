import { defineIcon, f, OL, rp, at, clamp01 } from '../packages/core/src/kit.js';

// A tag centred on the origin, pointing left, with its hole.
const TAG = rp([[-8.2, 0], [-3.2, -5.6], [8.2, -5.6], [8.2, 5.6], [-3.2, 5.6]], [1.4, 1.4, 1.8, 1.8, 1.4]);
const tag = (u, n, fill) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="${n}"><path d="${TAG}" fill="${fill}"/><circle cx="-2.8" r="1.8" fill="#fff"/></g></g></g>
  <g data-n="${n}O"><path d="${TAG}" ${OL}/></g>`;

export default defineIcon({
  name: 'tags',
  zh: '多个标签',
  category: 'commerce',
  tags: ['tags', 'labels', 'categories', 'price tags', 'keywords', '标签'],
  variants: ['plus', 'minus', 'check', 'x', 'search'],
  // Two hanging tags, one behind the other; on hover they swing, the back one lagging behind.
  svg: (u) => tag(u, 'b', u.loS) + tag(u, 'f', u.upS),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    const b = `translate(18 10.2) rotate(${f(-34 + 8 * clamp01(o * 1.4 - 0.4))})`, fr = `translate(13.4 14.8) rotate(${f(-34 + 12 * o)})`;
    at(E.b, { transform: b }); at(E.bO, { transform: b }); at(E.f, { transform: fr }); at(E.fO, { transform: fr });
  }
});

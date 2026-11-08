import { defineIcon, f, DEEPS, rr, rattle, clamp01, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

const HAND = 'M11.6 17V8C11.6 4 14.4 1.2 18 1.2C21.6 1.2 24.4 4 24.4 8V17Z';
const THUMB = 'M11.6 16.4L6.3 11.4A2.9 2.9 0 0 1 10.4 7.3L15 11.9Z';
const CUFF = rr(9, 15.2, 18, 9, 2.2);

export default defineIcon({
  name: 'mitten',
  zh: '手套',
  category: 'commerce',
  tags: ['glove', 'mitt', 'winter', 'clothing', 'knit', 'warm', '连指手套', '保暖'],
  variants: ['plus', 'check', 'heart'],
  // A knitted mitten with a short thumb and a deep ribbed cuff; on hover it waves and the thumb opens out.
  svg: (u) => `<g transform="translate(-1.6 0.2) rotate(9 18 13)"><g data-n="g"><g data-n="t">${back(u, THUMB, u.upS)}</g>${back(u, HAND, u.loS)}
    ${front(u, CUFF, u.upS)}
    <path d="M12 18V21.4M16 18V21.4M20 18V21.4M24 18V21.4" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/></g></g>`,
  target: (h) => ({ o: h ? 1 : 0, t: h ? -13 : 0 }),
  draw(p, E) {
    at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 11, 3))} 18 24)` });
    at(E.t, { transform: `rotate(${f(p.t)} 13 15)` });
  }
});

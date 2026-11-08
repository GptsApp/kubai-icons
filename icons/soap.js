import { defineIcon, circ, rr, ACC } from '../packages/core/src/kit.js';
import { back, front, liveFront, setPath } from './_b1-home.js';

export default defineIcon({
  name: 'soap',
  zh: '肥皂',
  category: 'home',
  tags: ['bar', 'bubbles', 'wash', 'clean', 'hygiene', 'bathroom', '香皂', '泡泡', '洗手'],
  // A bar of soap under its bubbles; the bubbles swell and float up on hover.
  svg: (u) => `${liveFront(u, 'b3')}${liveFront(u, 'b1')}${liveFront(u, 'b2')}
      ${back(u, rr(4.2, 13.2, 22.6, 10.8, 5))}${front(u, rr(4.2, 10.4, 22.6, 10.6, 5))}
      <path d="${rr(10.2, 13.6, 10.6, 4.2, 2.1)}" fill="none" ${ACC}/>`,
  target: (h) => ({ b1: h ? [22.4, 2.6, 3.8] : [21.2, 5, 3.2], b2: h ? [13.4, 0.8, 2.8] : [13.2, 4.8, 2.4], b3: h ? [6.6, 5.4, 2] : [8, 14, 1.2] }),
  draw(p, E) { ['b1', 'b2', 'b3'].forEach((n) => setPath(E, n, circ(...p[n]))); }
});

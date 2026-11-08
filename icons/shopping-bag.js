import { defineIcon, f, R, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { back, front, atAll } from './_commerce-charts.js';

export default defineIcon({
  name: 'shopping-bag',
  zh: '购物袋',
  category: 'commerce',
  tags: ['bag', 'shop', 'buy', 'purchase', 'order', '购物'],
  variants: ['plus', 'minus', 'check', 'x', 'heart', 'star', 'clock', 'search'],
  // A paper shopping bag; on hover it is lifted by its handle and swings to rest.
  svg: (u) => `${back(u, rr(6.3, 7.4, 18.4, 15.4, 2), u.loS, 'bk')}
    <path data-n="hd" d="M11.4 10V6.8A4.1 4.1 0 0 1 19.6 6.8V10" fill="none" stroke-width="2.2" stroke-linecap="round" data-t="stroke:#2F6FE0"/>
    ${front(u, rp(R(6.3, 9.6, 18.4, 13.2), [1.8, 1.8, 2.2, 2.2]), u.up(13.2), 'fr')}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    const t = `translate(0 ${f(-1.2 * Math.sin(Math.PI * o / 2))}) rotate(${f(rattle(o, 9, 3))} 15.5 2.7)`;
    atAll(E, ['bk', 'bkO', 'hd', 'fr', 'frO'], { transform: t });
  }
});

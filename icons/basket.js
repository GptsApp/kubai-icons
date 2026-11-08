import { defineIcon, f, R, rp, rr, at, clamp01 } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

export default defineIcon({
  name: 'basket',
  zh: '购物篮',
  category: 'commerce',
  tags: ['shopping basket', 'cart', 'buy', 'groceries', 'order', '菜篮'],
  variants: ['plus', 'minus', 'check', 'x', 'heart', 'clock'],
  // A shopping basket with a handle; on hover a parcel drops into it.
  svg: (u) => `<path d="M8.4 10.2V7.8A7.1 5.4 0 0 1 22.6 7.8V10.2" fill="none" stroke-width="2.2" stroke-linecap="round" data-t="stroke:#2F6FE0"/>
    <g data-n="box">${back(u, rr(0, 0, 6.4, 6.4, 1.2), u.upS)}</g>
    ${back(u, rp([[5.6, 11.8], [25.4, 11.8], [23.2, 22.8], [7.8, 22.8]], [0, 0, 2.2, 2.2]), u.loS)}
    <path d="M12.6 15.8V19.6M18.4 15.8V19.6" class="ln" stroke="#fff" data-w="stroke" stroke-linecap="round"/>
    ${front(u, rr(4, 9.6, 23, 4, 2), u.upS)}`,
  target: (h) => ({ y: h ? 7.2 : 0.4, o: h ? 1 : 0 }),
  draw(p, E) { at(E.box, { transform: `translate(12.3 ${f(p.y)})`, opacity: f(clamp01(p.o * 2)) }); }
});

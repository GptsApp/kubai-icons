import { defineIcon, f, WHITES, at } from '../packages/core/src/kit.js';
import { back } from './_commerce-charts.js';

const CROWN = 'M4 17.4C4 10 7.8 5.4 12 5.4C16 5.4 18.8 9.4 19 19H5.6Q4 19 4 17.4Z';
const BILL = 'M16 14.4H21.6C25.6 14.4 28.4 16.8 28.4 19.2C28.4 20.6 27.4 21.4 26 21.4H18Q16 21.4 16 19.4Z';
const SEAM = 'M12 6.8C9.6 9.2 8.4 13 8.4 17.4';

export default defineIcon({
  name: 'baseball-cap',
  zh: '棒球帽',
  category: 'commerce',
  tags: ['hat', 'cap', 'clothing', 'headwear', 'sports', 'fashion', '帽子', '鸭舌帽'],
  variants: ['plus', 'check', 'heart'],
  // A baseball cap side on with its long bill forward; on hover it tips up off the head.
  svg: (u) => `<g data-n="g">${back(u, BILL, u.upS)}${back(u, CROWN, u.loS)}
    <path d="${SEAM}" class="ln" ${WHITES}/></g>`,
  target: (h) => ({ a: h ? -11 : 0, y: h ? -1.4 : 0 }),
  draw(p, E) { at(E.g, { transform: `translate(-0.7 ${f(-0.9 + p.y)}) rotate(${f(p.a)} 5 19)` }); }
});

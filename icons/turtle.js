import { defineIcon, f, OL, DEEP, WHITES, rp, rr, circ, at } from '../packages/core/src/kit.js';
import { layer, move } from './_w2-people.js';

const SHELL = 'M4.4 16.6C4.4 9.6 9 5.4 13.8 5.4C18.6 5.4 23.2 9.6 23.2 16.6Z';
const RIM = rr(3, 15.4, 21.6, 3.6, 1.8);
const LEG = rr(-1.8, 0, 3.6, 5.2, 1.6);
const HEAD = circ(0, 0, 3);

export default defineIcon({
  name: 'turtle',
  zh: '乌龟',
  category: 'nature',
  tags: ['turtle', 'tortoise', 'slow', 'reptile', 'animal', 'pet', '海龟'],
  // A turtle under its domed shell; on hover it stretches its head out and takes a step.
  svg: (u) => `${layer(u, LEG, u.upS, 'l1')}${layer(u, LEG, u.upS, 'l2')}
    <g data-n="hd">${layer(u, HEAD, u.upS)}<circle cx="0.8" cy="-0.6" r="1.2" ${DEEP}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${SHELL}" fill="${u.loS}"/></g></g><path d="${SHELL}" ${OL}/>
    <path d="${rp([[13.8, 8.6], [16.6, 10.2], [16.6, 13.4], [13.8, 15], [11, 13.4], [11, 10.2]], 0.6)}" fill="none" class="ln" stroke-linejoin="round" ${WHITES}/>
    <g filter="${u.hi}"><path d="${RIM}" fill="${u.upS}"/></g><path d="${RIM}" ${OL}/>`,
  target: (h) => ({ hd: h ? [25.4, 11] : [24.2, 12.6], s: h ? 1 : 0 }),
  draw(p, E) {
    at(E.hd, { transform: `translate(${f(p.hd[0])} ${f(p.hd[1])})` });
    move(E, 'l1', `translate(${f(8 - 0.8 * p.s)} 17.4) rotate(${f(12 * p.s)})`);
    move(E, 'l2', `translate(${f(19.4 + 0.8 * p.s)} 17.4) rotate(${f(-12 * p.s)})`);
  }
});

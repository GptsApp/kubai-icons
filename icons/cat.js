import { defineIcon, f, OL, WHITE, rp, ellipse, clamp01, rattle, at } from '../packages/core/src/kit.js';
import { move } from './_w2-people.js';

const HEAD = ellipse(15.5, 14.4, 10.2, 8.6);
const EAR = rp([[-3.8, 2], [-0.4, -6.4], [3.8, 2]], [1.2, 1.4, 1.2]);
const INNER = rp([[-1.8, 1.2], [-0.4, -3], [1.6, 1.2]], [0.5, 0.6, 0.5]);
const ear = (u, n) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="${n}"><path d="${EAR}" fill="${u.loS}"/><path d="${INNER}" fill="${u.upS}"/></g></g></g><g data-n="${n}O"><path d="${EAR}" stroke-linejoin="round" ${OL}/></g>`;

export default defineIcon({
  name: 'cat',
  zh: '猫',
  category: 'nature',
  tags: ['cat', 'kitten', 'pet', 'animal', 'feline', '小猫', '宠物'],
  variants: ['heart'],
  // A cat's face with pointed ears; on hover one ear twitches and its eyes narrow contentedly.
  svg: (u) => `${ear(u, 'l')}${ear(u, 'r')}
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${HEAD}" fill="${u.loS}"/></g></g><path d="${HEAD}" ${OL}/>
    <g ${WHITE}><path data-n="e1"/><path data-n="e2"/><path d="${rp([[13.9, 16.8], [17.1, 16.8], [15.5, 18.8]], [0.5, 0.5, 0.6])}"/></g>`,
  target: (h) => ({ o: h ? 1 : 0, ey: h ? 1.3 : 2.2 }),
  draw(p, E) {
    move(E, 'l', 'translate(9.2 7.8) rotate(-14)');
    move(E, 'r', `translate(21.8 7.8) rotate(${f(14 + rattle(clamp01(p.o), 16, 3))})`);
    at(E.e1, { d: ellipse(11.4, 13.6, 1.7, p.ey) }); at(E.e2, { d: ellipse(19.6, 13.6, 1.7, p.ey) });
  }
});

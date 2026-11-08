import { defineIcon, f, OL, WHITE, rp, rr, ellipse } from '../packages/core/src/kit.js';
import { move } from './_w2-people.js';

const HEAD = ellipse(15.5, 16.4, 8.6, 7.2);
const EAR = rr(-2.8, -11.6, 5.6, 13, 2.8);
const INNER = rr(-1.2, -9.8, 2.4, 8.6, 1.2);
const ear = (u, n) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="${n}"><path d="${EAR}" fill="${u.loS}"/><path d="${INNER}" fill="${u.upS}"/></g></g></g><g data-n="${n}O"><path d="${EAR}" ${OL}/></g>`;

export default defineIcon({
  name: 'rabbit',
  zh: '兔子',
  category: 'nature',
  tags: ['rabbit', 'bunny', 'hare', 'pet', 'animal', 'easter', '小兔'],
  variants: ['heart'],
  // A rabbit's face with two long ears; on hover one ear flops over to the side.
  svg: (u) => `${ear(u, 'l')}${ear(u, 'r')}
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${HEAD}" fill="${u.loS}"/></g></g><path d="${HEAD}" ${OL}/>
    <g ${WHITE}><circle cx="12" cy="15.4" r="1.5"/><circle cx="19" cy="15.4" r="1.5"/><path d="${rp([[14.1, 18.4], [16.9, 18.4], [15.5, 20.2]], [0.5, 0.5, 0.6])}"/></g>`,
  target: (h) => ({ r: h ? 58 : 10 }),
  draw(p, E) {
    move(E, 'l', 'translate(12.4 11.4) rotate(-10)');
    move(E, 'r', `translate(18.6 11.4) rotate(${f(p.r)})`);
  }
});

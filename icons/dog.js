import { defineIcon, f, OL, DEEP, DEEPS, R, rp, rr, ellipse, clamp01, rattle, at } from '../packages/core/src/kit.js';
import { layer, move } from './_w2-people.js';

const HEAD = rp(R(7.6, 3.6, 15.8, 17.4), [6.8, 6.8, 6.2, 6.2]);
const EAR = rr(-2.7, -1, 5.4, 11.6, 2.7);
const MUZZLE = ellipse(15.5, 17, 5.4, 4.4);

export default defineIcon({
  name: 'dog',
  zh: '狗',
  category: 'nature',
  tags: ['dog', 'puppy', 'pet', 'animal', 'canine', '小狗', '宠物'],
  variants: ['heart'],
  // A dog's face with floppy ears and a lighter muzzle; on hover it tilts its head and its ears flap up.
  svg: (u) => `<g data-n="g"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${HEAD}" fill="${u.loS}"/></g></g><path d="${HEAD}" ${OL}/>
    <g fill="#fff" data-w="fill"><circle cx="12" cy="11" r="1.5"/><circle cx="19" cy="11" r="1.5"/></g>
    <g filter="${u.hi}"><path d="${MUZZLE}" fill="${u.upS}"/></g><path d="${MUZZLE}" ${OL}/>
    <path d="${ellipse(15.5, 14.8, 2.2, 1.5)}" ${DEEP}/>
    <path d="M15.5 16.2V17.6M13.2 18.4Q15.5 20 17.8 18.4" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
    ${layer(u, EAR, u.loS, 'l')}${layer(u, EAR, u.loS, 'r')}</g>`,
  target: (h) => ({ o: h ? 1 : 0, ear: h ? 9 : 0 }),
  draw(p, E) {
    at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 4, 2) - 5 * clamp01(p.o))} 15.5 21)` });
    move(E, 'l', `translate(8.2 4.6) rotate(${f(18 + p.ear)})`);
    move(E, 'r', `translate(22.8 4.6) rotate(${f(-18 - p.ear)})`);
  }
});

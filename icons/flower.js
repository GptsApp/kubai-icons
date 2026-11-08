import { defineIcon, f, OL, circ, at } from '../packages/core/src/kit.js';

const PETALS = Array.from({ length: 5 }, (_, i) => {
  const a = i * 72 * Math.PI / 180;
  return circ(6.4 * Math.sin(a), -6.4 * Math.cos(a), 4.9);
}).join('');
const HEART = circ(0, 0, 3.8);

export default defineIcon({
  name: 'flower',
  zh: '花',
  category: 'nature',
  tags: ['flower', 'bloom', 'blossom', 'spring', 'garden', '花朵'],
  variants: ['heart'],
  // Five petals round a lighter heart; on hover the flower opens a little wider and turns.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="p"><path d="${PETALS}" fill="${u.loS}"/></g></g></g><g data-n="pO"><path d="${PETALS}" ${OL}/></g>
    <g filter="${u.hi}"><g data-n="h"><path d="${HEART}" fill="${u.upS}"/></g></g><g data-n="hO"><path d="${HEART}" ${OL}/></g>`,
  target: (h) => ({ rot: h ? 36 : 0, s: h ? 1.06 : 1 }),
  draw(p, E) {
    const t = `translate(15.5 12.5) rotate(${f(p.rot)}) scale(${f(p.s)})`;
    at(E.p, { transform: t }); at(E.pO, { transform: t });
    const c = `translate(15.5 12.5) scale(${f(2 - p.s)})`;
    at(E.h, { transform: c }); at(E.hO, { transform: c });
  }
});

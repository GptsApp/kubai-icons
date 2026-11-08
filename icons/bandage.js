import { defineIcon, CR, f, OL, WHITE, rr, circ, at } from '../packages/core/src/kit.js';

const STRIP = rr(-11.4, -4.8, 22.8, 9.6, 4.8), PAD = rr(-4, -2.6, 8, 5.2, CR);
const HOLES = circ(-7.8, 0, 1.2) + circ(7.8, 0, 1.2);

export default defineIcon({
  name: 'bandage',
  zh: '创可贴',
  category: 'health',
  tags: ['plaster', 'band aid', 'wound', 'injury', 'first aid', '绷带'],
  // An adhesive bandage laid at an angle; on hover it is pulled taut, ready to stick.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="s"><path d="${STRIP}" fill="${u.loS}"/></g></g></g>
    <g data-n="so"><path d="${STRIP}" ${OL}/><path d="${PAD}" fill="#fff"/><path d="${HOLES}" ${WHITE}/></g>`,
  target: (h) => ({ sx: h ? 1.07 : 1, sy: h ? 0.94 : 1 }),
  draw(p, E) {
    const t = `translate(15.5 12.5) rotate(-45) scale(${f(p.sx)} ${f(p.sy)})`;
    at(E.s, { transform: t }); at(E.so, { transform: t });
  }
});

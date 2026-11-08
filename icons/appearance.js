import { defineIcon, f, OL, circ, frontPiece, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'appearance',
  zh: '外观',
  category: 'interface',
  tags: ['theme', 'contrast', 'dark mode', 'light mode'],
  // Light and dark halves of one disc; hover turns the light half across.
  svg: (u) => {
    const disc = [15.5, 12.5, 11.5], half = frontPiece(disc, disc, 12.5, 2);
    return `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 11.5)}" fill="${u.loS}"/></g></g>
    <path d="${circ(15.5, 12.5, 11.5)}" ${OL}/>
    <g filter="${u.hi}"><g data-n="half"><path d="${half}" fill="${u.upS}"/></g></g>
    <g data-n="halfO"><path d="${half}" ${OL}/></g>`;
  },
  target: (h) => ({ rot: h ? 90 : -90 }),
  draw(p, E) {
    const t = `rotate(${f(p.rot)} 15.5 12.5)`;
    at(E.half, { transform: t }); at(E.halfO, { transform: t });
  }
});

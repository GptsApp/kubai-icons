import { defineIcon, f, DEEPS } from '../packages/core/src/kit.js';
import { leafShape } from './_weather-nature.js';
import { layer, move } from './_w2-people.js';

const SIDE = leafShape(13.4, 10.4), MID = leafShape(15, 9.2), LEAF = leafShape(9, 6);

export default defineIcon({
  name: 'flower-tulip',
  zh: '郁金香',
  category: 'nature',
  tags: ['tulip', 'flower', 'bloom', 'spring', 'garden', 'gift', '花'],
  variants: ['heart'],
  // A tulip on its stem with a leaf; on hover its two outer petals open outward.
  svg: (u) => `<path d="M15.5 14V23.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g transform="translate(16.2 23.4) rotate(52)">${layer(u, LEAF, u.loS)}</g>
    ${layer(u, SIDE, u.loS, 'l')}${layer(u, SIDE, u.loS, 'r')}${layer(u, MID, u.upS, 'm')}`,
  target: (h) => ({ a: h ? 38 : 27 }),
  draw(p, E) {
    move(E, 'l', `translate(15.5 15.6) rotate(${f(-p.a)})`);
    move(E, 'r', `translate(15.5 15.6) rotate(${f(p.a)})`);
    move(E, 'm', 'translate(15.5 16.2)');
  }
});

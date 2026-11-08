import { defineIcon, f, OL, clamp01, rattle } from '../packages/core/src/kit.js';
import { leafShape } from './_weather-nature.js';
import { layer, move, place } from './_w2-people.js';

const TRUNK = 'M12.2 23.6C13.4 18.4 14.4 13.4 15 8.6H18.2C17.6 13.6 16.8 18.6 16.2 23.6Z';
// Five fronds round the crown, drawn about the origin so the crown can sway as one.
const FRONDS = [-114, -62, -10, 44, 100].map((a) => place(leafShape(11.6, 4.8), 0, 0, a)).join('');

export default defineIcon({
  name: 'tree-palm',
  zh: '棕榈树',
  category: 'nature',
  tags: ['palm', 'palm tree', 'beach', 'tropical', 'vacation', 'island', '椰子树'],
  // A palm tree with a leaning trunk; on hover its fronds sway in the sea breeze.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${TRUNK}" fill="${u.upS}"/></g></g><path d="${TRUNK}" stroke-linejoin="round" ${OL}/>
    ${layer(u, FRONDS, u.loS, 'c', { extra: ' stroke-linejoin="round"' })}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { move(E, 'c', `translate(16.6 8.4) rotate(${f(rattle(clamp01(p.o), 8, 3))})`); }
});

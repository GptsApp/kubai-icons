import { defineIcon, f, OL, circ } from '../packages/core/src/kit.js';
import { leafShape } from './_weather-nature.js';
import { layer, move, place } from './_w2-people.js';

const N = 12;
// The petals stand out from the disc's rim, drawn about the origin so they turn as one.
const PETALS = Array.from({ length: N }, (_, i) => {
  const a = i * 360 / N, r = a * Math.PI / 180;
  return place(leafShape(7.6, 5.4), 4.4 * Math.sin(r), -4.4 * Math.cos(r), a);
}).join('');
const DISC = circ(15.5, 12.5, 5.8);

export default defineIcon({
  name: 'sunflower',
  zh: '向日葵',
  category: 'nature',
  tags: ['sunflower', 'flower', 'summer', 'bloom', 'sunny', 'garden', '葵花'],
  variants: ['heart'],
  // A sunflower with a ring of lighter petals round a darker disc; on hover the petals open and turn.
  svg: (u) => `${layer(u, PETALS, u.upS, 'p', { extra: ' stroke-linejoin="round"' })}
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${DISC}" fill="${u.loS}"/></g></g><path d="${DISC}" ${OL}/>`,
  target: (h) => ({ a: h ? 360 / N / 2 : 0, s: h ? 1.05 : 1 }),
  draw(p, E) { move(E, 'p', `translate(15.5 12.5) rotate(${f(p.a)}) scale(${f(p.s)})`); }
});

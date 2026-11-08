import { defineIcon, f, OL, WHITES, rp, rattle, clamp01, at } from '../packages/core/src/kit.js';
import { front } from './_commerce-charts.js';

const KNOT = rp([[10.6, 1.6], [20.4, 1.6], [18.4, 8], [12.6, 8]], [1.2, 1.2, 0.8, 0.8]);
const BLADE = rp([[12.8, 7], [18.2, 7], [22.6, 19.4], [15.5, 24.6], [8.4, 19.4]], [0.6, 0.6, 1.2, 1.4, 1.2]);

export default defineIcon({
  name: 'necktie',
  zh: '领带',
  category: 'commerce',
  tags: ['tie', 'formal', 'business', 'suit', 'office', 'clothing', '西装', '正装'],
  variants: ['plus', 'check'],
  // A striped necktie hanging from its knot; on hover the blade swings as if caught by a breeze.
  svg: (u) => `<clipPath id="${u.id('b')}"><path d="${BLADE}"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="b"><path d="${BLADE}" fill="${u.loS}"/></g></g></g>
    <g data-n="bO"><path d="${BLADE}" ${OL}/>
      <g clip-path="url(#${u.id('b')})"><path d="M8 14.6L23 9.8M8 20.6L23 15.8" fill="none" stroke-width="2.2" ${WHITES}/></g></g>
    ${front(u, KNOT, u.upS)}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(rattle(clamp01(p.o), 13, 2))} 15.5 7.4)`;
    at(E.b, { transform: t }); at(E.bO, { transform: t });
  }
});

import { defineIcon, f, OL, WHITES, rp, rr, clamp01, rattle, at } from '../packages/core/src/kit.js';
import { front } from './_commerce-charts.js';

const mirror = (pts) => pts.map(([x, y]) => [31 - x, y]).reverse();
const LEFT = [[4.8, 7.6], [14.2, 7.6], [13.4, 18.8], [5.6, 18.8]];
const LENSES = rp(LEFT, [1, 1, 4.4, 4.4]) + rp(mirror(LEFT), [1, 1, 4.4, 4.4]);
const BAR = rr(4, 6.2, 23, 3.8, 1.9);

export default defineIcon({
  name: 'sunglasses',
  zh: '墨镜',
  category: 'commerce',
  tags: ['shades', 'eyewear', 'summer', 'sun', 'beach', 'fashion', '太阳镜'],
  variants: ['plus', 'check', 'heart'],
  // Dark sunglasses under a straight brow bar; on hover they lift and a glint runs across the lenses.
  svg: (u) => `<clipPath id="${u.id('l')}"><path d="${LENSES}"/></clipPath>
    <g data-n="g"><g filter="${u.sh}"><path d="${LENSES}" fill="${u.pure('#2F6FE0')}"/></g><path d="${LENSES}" ${OL}/>
      <g clip-path="url(#${u.id('l')})"><g data-n="gl"><path d="M6.4 18L10.4 9.6M19.4 18L23.4 9.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${WHITES}/></g></g>
      ${front(u, BAR, u.upS)}</g>`,
  target: (h) => ({ o: h ? 1 : 0, x: h ? 4.6 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.g, { transform: `translate(0 ${f(-1.2 * o)}) rotate(${f(rattle(o, 5, 2))} 15.5 12.5)` });
    at(E.gl, { transform: `translate(${f(p.x)} 0)` });
  }
});

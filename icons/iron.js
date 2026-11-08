import { defineIcon, KR, f, OL, WHITE, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';

const BODY = rp([[4, 22.4], [13.6, 10.4], [26.6, 10.4], [26.6, 22.4]], [0.8, 6, KR, KR]);
// The soleplate: the bottom of the body below y=19, its top corners rounded off.
const PLATE = rp([[4, 22.4], [6.72, 19], [26.6, 19], [26.6, 22.4]], [0.8, 1, 1.6, KR]);

export default defineIcon({
  name: 'iron',
  zh: '熨斗',
  category: 'home',
  tags: ['clothes iron', 'ironing', 'laundry', 'press', 'steam', 'wrinkle', '熨衣服', '洗衣'],
  variants: [],
  // A steam iron with its handle; it glides back and forth on hover as if pressing cloth.
  svg: (u) => {
    const handle = rr(13.4, 3.4, 13.2, 9.4, 3.6) + rr(15.8, 5.8, 8.4, 4.6, 1.6);
    return `<g data-n="g">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${handle}" fill-rule="evenodd" fill="${u.loS}"/></g></g><path d="${handle}" fill-rule="evenodd" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g><path d="${BODY}" ${OL} stroke-linejoin="round"/>
      <circle cx="20.6" cy="14.8" r="1.6" ${WHITE}/>
      <g filter="${u.hi}"><path d="${PLATE}" fill="${u.upS}"/></g><path d="${PLATE}" ${OL} stroke-linejoin="round"/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `translate(${f(rattle(clamp01(p.o), -2.4, 2))} 0)` }); }
});

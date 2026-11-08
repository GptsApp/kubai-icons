import { defineIcon, KR, f, OL, WHITE, rp, rr, circ, at, rattle, clamp01 } from '../packages/core/src/kit.js';

const BODY = rp([[5.6, 11], [25.4, 11], [23.4, 23.4], [7.6, 23.4]], [0.6, 0.6, KR, KR]);
// Clothes heaped above the rim: same-winding circles plus a counter-clockwise block.
const PILE = [[10.4, 9.6, 4.4], [19.4, 8.4, 5]].map(([x, y, r]) => circ(x, y, r)).join('') + 'M10.4 9V12H19.4V9Z';

export default defineIcon({
  name: 'laundry-basket',
  zh: '洗衣篮',
  category: 'home',
  tags: ['laundry', 'hamper', 'washing', 'clothes', 'basket', 'chores', '脏衣篮', '洗衣'],
  variants: ['check'],
  // A laundry basket heaped with clothes; the heap bounces on hover as the basket is set down.
  svg: (u) => {
    const rim = rr(4.4, 9.8, 22.2, 4, 1.6);
    const slots = [11, 15.5, 20].map((x) => `<path d="${rr(x - 1.2, 15.8, 2.4, 4.6, 1.2)}" ${WHITE}/>`).join('');
    return `<g data-n="pile"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${PILE}" fill="${u.upS}"/></g></g><path d="${PILE}" ${OL}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g><path d="${BODY}" ${OL}/>${slots}
      <g filter="${u.hi}"><path d="${rim}" fill="${u.upS}"/></g><path d="${rim}" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const t = `translate(0 ${f(rattle(clamp01(p.o), -1.8, 2))})`;
    at(E.pile, { transform: t });
  }
});

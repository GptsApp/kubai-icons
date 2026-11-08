import { defineIcon, f, OL, DEEP, rr, at } from '../packages/core/src/kit.js';

const BUN = 'M5 12.6C5 6.8 9.8 3.6 15.5 3.6C21.2 3.6 26 6.8 26 12.6Q26 14.2 24.4 14.2H6.6Q5 14.2 5 12.6Z';
const SEEDS = [[11.2, 8.2, -20], [15.5, 6.8, 0], [19.8, 8.2, 20]];

export default defineIcon({
  name: 'burger',
  zh: '汉堡',
  category: 'food',
  tags: ['hamburger', 'cheeseburger', 'fast food', 'takeout', 'delivery', 'meal', '快餐'],
  variants: ['heart', 'plus', 'clock'],
  // A burger with a seeded bun; its top bun lifts off the patty on hover.
  svg: (u) => {
    const base = rr(5, 16.6, 21, 6, 2.6), patty = rr(4.2, 13.2, 22.6, 4.6, 2.3);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${base}" fill="${u.upS}"/></g></g><path d="${base}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${patty}" fill="${u.loS}"/></g></g><path d="${patty}" ${OL}/>
      <g data-n="top"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${BUN}" fill="${u.upS}"/></g></g><path d="${BUN}" ${OL}/>
      ${SEEDS.map(([x, y, a]) => `<ellipse cx="${x}" cy="${y}" rx="1.4" ry="1.2" transform="rotate(${a} ${x} ${y})" ${DEEP}/>`).join('')}</g>`;
  },
  target: (h) => ({ y: h ? -3.2 : 0 }),
  draw(p, E) { at(E.top, { transform: `translate(0 ${f(p.y)})` }); }
});

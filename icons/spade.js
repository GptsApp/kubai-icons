import { defineIcon, f, OL, rattle, at } from '../packages/core/src/kit.js';

const SPADE = 'M0 -11.2C-5.5 -7 -10.9 -3.2 -10.9 1.6C-10.9 5 -8.3 7.2 -5.5 7.2C-3.7 7.2 -2.1 6.4 -1.1 5.2L-2.6 10Q-2.9 11 -1.9 11H1.9Q2.9 11 2.6 10L1.1 5.2C2.1 6.4 3.7 7.2 5.5 7.2C8.3 7.2 10.9 5 10.9 1.6C10.9 -3.2 5.5 -7 0 -11.2Z';
const BODY = 'M0 -11.2C-5.5 -7 -10.9 -3.2 -10.9 1.6C-10.9 5 -8.3 7.2 -5.5 7.2C-3 7.2 -1 6 0 4.4C1 6 3 7.2 5.5 7.2C8.3 7.2 10.9 5 10.9 1.6C10.9 -3.2 5.5 -7 0 -11.2Z';

export default defineIcon({
  name: 'spade',
  zh: '黑桃',
  category: 'shapes',
  tags: ['cards', 'suit', 'poker', 'game', '扑克'],
  // A spade with a lighter spade inset; on hover it rocks on its stem and settles upright.
  svg: (u) => `<g data-n="g">
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${SPADE}" fill="${u.loS}"/></g></g><path d="${SPADE}" ${OL}/>
    <g transform="translate(0 -1.6) scale(0.46)"><g filter="${u.hi}"><path d="${BODY}" fill="${u.upS}"/></g></g></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `translate(15.5 12.4) rotate(${f(rattle(Math.max(0, Math.min(1, p.o)), 12, 3))} 0 11)` }); }
});

import { defineIcon, f, OL, DEEP, DEEPS, WHITE, rp, clamp01, rattle, at } from '../packages/core/src/kit.js';

const BASKET = rp([[5, 10.6], [22.6, 10.6], [19.6, 17.6], [8, 17.6]], [1, 1, 3, 3]);
const HOOD = 'M5.4 11.4A8.6 8.6 0 0 1 13.8 2.6Q14.6 2.6 14.6 3.4V11.4Z';

export default defineIcon({
  name: 'stroller',
  zh: '婴儿车',
  category: 'people',
  tags: ['pram', 'baby carriage', 'pushchair', 'buggy', 'baby', 'parenting', '童车'],
  // A baby stroller with a hood; on hover the basket rocks gently on its springs.
  svg: (u) => `<path d="M21.8 11.2L25 4.4H27" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
    <g data-n="b"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${BASKET}" fill="${u.loS}"/></g></g><path d="${BASKET}" ${OL}/>
      <g filter="${u.hi}"><path d="${HOOD}" fill="${u.upS}"/></g><path d="${HOOD}" ${OL}/></g>
    <g ${DEEP}><circle cx="9.4" cy="21.4" r="2.8"/><circle cx="19.4" cy="21.4" r="2.8"/></g>
    <g ${WHITE}><circle cx="9.4" cy="21.4" r="1.2"/><circle cx="19.4" cy="21.4" r="1.2"/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.b, { transform: `rotate(${f(rattle(clamp01(p.o), 6, 3))} 14 18)` }); }
});

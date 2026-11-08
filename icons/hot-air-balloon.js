import { defineIcon, f, OL, DEEPS, rr, rattle, clamp01, at } from '../packages/core/src/kit.js';

const ENV = 'M15.5 1C21.8 1 25.2 5.2 25.2 9.4C25.2 12.8 21.8 15 19 16.8H12C9.2 15 5.8 12.8 5.8 9.4C5.8 5.2 9.2 1 15.5 1Z';
const GORE = 'M15.5 1C12.2 3.6 11.8 13 13.2 17.6H17.8C19.2 13 18.8 3.6 15.5 1Z';

export default defineIcon({
  name: 'hot-air-balloon',
  zh: '热气球',
  category: 'transport',
  tags: ['balloon', 'flight', 'adventure', 'sightseeing', 'sky', '气球'],
  // A hot-air balloon with its basket; on hover it rises and sways gently as it climbs.
  svg: (u) => {
    const basket = rr(12.6, 20.8, 5.8, 3.6, 1.2);
    return `<g data-n="b">
      <path d="M13.2 16.4L13.8 21M17.8 16.4L17.2 21" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${basket}" fill="${u.loS}"/></g></g><path d="${basket}" ${OL}/>
      <clipPath id="${u.id('en')}"><path d="${ENV}"/></clipPath>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${ENV}" fill="${u.loS}"/></g></g>
      <g clip-path="url(#${u.id('en')})"><g filter="${u.hi}"><path d="${GORE}" fill="${u.upS}"/></g></g>
      <path d="${ENV}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.b, { transform: `translate(0 ${f(0.6 - 1.8 * o)}) rotate(${f(rattle(o, 4, 2))} 15.5 9)` });
  }
});

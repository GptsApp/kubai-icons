import { defineIcon, f, OL, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'chair',
  zh: '椅子',
  category: 'home',
  tags: ['seat', 'furniture', 'dining chair', 'sit', 'seating', 'reservation', '座位', '家具'],
  variants: ['plus', 'check'],
  // A wooden chair seen from the side; it tips back on its rear legs on hover.
  svg: (u) => {
    const back = rr(7.2, 1.2, 5.2, 11.2, 1.8) + rr(7.2, 10, 3.6, 13.6, 1.6), leg = rr(19.6, 13.6, 3.6, 10, 1.6), seat = rr(6.2, 11.4, 18, 4, 1.6);
    return `<g data-n="g">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${back}" fill="${u.loS}"/></g></g><path d="${back}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${leg}" fill="${u.loS}"/></g></g><path d="${leg}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${seat}" fill="${u.upS}"/></g></g><path d="${seat}" ${OL}/></g>`;
  },
  target: (h) => ({ a: h ? -10 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(p.a)} 9 23.6)` }); }
});

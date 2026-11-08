import { defineIcon, f, OL, DEEP, DEEPS, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'shopping-cart',
  zh: '购物车',
  category: 'commerce',
  tags: ['cart', 'buy', 'checkout', 'store'],
  variants: ['plus', 'minus', 'check', 'x', 'heart', 'clock', 'alert'],
  // A cart; on hover a parcel drops into its basket.
  svg: (u) => {
    const basket = rp([[7, 7], [26.8, 7], [24.6, 16.8], [9.4, 16.8]], [1.4, 1.4, 1.8, 1.8]);
    const box = rr(0, 0, 7.4, 6, 1.2);
    return `<path d="M3.4 3.6H6L9.2 16.8H23" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      <g data-n="box"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${box}" fill="${u.upS}"/></g></g><path d="${box}" ${OL}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${basket}" fill="${u.loS}"/></g></g><path d="${basket}" ${OL}/>
      <circle cx="11.4" cy="20.8" r="2" ${DEEP}/><circle cx="21.6" cy="20.8" r="2" ${DEEP}/>`;
  },
  target: (h) => ({ box: h ? [13.6, 3.2, 1] : [13.6, -1.2, 0] }),
  draw(p, E) { at(E.box, { transform: `translate(${f(p.box[0])} ${f(p.box[1])})`, opacity: f(p.box[2]) }); }
});

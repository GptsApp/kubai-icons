import { defineIcon, f, OL, rp, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

const BULLET = rp([[11.6, 12], [11.6, 6], [19.4, 2.6], [19.4, 12]], [0, 1.6, 1, 0]);
const COLLAR = rr(10.2, 9.6, 10.6, 6.4, 0.8);
const TUBE = rr(8, 14.8, 15, 9, 2);

export default defineIcon({
  name: 'lipstick',
  zh: '口红',
  category: 'commerce',
  tags: ['makeup', 'cosmetics', 'beauty', 'lip', 'rouge', 'fashion', '美妆', '唇膏'],
  variants: ['plus', 'check', 'heart', 'star'],
  // A lipstick with a slanted bullet; on hover the bullet rises out of its tube.
  svg: (u) => `<g data-n="b"><g filter="${u.sh}"><path d="${BULLET}" fill="${u.pure('#2F6FE0')}"/></g><path d="${BULLET}" ${OL}/></g>
    ${back(u, COLLAR, u.upS)}${front(u, TUBE, u.loS)}`,
  target: (h) => ({ y: h ? -2.4 : 0 }),
  draw(p, E) { at(E.b, { transform: `translate(0 ${f(p.y)})` }); }
});

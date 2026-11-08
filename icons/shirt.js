import { defineIcon, KR, f, OL, rp, clamp01, rattle, at } from '../packages/core/src/kit.js';

// A T-shirt outline; nd is how deep the neckline dips.
const tee = (nd) => rp([[12.2, 2.6], [15.5, nd], [18.8, 2.6], [22.4, 3.4], [27, 8.4], [24.4, 12.2], [22.4, 10.8], [22.4, 23], [8.6, 23], [8.6, 10.8], [6.6, 12.2], [4, 8.4], [8.6, 3.4]],
  [0.8, nd > 5 ? 3 : 1.6, 0.8, 1.6, 1, 1, 0.6, KR, KR, 0.6, 1, 1, 1.6]);
const BACK = tee(4.4), FRONT = tee(6.8);

export default defineIcon({
  name: 'shirt',
  zh: '衣服',
  category: 'people',
  tags: ['t-shirt', 'tee', 'clothing', 'apparel', 'fashion', 'wear', '服装'],
  variants: ['plus', 'check', 'heart', 'star'],
  // A T-shirt with the back of its collar showing inside the neckline; on hover it swings as if hung up.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="b"><path d="${BACK}" fill="${u.loS}"/></g></g></g>
    <g filter="${u.hi}"><g data-n="fr"><path d="${FRONT}" fill="${u.upS}"/></g></g>
    <g data-n="sO"><path d="${BACK}" ${OL}/><path d="${FRONT}" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(rattle(clamp01(p.o), 6, 2))} 15.5 2.6)`;
    ['b', 'fr', 'sO'].forEach((n) => at(E[n], { transform: t }));
  }
});

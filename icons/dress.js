import { defineIcon, KR, f, DEEP, WHITES, rp, rr, rattle, clamp01 } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';
import { front } from './_commerce-charts.js';

const BODICE = rp([[10.2, 1.4], [12.9, 1.4], [15.5, 6.6], [18.1, 1.4], [20.8, 1.4], [21.6, 7.6], [19.4, 13], [11.6, 13], [9.4, 7.6]],
  [0.8, 0.8, 1, 0.8, 0.8, 1.2, 0.6, 0.6, 1.2]);
const SKIRT = rp([[11.6, 11.8], [19.4, 11.8], [26.4, 24], [4.6, 24]], [0.8, 0.8, KR, KR]);
const FOLDS = 'M12.4 16.4L10.4 21.4M18.6 16.4L20.6 21.4';

export default defineIcon({
  name: 'dress',
  zh: '连衣裙',
  category: 'commerce',
  tags: ['gown', 'frock', 'clothing', 'fashion', 'skirt', 'apparel', '裙子', '女装'],
  variants: ['plus', 'check', 'heart', 'star'],
  // A sleeveless dress with a belted waist; on hover the skirt flares out and twirls.
  svg: (u) => `${layer(u, 'sk', SKIRT, u.loS, { extra: `<path d="${FOLDS}" class="ln" ${WHITES}/>` })}
    ${front(u, BODICE, u.upS)}
    <path d="${rr(11.4, 11.4, 8.2, 2.6, 0.8)}" ${DEEP}/>`,
  target: (h) => ({ s: h ? 1.15 : 1, o: h ? 1 : 0 }),
  draw(p, E) {
    moveAll(E, ['sk'], `rotate(${f(rattle(clamp01(p.o), 8, 2))} 15.5 12) translate(15.5 0) scale(${f(p.s)} 1) translate(-15.5 0)`);
  }
});

import { defineIcon, KR, CR, f, OL, ACC, DEEP, DEEPS, SOFT, R, rp, rr, circ, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

export default defineIcon({
  name: 'dishwasher',
  zh: '洗碗机',
  category: 'home',
  tags: ['dishwasher', 'dishes', 'kitchen', 'appliance', 'wash', '洗碗'],
  variants: ['clock', 'check', 'cog'],
  // A dishwasher; on hover its door folds down on its lower hinge to show the plates in the rack.
  svg: (u) => `${back(u, rr(6.3, 1, 18.4, 23, KR))}
      ${front(u, rp(R(6.3, 1, 18.4, 4.6), [KR, KR, 0, 0]))}
      <path d="${circ(10, 3.3, 1.2) + circ(13.4, 3.3, 1.2)}" ${DEEP}/>
      <path d="${rr(8.6, 7.8, 13.8, 14, CR)}" fill="#fff"/>
      <path d="${rr(10.6, 10, 2.4, 8, 1.2) + rr(14.3, 10, 2.4, 8, 1.2) + rr(18, 10, 2.4, 8, 1.2)}" ${SOFT}/>
      <path d="M10 19.4H21" ${ACC}/>
      <g filter="${u.hi}"><path data-n="dr" fill="${u.upS}"/></g><path data-n="drO" ${OL}/>
      <path data-n="hd" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ h: h ? 4.4 : 17.4 }),
  draw(p, E) {
    const y = 24 - p.h, d = rp(R(6.3, y, 18.4, p.h), [1.8, 1.8, KR, KR]);
    at(E.dr, { d }); at(E.drO, { d });
    at(E.hd, { d: `M12.4 ${f(y + Math.min(2.6, p.h * 0.45))}H18.6` });
  }
});

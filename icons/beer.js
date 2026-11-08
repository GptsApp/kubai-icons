import { defineIcon, KR, f, OL, WHITE, rr, circ, cloud, at, scaleAt } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'beer',
  zh: '啤酒',
  category: 'food',
  tags: ['beer mug', 'pint', 'bar', 'pub', 'drink', 'alcohol', 'cheers', '扎啤'],
  variants: ['plus', 'heart'],
  // A mug of beer; its head of foam swells up as the bubbles rise on hover.
  svg: (u) => {
    const glass = rr(6, 8.8, 14.4, 14, KR);
    const handle = rr(16.8, 11.4, 8.8, 9.4, 3.6) + rr(19, 13.6, 4.4, 5, 1.6);
    const foam = cloud([9.4, 8.8, 3.4], [14, 6.6, 4], [18.2, 8.6, 3.2]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${handle}" fill-rule="evenodd" fill="${u.loS}"/></g></g><path d="${handle}" fill-rule="evenodd" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${glass}" fill="${u.loS}"/></g></g><path d="${glass}" ${OL}/>
      <g data-n="bub"><circle cx="10.4" cy="18.2" r="1.3" ${WHITE}/><circle cx="15.4" cy="16.4" r="1.3" ${WHITE}/></g>
      <g data-n="foam"><g filter="${u.hi}"><path d="${foam}" fill="${u.upS}"/></g><path d="${foam}" ${OL}/></g>`;
  },
  target: (h) => ({ s: h ? 1.1 : 1, b: h ? -2.6 : 0 }),
  draw(p, E) {
    at(E.foam, { transform: scaleAt(p.s, 13.8, 11.8) });
    at(E.bub, { transform: `translate(0 ${f(p.b)})` });
  }
});

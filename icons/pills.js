import { defineIcon, KR, CR, f, OL, DEEPS, R, rp, rr, at } from '../packages/core/src/kit.js';

const BODY = rr(7.4, 6.2, 16.2, 16.8, KR), CAP = rr(6.4, 1, 18.2, 6.2, 1.8);
const RIDGES = [6.5, 12.5, 18.5, 24.5].map((x) => `M${x} 3V5.2`).join('');

export default defineIcon({
  name: 'pills',
  zh: '药瓶',
  category: 'health',
  tags: ['pill bottle', 'medicine', 'pharmacy', 'prescription', 'drug', '药品'],
  variants: ['plus', 'check', 'clock'],
  badgeAt: [23.8, 19.6],
  // A pill bottle with a ridged cap; on hover the cap twists and lifts off the bottle.
  svg: (u) => `<clipPath id="${u.id('cap')}"><path d="${rp(R(9, 1, 13, 6.2), 0)}"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g>
    <path d="${BODY}" ${OL}/>
    <path d="${rr(9.6, 11.2, 11.8, 8.8, CR)}" fill="#fff"/>
    <path d="M15.5 13.4V17.8M13.3 15.6H17.7" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g data-n="cap"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${CAP}" fill="${u.upS}"/></g></g><path d="${CAP}" ${OL}/>
      <g clip-path="url(#${u.id('cap')})"><path data-n="rg" d="${RIDGES}" class="ln" data-t="stroke:#5393FF"/></g></g>`,
  target: (h) => ({ y: h ? -2.2 : 0, tw: h ? 6 : 0 }),
  draw(p, E) {
    at(E.cap, { transform: `translate(0 ${f(p.y)})` });
    at(E.rg, { transform: `translate(${f(p.tw)} 0)` });
  }
});

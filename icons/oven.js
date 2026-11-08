import { defineIcon, KR, CR, f, DEEP, DEEPS, SOFT, R, rp, rr, circ, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

const WIN = rr(8.4, 10.8, 14.2, 8.6, CR);

export default defineIcon({
  name: 'oven',
  zh: '烤箱',
  category: 'home',
  tags: ['oven', 'stove', 'bake', 'kitchen', 'range', 'appliance', '烘焙'],
  variants: ['clock', 'check'],
  // An oven with knobs above its glass door; on hover the oven light comes on and it heats up.
  svg: (u) => `${back(u, rr(5.2, 2, 20.6, 21, KR))}
      ${front(u, rp(R(5.2, 2, 20.6, 5.2), [KR, KR, 0, 0]))}
      <path d="${circ(9.4, 4.6, 1.3) + circ(13.4, 4.6, 1.3) + circ(21.6, 4.6, 1.3)}" ${DEEP}/>
      <path d="M11 8.8H20" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <clipPath id="${u.id('w')}"><path d="${WIN}"/></clipPath>
      <path d="${WIN}" fill="#fff"/>
      <g clip-path="url(#${u.id('w')})"><path data-n="glow" d="${WIN}" ${SOFT}/></g>
      <path d="M10.6 16.6H20.4" class="ln" data-t="stroke:#5393FF"/>`,
  target: (h) => ({ g: h ? 0.55 : 0 }),
  draw(p, E) { at(E.glow, { opacity: f(p.g) }); }
});

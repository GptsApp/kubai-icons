import { defineIcon, KR, f, rr, DEEPS, WHITES, at } from '../packages/core/src/kit.js';
import { solid } from './_w2-dev.js';

const ROLL = rr(3.8, 2.6, 19.8, 7.8, KR), HANDLE = rr(13.4, 14.6, 4.2, 9.4, 2.1), P = 3.9;

export default defineIcon({
  name: 'paint-roller',
  zh: '滚刷',
  category: 'tools',
  tags: ['paint roller', 'paint', 'decorate', 'wall', 'renovate', 'diy', '刷墙', '油漆'],
  // A paint roller on its frame; on hover it rolls up the wall, its nap turning as it goes.
  svg: (u) => `<clipPath id="${u.id('rl')}"><path d="${ROLL}"/></clipPath>
    <g data-n="t"><path d="M23.6 6.5H25.6Q26.8 6.5 26.8 7.7V11.4Q26.8 12.6 25.6 12.6H16.7Q15.5 12.6 15.5 13.8V15.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      ${solid(u, ROLL, u.loS)}
      <g clip-path="url(#${u.id('rl')})"><path data-n="nap" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/></g>
      ${solid(u, HANDLE, u.upS)}</g>`,
  target: (h) => ({ y: h ? -1.2 : 0, r: h ? P : 0 }),
  draw(p, E) {
    at(E.t, { transform: `translate(0 ${f(p.y)})` });
    let d = '';
    for (let i = -1; i < 3; i++) d += `M7 ${f(4.6 + i * P + p.r)}H20.4`;
    at(E.nap, { d });
  }
});

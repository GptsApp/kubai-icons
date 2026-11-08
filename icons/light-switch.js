import { defineIcon, KR, f, SOFT, R, rp, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

const ROCKER = rr(11, 4.6, 9, 15.8, 1.8);

export default defineIcon({
  name: 'light-switch',
  zh: '开关',
  category: 'home',
  tags: ['switch', 'wall switch', 'rocker', 'light', 'toggle', '电灯开关'],
  variants: ['check', 'clock'],
  off: true,
  // A wall switch with a rocker; on hover the rocker flips from its lower half to its upper half.
  svg: (u) => `${back(u, rr(8.3, 1, 14.4, 23, KR))}
      ${front(u, ROCKER)}
      <clipPath id="${u.id('rk')}"><path d="${ROCKER}"/></clipPath>
      <g clip-path="url(#${u.id('rk')})"><path data-n="sh" ${SOFT}/></g>`,
  target: (h) => ({ y: h ? 4.6 : 12.5 }),
  draw(p, E) { at(E.sh, { d: rp(R(11, p.y, 9, 7.9), 0) }); }
});

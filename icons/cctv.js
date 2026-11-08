import { defineIcon, KR, f, OL, DEEP, DEEPS, R, rp, rr, at } from '../packages/core/src/kit.js';

const BODY = rr(4, 3.6, 19.6, 8.4, KR), HOOD = rp(R(4, 3.6, 6, 8.4), [KR, 1.6, 1.6, KR]);
const PLATE = rr(23.6, 13, 3.6, 10, 1.6);

export default defineIcon({
  name: 'cctv',
  zh: '监控摄像头',
  category: 'security',
  tags: ['camera', 'surveillance', 'security camera', 'monitor', '监控'],
  off: true,
  // A security camera on a wall arm, aimed down; on hover it tilts up to look out.
  svg: (u) => `
    <path d="M23.6 18H19.6Q17.6 18 17.6 16V11" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${PLATE}" fill="${u.loS}"/></g></g><path d="${PLATE}" ${OL}/>
    <g filter="${u.sh}"><g data-n="cam"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g>
      <path d="${BODY}" ${OL}/>
      <g filter="${u.hi}"><path d="${HOOD}" fill="${u.upS}"/></g><path d="${HOOD}" ${OL}/>
      <circle cx="18.8" cy="7.8" r="1.4" fill="#fff" data-w="fill"/></g></g>`,
  target: (h) => ({ a: h ? 2 : -12 }),
  draw(p, E) { at(E.cam, { transform: `rotate(${f(p.a)} 17.6 11.6)` }); }
});

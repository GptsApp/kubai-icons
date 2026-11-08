import { DEEP, defineIcon, f, DEEPS, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_b6-vehicles.js';

export default defineIcon({
  name: 'construction-crane',
  zh: '塔吊',
  category: 'tools',
  tags: ['tower crane', 'building site', 'construction', 'lifting', 'hoist', '起重机', '建筑工地'],
  // A tower crane with a long jib and a heavy counterweight; on hover the trolley runs out along the jib and the hook is lowered.
  svg: (u) => `<path d="M12 1.8L25 6.4M12 1.8L5 6.4" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    <path d="${rr(3.8, 8, 7, 6, 1.2)}" ${DEEP}/>
    ${back(u, rr(10.2, 1.2, 3.6, 21, 0.9), u.loS)}
    <path data-n="tr" ${DEEP}/>
    <path data-n="ho" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    ${front(u, rr(3.6, 5.4, 23.8, 3.4, 1.4), u.upS)}
    ${front(u, rr(6, 20.8, 12, 2.8, 1.3), u.upS)}`,
  target: (h) => ({ x: h ? 22.6 : 19, y: h ? 18.6 : 13.6 }),
  draw(p, E) {
    at(E.tr, { d: rr(p.x - 2.4, 8.4, 4.8, 3, 0.8) });
    at(E.ho, { d: `M${f(p.x)} 11V${f(p.y)}a1.9 1.9 0 0 0 3.8 0` });
  }
});

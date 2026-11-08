import { defineIcon, f, rr, capsuleRing } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

const RING = capsuleRing(14, 11, 2.6), BAR = rr(-6.6, -1.8, 13.2, 3.6, 1.8);

export default defineIcon({
  name: 'chain',
  zh: '链条',
  category: 'tools',
  tags: ['links', 'iron', 'connect', 'secure', 'heavy', '铁链', '锁链'],
  // A length of three chain links; on hover they are pulled taut along the chain.
  svg: (u) => rig(u, 'a', [{ d: RING, fill: u.loS, rule: 'evenodd' }])
    + rig(u, 'c', [{ d: RING, fill: u.loS, rule: 'evenodd' }])
    + rig(u, 'b', [{ d: BAR, fill: u.upS }]),
  target: (h) => ({ x: h ? 10.4 : 8.8 }),
  draw(p, E) {
    const t = (x) => `translate(15.5 12.5) rotate(-45) translate(${f(x)} 0)`;
    pose(E, 'a', 1, t(-p.x)); pose(E, 'c', 1, t(p.x)); pose(E, 'b', 1, t(0));
  }
});

import { defineIcon, f, R, rp, rattle, clamp01 } from '../packages/core/src/kit.js';
import { rig, pose } from './_tools-dev.js';

// A horseshoe magnet opening downward, with lighter pole pieces on its two legs.
const U = 'M6.5 21V10.5A9 9 0 0 1 24.5 10.5V21H19.3V10.5A3.8 3.8 0 0 0 11.7 10.5V21Z';
const poles = rp(R(6.5, 18.4, 5.2, 5.2), [1.4, 1.4, 1.6, 1.6]) + rp(R(19.3, 18.4, 5.2, 5.2), [1.4, 1.4, 1.6, 1.6]);

export default defineIcon({
  name: 'magnet',
  zh: '磁铁',
  category: 'tools',
  tags: ['attract', 'magnetic', 'snap', 'pull', '吸附'],
  // A horseshoe magnet; on hover it jolts toward something it pulls and settles.
  svg: (u) => rig(u, 'm', [{ d: U, fill: u.loS }, { d: poles, fill: u.upS }]),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { pose(E, 'm', 2, `translate(0 ${f(rattle(clamp01(p.o), 2.2, 3))})`); }
});

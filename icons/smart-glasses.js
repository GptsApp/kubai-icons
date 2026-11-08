import { defineIcon, f, DEEPS, WHITE, rp, rr, circ, at, clamp01, bump } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';

const mirror = (pts) => pts.map(([x, y]) => [31 - x, y]).reverse();
const RIM = [[3.2, 6], [14.2, 6], [14, 19.4], [3.6, 19.4]];
const LENS = [[5.4, 8.2], [12, 8.2], [11.8, 17.2], [5.8, 17.2]];
const frame = rp(RIM, [3, 3, 4, 4]) + rp(mirror(RIM), [4, 4, 3, 3]) + rr(13, 6, 5, 5.2, 1.4);
const lenses = rp(LENS, [1.8, 1.8, 2.4, 2.4]) + rp(mirror(LENS), [2.4, 2.4, 1.8, 1.8]);

export default defineIcon({
  name: 'smart-glasses',
  zh: '智能眼镜',
  category: 'devices',
  tags: ['ar', 'augmented reality', 'wearable', 'hud', 'camera glasses', 'heads-up display', '增强现实', '穿戴设备'],
  variants: ['check', 'x', 'sparkle'],
  off: true,
  // Glasses with a camera on the bridge and a heads-up readout in one lens; on hover the camera
  // flares and the readout writes out across the lens.
  svg: (u) => `${back(u, frame)}
      <path d="${lenses}" fill="#fff"/>
      <path data-n="cam" ${WHITE}/>
      <path data-n="hud" class="ln" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.cam, { d: circ(15.5, 8.6, 1.35 + 0.7 * bump(o)) });
    at(E.hud, { d: `M19.6 11H${f(22.2 + 2.2 * o)}M19.6 14.4H${f(24.4 - 2.2 * o)}` });
  }
});

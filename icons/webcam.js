import { defineIcon, f, OL, DEEP, WHITE, rr, circ, at, rattle } from '../packages/core/src/kit.js';
import { solid } from './_devices.js';

export default defineIcon({
  name: 'webcam',
  zh: '摄像头',
  category: 'devices',
  tags: ['camera', 'video call', 'meeting', 'stream', '网络摄像头'],
  variants: ['check', 'x', 'alert', 'cog', 'lock'],
  off: true,
  // A round webcam on its base; on hover the light comes on and the lens looks round before it
  // settles.
  svg: (u) => `${solid(u, circ(15.5, 10.6, 9.2), u.loS)}
      ${solid(u, rr(9.6, 20.4, 11.8, 3, 1.4), u.upS)}
      <circle data-n="led" cx="15.5" cy="3.9" r="1.2" ${WHITE}/>
      <g data-n="lens"><g filter="${u.hi}"><path d="${circ(15.5, 11.6, 4)}" fill="${u.upS}"/></g><path d="${circ(15.5, 11.6, 4)}" ${OL}/>
        <circle cx="15.5" cy="11.6" r="1.7" ${DEEP}/></g>`,
  target: (h) => ({ o: h ? 1 : 0, l: h ? 1 : 0.45 }),
  draw(p, E) {
    // Looks right, swings back left, then settles a little to the right.
    const o = Math.max(0, Math.min(1, p.o)), x = 1.3 * o + rattle(o, 3.4, 2);
    at(E.lens, { transform: `translate(${f(x)} 0)` });
    at(E.led, { opacity: f(p.l) });
  }
});

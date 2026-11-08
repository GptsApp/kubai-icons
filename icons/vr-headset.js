import { defineIcon, f, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { solid } from './_devices.js';

const BODY = rp([[3.6, 5.6], [27.4, 5.6], [27.4, 19.6], [19.6, 19.6], [17.8, 17], [13.2, 17], [11.4, 19.6], [3.6, 19.6]],
  [4, 4, 4, 1.2, 1.2, 1.2, 1.2, 4]);

export default defineIcon({
  name: 'vr-headset',
  zh: 'VR 眼镜',
  category: 'devices',
  tags: ['virtual reality', 'vr', 'ar', 'goggles', 'metaverse', '头显'],
  variants: ['plus', 'check', 'cog', 'sparkle'],
  // A VR headset with two lenses; on hover it looks round to one side and back.
  svg: (u) => `<g data-n="hd">${solid(u, BODY, u.loS)}
      ${solid(u, rr(6.6, 8.2, 7.4, 5.2, 2.4), u.upS, { sh: false })}${solid(u, rr(17, 8.2, 7.4, 5.2, 2.4), u.upS, { sh: false })}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.hd, { transform: `rotate(${f(rattle(o, 8, 2))} 15.5 22)` });
  }
});

import { defineIcon, CR, f, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

export default defineIcon({
  name: 'tablet-smartphone',
  zh: '多设备',
  category: 'devices',
  tags: ['devices', 'tablet and phone', 'responsive', 'mobile', 'multi-device', '平板和手机', '跨设备'],
  variants: ['check', 'sync', 'down', 'cog'],
  // A tablet with a phone in front of it; on hover the two step apart.
  svg: (u) => `<g data-n="tb">${back(u, rr(4.4, 1.2, 15.8, 21, 2.8))}<path d="${rr(6.4, 3.2, 11.8, 17, CR)}" fill="#fff"/></g>
      <g data-n="ph">${front(u, rr(17.2, 9.2, 9.4, 14.8, 2.4))}<path d="${rr(18.9, 10.9, 6, 11.4, CR)}" fill="#fff"/></g>`,
  target: (h) => ({ x: h ? 0.6 : 0 }),
  draw(p, E) {
    at(E.tb, { transform: `translate(${f(-p.x)} ${f(-p.x * 0.6)})` });
    at(E.ph, { transform: `translate(${f(p.x)} ${f(p.x * 0.6)})` });
  }
});

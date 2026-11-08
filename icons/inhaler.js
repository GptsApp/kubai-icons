import { defineIcon, KR, f, rp, rr, at } from '../packages/core/src/kit.js';
import { solid } from './_w2-dev.js';

const BOOT = rp([[14, 8.6], [23.4, 8.6], [23.4, 23.4], [6, 23.4], [6, 16], [14, 16]], [1.8, 1.8, KR, KR, 1.6, 1]);
const CAN = rr(15.4, 0, 6.6, 12, 2.2);

export default defineIcon({
  name: 'inhaler',
  zh: '吸入器',
  category: 'health',
  tags: ['inhaler', 'asthma', 'puffer', 'respiratory', 'medicine', 'dose', '哮喘', '喷雾'],
  // An inhaler with its canister in the boot; on hover the canister is pressed down for a dose.
  svg: (u) => `<g data-n="cn">${solid(u, CAN, u.upS)}</g>${solid(u, BOOT, u.loS)}
    <path d="${rr(7.8, 18, 4.4, 3.6, 1)}" fill="#fff"/>`,
  target: (h) => ({ y: h ? 4 : 1.6 }),
  draw(p, E) { at(E.cn, { transform: `translate(0 ${f(p.y)})` }); }
});

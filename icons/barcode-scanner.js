import { defineIcon, KR, f, DEEP, DEEPS, R, rp, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

export default defineIcon({
  name: 'barcode-scanner',
  zh: '扫码枪',
  category: 'devices',
  tags: ['barcode scanner', 'scanner gun', 'scan', 'checkout', 'retail', '条码枪'],
  variants: ['check', 'x'],
  // A handheld barcode scanner; on hover its trigger is pulled and the scan beam comes on.
  svg: (u) => `<path data-n="tr" d="${rr(14.6, 9.6, 2.6, 5, 1.3)}" ${DEEP}/>
      ${back(u, rp([[17.2, 9.6], [24.2, 9.6], [22.8, 23.6], [17.4, 23.6]], [0, 0, 2, 2]))}
      ${back(u, rr(7.6, 3.4, 19, 8.2, KR))}
      ${front(u, rp(R(7.6, 3.4, 4, 8.2), [KR, 0, 0, KR]))}
      <path data-n="beam" d="M3.6 3.8V11.2" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.tr, { transform: `rotate(${f(18 * p.o)} 15.9 9.6)` });
    at(E.beam, { opacity: f(Math.max(0, p.o * 1.6 - 0.6)) });
  }
});

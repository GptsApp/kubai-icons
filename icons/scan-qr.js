import { defineIcon, KR, f, OL, rr, at, wave } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'scan-qr',
  zh: '扫码',
  category: 'devices',
  tags: ['qr code', 'scan', 'barcode', 'scanner'],
  variants: ['check', 'x', 'search'],
  // A QR code on a card with a scan bar lying across it. On hover the bar sweeps down
  // over the code and back up past the middle, then settles where it began.
  svg: (u) => {
    const card = rr(5.2, 2.2, 20.6, 20.6, KR), bar = rr(3.6, -1.2, 23.8, 2.4, 1.2);
    const finder = (x, y) => rr(x, y, 5.9, 5.9, 1.4) + rr(x + 1.6, y + 1.6, 2.7, 2.7, 0.6);
    const code = finder(7.4, 4.4) + finder(17.7, 4.4) + finder(7.4, 14.7) + rr(17.7, 14.7, 2.4, 2.4, 0.5) + rr(21.2, 18.2, 2.4, 2.4, 0.5);
    return `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${card}" fill="${u.loS}"/></g></g>
    <path d="${card}" ${OL}/>
    <path d="${code}" fill-rule="evenodd" fill="#fff" data-w="fill"/>
    <g data-n="bar"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${bar}" fill="${u.upS}"/></g></g><path d="${bar}" ${OL}/></g>`;
  },
  // At rest and at the end the bar's outline meets both rows of the code exactly.
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o));
    at(E.bar, { transform: `translate(0 ${f(12.5 + 7.6 * wave(o, (t) => Math.sin(2 * Math.PI * t) * (1 - 0.35 * t)))})` });
  }
});

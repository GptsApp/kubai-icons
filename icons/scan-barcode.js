import { defineIcon, KR, OL, DEEPS, WHITE, R, rp, rr, at } from '../packages/core/src/kit.js';
import { corners } from './_w2-interface.js';

const BARS = [1.6, 2.4, 1.6, 1.6];

export default defineIcon({
  name: 'scan-barcode',
  zh: '扫描条码',
  category: 'devices',
  tags: ['barcode', 'scan', 'scanner', 'product', 'sku', 'checkout', '扫条码'],
  variants: ['check', 'x'],
  // A barcode label inside the four corners of a viewfinder; on hover the corners close in on the code.
  svg: (u) => {
    let x = 15.5 - (BARS.reduce((a, b) => a + b, 0) + 1.4 * (BARS.length - 1)) / 2, bars = '';
    for (const w of BARS) { bars += rp(R(x, 9.3, w, 6.4), 0.4); x += w + 1.4; }
    const card = rr(8.7, 7.2, 13.6, 10.6, KR);
    return `<path data-n="fr" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${card}" fill="${u.loS}"/></g></g><path d="${card}" ${OL}/>
      <path d="${bars}" ${WHITE}/>`;
  },
  target: (h) => ({ i: h ? 0.8 : 0 }),
  draw(p, E) { at(E.fr, { d: corners(4.4 + p.i, 2 + p.i, 26.6 - p.i, 23 - p.i) }); }
});

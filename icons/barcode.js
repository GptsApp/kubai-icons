import { defineIcon, KR, f, OL, R, rp, rr, at, clamp01, wave } from '../packages/core/src/kit.js';

// Bars of two widths, 1.5 apart, centred on the card.
const BARS = [1.6, 2.8, 1.6, 1.6, 2.8];

export default defineIcon({
  name: 'barcode',
  zh: '条形码',
  category: 'commerce',
  tags: ['barcode', 'scan', 'product', 'sku', 'inventory', '条码'],
  variants: ['check', 'x', 'search', 'plus'],
  // A barcode label with a scan bar lying across it. On hover the bar sweeps down the
  // bars and back up past the middle, then settles where it began.
  svg: (u) => {
    let x = 15.5 - (BARS.reduce((a, b) => a + b, 0) + 1.5 * (BARS.length - 1)) / 2, bars = '';
    for (const w of BARS) { bars += rp(R(x, 6.6, w, 11.8), 0.4); x += w + 1.5; }
    const card = rr(4, 3.3, 23, 18.4, KR), bar = rr(2.4, -1.2, 26.2, 2.4, 1.2);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${card}" fill="${u.loS}"/></g></g><path d="${card}" ${OL}/>
      <path d="${bars}" fill="#fff" data-w="fill"/>
      <g data-n="bar"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${bar}" fill="${u.upS}"/></g></g><path d="${bar}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.bar, { transform: `translate(0 ${f(12.5 + 5.4 * wave(o, (t) => Math.sin(2 * Math.PI * t) * (1 - 0.35 * t)))})` });
  }
});

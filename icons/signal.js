import { defineIcon, f, rr, at } from '../packages/core/src/kit.js';
import { solid, span } from './_devices.js';

// Four bars rising to the right, standing on one baseline.
const H = [5.6, 10.2, 14.8, 19.4];
const BARS = H.map((h, i) => rr(5.3 + i * 5.6, 21.7 - h, 3.6, h, 1.2));

export default defineIcon({
  name: 'signal',
  zh: '信号',
  category: 'devices',
  tags: ['cellular', 'reception', 'network', 'bars', 'mobile data', '手机信号'],
  variants: ['check', 'x', 'alert'],
  off: true,
  // Signal bars, two of four strong; on hover a pulse runs up through the bars and the rest
  // fill in one after another.
  svg: (u) => BARS.map((d, i) => `<g filter="${u.sh}"><path data-n="s${i}" d="${d}" fill="${u.upS}"/></g>
      <g filter="${u.hi}"><path data-n="b${i}" d="${d}" fill="${u.loS}"/></g><path data-n="o${i}" d="${d}" class="ol" data-t="stroke:#5393FF"/>`).join(''),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // Each bar stretches up and settles, one after another.
    [0, 1, 2, 3].forEach((i) => {
      const h = H[i], dh = 2.6 * Math.sin(Math.PI * span(p.o, i * 0.14, i * 0.14 + 0.45));
      const d = rr(5.3 + i * 5.6, 21.7 - h - dh, 3.6, h + dh, 1.2);
      at(E['s' + i], { d }); at(E['b' + i], { d }); at(E['o' + i], { d });
    });
    at(E.b2, { opacity: f(span(p.o, 0, 0.5)) });
    at(E.b3, { opacity: f(span(p.o, 0.3, 0.8)) });
  }
});

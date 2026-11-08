import { defineIcon, f, rp, at } from '../packages/core/src/kit.js';
import { back } from './_commerce-charts.js';

const TOP = 2.4, BOT = 22.6;
const ROAD = rp([[12.8, TOP], [18.2, TOP], [27.6, BOT], [3.4, BOT]], [0.8, 0.8, 1.6, 1.6]);
// A centre dash at depth t (0 at the far end, 1 at the near edge), growing toward the viewer.
const dash = (t) => {
  const y0 = TOP + t * (BOT - TOP), len = 2.6 + 2.6 * t, w = 1.1 + 0.6 * t;
  return rp([[15.5 - w * 0.9, y0], [15.5 + w * 0.9, y0], [15.5 + w, y0 + len], [15.5 - w, y0 + len]], 0.5);
};

export default defineIcon({
  name: 'road',
  zh: '道路',
  category: 'travel',
  tags: ['road', 'street', 'highway', 'drive', 'route', 'journey', '公路', '马路'],
  // A road running into the distance; on hover its centre dashes stream toward the viewer.
  svg: (u) => `<clipPath id="${u.id('rd')}"><path d="${ROAD}"/></clipPath>
    ${back(u, ROAD, u.loS)}
    <g clip-path="url(#${u.id('rd')})">${[0, 1, 2, 3].map((i) => `<path data-n="d${i}" fill="#fff" data-w="fill"/>`).join('')}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // Four dashes a period apart; the one entering at the far end fades in.
    [0, 1, 2, 3].forEach((i) => {
      const t = (i - 1 + p.o) * 0.36 + 0.14;
      at(E[`d${i}`], { d: dash(Math.max(0, t)), opacity: f(Math.min(1, Math.max(0, (t + 0.1) / 0.2))) });
    });
  }
});

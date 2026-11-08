import { defineIcon, f, rr, at } from '../packages/core/src/kit.js';
import { solid, MARK } from './_w2-dev.js';

const S = 5, ROOT = rr(15.5 - 4.2, 2.4, 8.4, 6.2, 1.8);

export default defineIcon({
  name: 'sitemap',
  zh: '站点地图',
  category: 'development',
  tags: ['sitemap', 'hierarchy', 'tree', 'structure', 'org chart', 'pages', '层级', '结构'],
  variants: ['plus', 'check', 'x', 'search', 'cog'],
  // A root page with three pages below it; on hover the pages below drop further down.
  svg: (u) => `<path data-n="ln" ${MARK}/>${solid(u, ROOT, u.loS)}
    ${[0, 1, 2].map((i) => `<g data-n="k${i}">${solid(u, rr(-S / 2, 0, S, S, 1.6), u.upS)}</g>`).join('')}`,
  target: (h) => ({ y: h ? 17.6 : 16.6 }),
  draw(p, E) {
    const xs = [6.5, 15.5, 24.5], y = p.y, m = 12;
    xs.forEach((x, i) => at(E['k' + i], { transform: `translate(${f(x)} ${f(y)})` }));
    at(E.ln, { d: `M15.5 8V${f(y)}M${f(xs[0])} ${f(y)}V${m + 2}Q${f(xs[0])} ${m} ${f(xs[0] + 2)} ${m}H${f(xs[2] - 2)}Q${f(xs[2])} ${m} ${f(xs[2])} ${m + 2}V${f(y)}` });
  }
});

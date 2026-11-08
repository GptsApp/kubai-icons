import { defineIcon, KR, CR, f, OL, DEEPS, WHITES, rr, lines, at } from '../packages/core/src/kit.js';
import { solid } from './_devices.js';

export default defineIcon({
  name: 'scanner',
  zh: '扫描仪',
  category: 'devices',
  tags: ['scan', 'document', 'digitize', 'copy', '扫描'],
  variants: ['plus', 'check', 'x', 'alert', 'up', 'cog'],
  // A document scanner with a page in its feed; on hover the page is drawn in and the scan
  // light comes on.
  svg: (u) => {
    const page = rr(0, 0, 13, 10, CR);
    return `<g data-n="page"><g filter="${u.hi}"><path d="${page}" fill="${u.upS}"/></g><path d="${page}" ${OL}/>
        <path d="${lines(2.2, 2.6, [8.6])}" class="ln" ${DEEPS} stroke-opacity=".55"/></g>
      ${solid(u, rr(4, 10.4, 23, 11.4, KR), u.loS)}
      <path data-n="lit" d="M8.4 16.2H22.6" fill="none" stroke-width="2" stroke-linecap="round" ${WHITES}/>`;
  },
  target: (h) => ({ y: h ? 5.4 : 2.2, l: h ? 1 : 0.45 }),
  draw(p, E) {
    at(E.page, { transform: `translate(9 ${f(p.y)})` });
    at(E.lit, { opacity: f(p.l) });
  }
});

import { defineIcon, KR, CR, f, OL, DEEPS, R, rp, rr, lines, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'printer',
  zh: '打印',
  category: 'devices',
  tags: ['print', 'paper', 'output'],
  variants: ['check', 'x', 'alert', 'cog', 'clock'],
  off: true,
  // A printer that feeds a printed page out of its slot on hover.
  svg: (u) => {
    const tray = rp(R(8.4, 3.3, 14.2, 6.4), [1.4, 1.4, 0, 0]), body = rr(4, 8.4, 23, 9.4, KR), page = rr(0, 0, 13, 10, CR);
    return `<g filter="${u.hi}"><path d="${tray}" fill="${u.upS}"/></g><path d="${tray}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <clipPath id="${u.id('out')}"><rect x="0" y="15" width="31" height="12"/></clipPath>
      <g clip-path="url(#${u.id('out')})"><g data-n="page"><g filter="${u.hi}"><path d="${page}" fill="${u.upS}"/></g><path d="${page}" ${OL}/>
        <path d="${lines(2.2, 6, [8.6])}" class="ln" ${DEEPS} stroke-opacity=".55"/></g></g>
      <path d="M7 15H24" fill="none" stroke-width="2" stroke-linecap="round" ${DEEPS}/>`;
  },
  target: (h) => ({ y: h ? 11.6 : 8.4 }),
  draw(p, E) { at(E.page, { transform: `translate(9 ${f(p.y)})` }); }
});

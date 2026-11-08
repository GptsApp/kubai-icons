import { defineIcon, KR, CR, f, OL, R, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'monitor',
  zh: '显示器',
  category: 'devices',
  tags: ['display', 'screen', 'desktop', 'computer', '屏幕'],
  variants: ['plus', 'check', 'x', 'alert', 'info', 'lock', 'search', 'sync', 'cog', 'down', 'up', 'sparkle'],
  off: true,
  // A monitor on a stand; on hover the screen rises on its neck.
  svg: (u) => {
    const body = rr(4, 2.6, 23, 14.4, KR), foot = rr(9.4, 21, 12.2, 2.4, 1.2);
    return `<path data-n="neck" fill="${u.loS}"/><path data-n="neckO" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${foot}" fill="${u.upS}"/></g></g><path d="${foot}" ${OL}/>
      <g data-n="scr"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
        <path d="${rr(6, 4.6, 19, 10.4, CR)}" fill="#fff"/></g>`;
  },
  target: (h) => ({ y: h ? -1.4 : 0 }),
  draw(p, E) {
    const neck = rp(R(13.3, 15 + p.y, 4.4, 7 - p.y), 0);
    at(E.neck, { d: neck }); at(E.neckO, { d: neck });
    at(E.scr, { transform: `translate(0 ${f(p.y)})` });
  }
});

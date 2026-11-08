import { defineIcon, KR, CR, f, OL, R, rp, rr, at, clamp01 } from '../packages/core/src/kit.js';

const WINDOWS = [[10, 3.6], [17, 3.6], [10, 8.4], [17, 8.4], [10, 13.2], [17, 13.2]];

export default defineIcon({
  name: 'building',
  zh: '楼房',
  category: 'home',
  tags: ['apartment', 'block', 'city', 'residence', 'company', '大楼', '公寓'],
  variants: ['plus', 'check', 'x', 'lock', 'search', 'cog'],
  // An apartment block whose windows light up floor by floor, bottom first, on hover.
  svg: (u) => {
    const body = rr(7.2, 1, 16.6, 23, KR), door = rp(R(13.2, 18.6, 4.6, 5.4), [CR, CR, 0, 0]);
    const win = ([x, y]) => rr(x, y, 4, 3.4, 0.8);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <g filter="${u.hi}"><path d="${WINDOWS.map(win).join('')}" fill="${u.upS}"/></g>
      ${WINDOWS.map((w, i) => `<path data-n="w${i}" d="${win(w)}" fill="#fff"/>`).join('')}
      <path d="${door}" fill="#fff"/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    WINDOWS.forEach((w, i) => {
      const floor = 2 - Math.floor(i / 2);
      at(E[`w${i}`], { opacity: f(clamp01((p.o - floor * 0.3) / 0.4)) });
    });
  }
});

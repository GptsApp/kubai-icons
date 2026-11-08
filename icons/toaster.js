import { defineIcon, KR, f, OL, DEEP, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'toaster',
  zh: '烤面包机',
  category: 'home',
  tags: ['toast', 'breakfast', 'kitchen', 'bread', 'appliance', '吐司机', '多士炉'],
  variants: [],
  // A toaster with two slices in it; the toast pops up on hover.
  svg: (u) => {
    const body = rr(4.4, 10, 22.2, 13, KR), lever = rr(21.4, 13.4, 2.6, 6, 1.3);
    const slice = (n, x) => {
      const d = `M${f(x + 0.5)} 12V3.6C${f(x - 0.6)} 2.6 ${f(x - 0.2)} 0 ${f(x + 2.4)} 0H${f(x + 4.6)}C${f(x + 7.2)} 0 ${f(x + 7.6)} 2.6 ${f(x + 6.5)} 3.6V12Z`;
      return `<g data-n="${n}"><g filter="${u.hi}"><path d="${d}" fill="${u.upS}"/></g><path d="${d}" ${OL}/></g>`;
    };
    return `${slice('a', 7.2)}${slice('b', 15.6)}
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.lo(13)}"/></g></g><path d="${body}" ${OL}/>
      <path d="${lever}" ${DEEP}/>`;
  },
  target: (h) => ({ y: h ? 1.8 : 5.4 }),
  draw(p, E) {
    at(E.a, { transform: `translate(0 ${f(p.y)})` });
    at(E.b, { transform: `translate(0 ${f(p.y + (5.4 - p.y) * 0.3)})` });
  }
});

import { defineIcon, f, OL, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'hash',
  zh: '话题',
  category: 'communication',
  tags: ['hashtag', 'channel', 'topic', 'number', 'pound', '#', '标签'],
  // A hash sign built from two slanted bars behind two level bars; on hover it leans further.
  svg: (u) => {
    const v = rr(-1.6, -11, 3.2, 22, 1.6), hz = rr(-10.8, -1.6, 21.6, 3.2, 1.6);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="v1"><path d="${v}" fill="${u.loS}"/></g><g data-n="v2"><path d="${v}" fill="${u.loS}"/></g></g></g>
      <g data-n="v1o"><path d="${v}" ${OL}/></g><g data-n="v2o"><path d="${v}" ${OL}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="h1" d="${hz}" fill="${u.upS}"/><path data-n="h2" d="${hz}" fill="${u.upS}"/></g></g>
      <path data-n="h1o" d="${hz}" ${OL}/><path data-n="h2o" d="${hz}" ${OL}/>`;
  },
  target: (h) => ({ k: h ? 16 : 10 }),
  draw(p, E) {
    const k = p.k;
    [['v1', 11.4], ['v2', 19.6]].forEach(([n, x]) => {
      const t = `translate(${x} 12.5) rotate(${f(k)})`;
      at(E[n], { transform: t }); at(E[n + 'o'], { transform: t });
    });
    [['h1', 8.4], ['h2', 16.6]].forEach(([n, y]) => {
      const t = `translate(15.5 ${y})`;
      at(E[n], { transform: t }); at(E[n + 'o'], { transform: t });
    });
  }
});

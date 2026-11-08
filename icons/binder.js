import { defineIcon, KR, CR, f, OL, ACC, DEEP, rr, lines, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'binder',
  zh: '档案夹',
  category: 'files',
  tags: ['binder', 'lever arch', 'file', 'folder', 'records', 'office', '文件夹'],
  variants: ['plus', 'minus', 'check', 'x', 'alert', 'up', 'down', 'clock', 'star', 'lock', 'search', 'sync'],
  // A lever-arch file seen from its spine; on hover it tips out of the shelf by its finger hole.
  svg: (u) => {
    const spine = rr(7.8, 1, 15.4, 23, KR);
    return `<g data-n="g"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${spine}" fill="${u.loS}"/></g></g><path d="${spine}" ${OL}/>
      <path d="${rr(10.2, 3.4, 10.6, 9, CR)}" fill="#fff"/>
      <path d="${lines(12.6, 6.6, [5.8, 3.8])}" ${ACC}/>
      <path d="${circ(15.5, 17.8, 2.6)}" ${DEEP}/></g>`;
  },
  target: (h) => ({ a: h ? -9 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(p.a)} 7.8 24)` }); }
});

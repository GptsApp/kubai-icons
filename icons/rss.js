import { defineIcon, KR, f, OL, rr, at } from '../packages/core/src/kit.js';

const RC = [10.2, 17.8];
const wave = (r) => `M${f(RC[0])} ${f(RC[1] - r)}A${f(r)} ${f(r)} 0 0 1 ${f(RC[0] + r)} ${f(RC[1])}`;

export default defineIcon({
  name: 'rss',
  zh: '订阅',
  category: 'communication',
  tags: ['feed', 'subscribe', 'news', 'blog', 'podcast', '订阅源'],
  variants: ['plus', 'check'],
  off: true,
  // A feed tile; on hover its waves spread outward from the dot.
  svg: (u) => {
    const tile = rr(5.2, 2.2, 20.6, 20.6, KR);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${tile}" fill="${u.loS}"/></g></g><path d="${tile}" ${OL}/>
      <circle cx="${RC[0]}" cy="${RC[1]}" r="2.1" fill="#fff" data-w="fill"/>
      <g fill="none" stroke-width="2.2" stroke-linecap="round" stroke="#fff" data-w="stroke"><path data-n="w1"/><path data-n="w2"/></g>`;
  },
  target: (h) => ({ r: h ? [6.2, 10.6] : [5.6, 9.8] }),
  draw(p, E) { at(E.w1, { d: wave(p.r[0]) }); at(E.w2, { d: wave(p.r[1]) }); }
});

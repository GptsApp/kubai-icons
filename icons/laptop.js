import { defineIcon, KR, CR, f, OL, DEEPS, R, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'laptop',
  zh: '笔记本电脑',
  category: 'devices',
  tags: ['notebook', 'computer', 'macbook', 'pc', '电脑'],
  variants: ['plus', 'check', 'x', 'alert', 'info', 'lock', 'search', 'sync', 'cog', 'down', 'up', 'sparkle'],
  // A laptop whose lid opens wider on hover, showing more of the screen.
  svg: (u) => {
    const deck = rp(R(4, 17.8, 23, 3.6), [0.8, 0.8, 1.8, 1.8]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="lid" fill="${u.loS}"/></g></g><path data-n="lidO" ${OL}/>
      <path data-n="scr" fill="#fff"/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${deck}" fill="${u.upS}"/></g></g><path d="${deck}" ${OL}/>
      <path d="M13.6 19.6H17.4" class="ln" ${DEEPS} stroke-opacity=".55"/>`;
  },
  target: (h) => ({ t: h ? 1.6 : 3.4 }),
  draw(p, E) {
    const lid = rp(R(6.2, p.t, 18.6, 18.6 - p.t), [KR, KR, 0, 0]);
    at(E.lid, { d: lid }); at(E.lidO, { d: lid });
    at(E.scr, { d: rr(8.2, p.t + 2, 14.6, 12.8 - p.t, CR) });
  }
});

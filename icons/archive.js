import { defineIcon, KR, f, OL, WHITE, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'archive',
  zh: '归档',
  category: 'files',
  tags: ['archive', 'box', 'storage', 'store', 'file box', '存档', '档案盒'],
  variants: ['plus', 'minus', 'check', 'x', 'alert', 'info', 'up', 'down', 'right', 'clock', 'star', 'lock', 'search', 'sync', 'cog', 'sparkle'],
  // A file box with a handle slot; its lid lifts off on hover.
  svg: (u) => {
    const box = rr(5.4, 7.6, 20.2, 15.2, KR), lid = rr(4, 3.4, 23, 5, 1.6);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${box}" fill="${u.lo(15.2)}"/></g></g><path d="${box}" ${OL}/>
      <path d="${rr(12, 11.4, 7, 2.6, 1.3)}" ${WHITE}/>
      <g data-n="lid"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${lid}" fill="${u.upS}"/></g></g><path d="${lid}" ${OL}/></g>`;
  },
  target: (h) => ({ lid: h ? [0.4, -3.4, -5] : [0, 0, 0] }),
  draw(p, E) { at(E.lid, { transform: `translate(${f(p.lid[0])} ${f(p.lid[1])}) rotate(${f(p.lid[2])} 15.5 5.9)` }); }
});

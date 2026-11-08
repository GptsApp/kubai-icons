import { defineIcon, KR, CR, f, OL, ACC, rp, rr, lines, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'inbox',
  zh: '收件箱',
  category: 'files',
  tags: ['inbox', 'tray', 'incoming', 'mail', 'received', '收件'],
  variants: ['plus', 'minus', 'check', 'x', 'alert', 'info', 'up', 'down', 'right', 'clock', 'star', 'lock', 'search', 'sync', 'sparkle'],
  // An in-tray with a sheet resting in it; the sheet drops down into the tray on hover.
  svg: (u) => {
    const tray = rr(4, 3.8, 23, 18.4, KR);
    const front = rp([[4, 12.6], [10.2, 12.6], [11.8, 16], [19.2, 16], [20.8, 12.6], [27, 12.6], [27, 22.2], [4, 22.2]], [1.6, 0.6, 1.2, 1.2, 0.6, 1.6, KR, KR]);
    return `<g filter="${u.sh}"><path d="${tray}" fill="${u.loS}"/></g><path d="${tray}" ${OL}/>
      <g data-n="sheet"><path d="${rr(8, 0, 15, 10, CR)}" fill="#fff"/><path d="${lines(10.8, 3, [9.4])}" ${ACC}/></g>
      <g filter="${u.hi}"><path d="${front}" fill="${u.up(9.6)}"/></g><path d="${front}" ${OL}/>`;
  },
  target: (h) => ({ y: h ? 9 : 6.6 }),
  draw(p, E) { at(E.sheet, { transform: `translate(0 ${f(p.y)})` }); }
});

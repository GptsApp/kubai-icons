import { defineIcon, KR, CR, f, OL, R, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'window-frame',
  zh: '窗户',
  category: 'home',
  tags: ['window', 'curtain', 'room', 'view', 'glass', '窗帘'],
  variants: ['lock'],
  // A four-pane window with curtains tied back; the curtains draw shut on hover.
  svg: (u) => {
    const body = rr(5.2, 2.2, 20.6, 20.6, KR);
    const panes = rr(7.6, 4.6, 6.9, 6.9, CR) + rr(16.5, 4.6, 6.9, 6.9, CR) + rr(7.6, 13.5, 6.9, 6.9, CR) + rr(16.5, 13.5, 6.9, 6.9, CR);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${panes}" fill="#fff"/>
      <g filter="${u.hi}"><path data-n="cl" fill="${u.upS}"/></g><path data-n="clO" ${OL}/>
      <g filter="${u.hi}"><path data-n="cr" fill="${u.upS}"/></g><path data-n="crO" ${OL}/>`;
  },
  target: (h) => ({ w: h ? 6.9 : 2.6 }),
  draw(p, E) {
    const l = rp(R(7.6, 4.6, p.w, 15.8), [CR, 0, 1.6, CR]), r = rp(R(23.4 - p.w, 4.6, p.w, 15.8), [0, CR, CR, 1.6]);
    at(E.cl, { d: l }); at(E.clO, { d: l }); at(E.cr, { d: r }); at(E.crO, { d: r });
  }
});

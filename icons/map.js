import { defineIcon, f, OL, R, rp, at } from '../packages/core/src/kit.js';
import { mapFolds } from './_travel-transport.js';

const RAD = [1.8, 0.6, 0.6, 1.8, 1.8, 0.6, 0.6, 1.8];

export default defineIcon({
  name: 'map',
  zh: '地图',
  category: 'travel',
  tags: ['folded map', 'atlas', 'directions', 'location', '地图'],
  variants: ['plus', 'check', 'x', 'search', 'heart', 'star', 'lock'],
  // A map folded in three panels; on hover it opens out and lies almost flat.
  svg: (u) => `<clipPath id="${u.id('mp')}"><path data-n="clip"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="m" fill="${u.loS}"/></g></g>
    <g clip-path="url(#${u.id('mp')})"><g filter="${u.hi}"><path data-n="mid" fill="${u.upS}"/></g></g>
    <path data-n="mO" ${OL}/>`,
  target: (h) => ({ w: h ? 11.6 : 10.6, a: h ? 0.6 : 2.4 }),
  draw(p, E) {
    const { x, pts } = mapFolds(p.w, p.a, 3.4, 21.6);
    const d = rp(pts, RAD);
    at(E.clip, { d }); at(E.m, { d }); at(E.mO, { d });
    at(E.mid, { d: rp(R(x[1], 1, x[2] - x[1], 23), 0) });
  }
});

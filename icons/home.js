import { defineIcon, KR, f, OL, R, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'home',
  zh: '主页',
  category: 'home',
  tags: ['house', 'start', 'main', 'building'],
  variants: ['plus', 'check', 'x', 'heart', 'star', 'lock', 'search', 'cog', 'sparkle'],
  // The new-tab home: a house whose door swings out past its hinge on hover, leaving the
  // doorway open.
  svg: (u) => {
    const roof = rp([[3.6, 12.6], [15.5, 2.4], [27.4, 12.6]], [1.4, 2.2, 1.4]);
    const door = rp(R(13.2, 15.6, 4.6, 7.4), [1.2, 1.2, 0, 0]);
    return `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${rr(7.4, 10.6, 16.2, 12.4, KR)}" fill="${u.loS}"/></g></g>
    <path d="${rr(7.4, 10.6, 16.2, 12.4, KR)}" ${OL}/>
    <path d="${door}" fill="${u.pure('#2F6FE0')}"/>
    <g data-n="door"><path d="${door}" fill="#fff"/></g>
    <g filter="${u.hi}"><path d="${roof}" fill="${u.upS}"/></g>
    <path d="${roof}" ${OL}/>`;
  },
  target: (h) => ({ door: h ? -0.4 : 1 }),
  draw(p, E) {
    at(E.door, { transform: `translate(13.2 0) scale(${f(Math.abs(p.door) < 0.001 ? 0.001 : p.door)} 1) translate(-13.2 0)` });
  }
});

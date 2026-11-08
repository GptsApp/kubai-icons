import { defineIcon, KR, f, OL, R, rp, rr, star, at, clamp01, bump } from '../packages/core/src/kit.js';

const SWAY = 3;

export default defineIcon({
  name: 'bookmark',
  zh: '书签',
  category: 'interface',
  tags: ['save', 'favorite', 'read later', 'ribbon'],
  variants: ['plus', 'minus', 'check', 'x'],
  tap: true,
  // A coloured card with a white ribbon, as the folder carries its white file; on hover the
  // ribbon drops lower with a sway; saving turns the ribbon deep and adds a star.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${rr(6.3, 1.5, 18.4, 22, KR)}" fill="${u.lo(22)}"/></g></g>
    <path d="${rr(6.3, 1.5, 18.4, 22, KR)}" ${OL}/>
    <path data-n="rib" fill="#fff"/>
    <path data-n="ribF" fill="${u.pure('#2F6FE0')}"/>
    <path data-n="star" d="${star(2.3, 1.05)}" fill="#fff"/>
    <g filter="${u.hi}"><path d="${rp(R(6.3, 17.4, 18.4, 6.1), [1.6, 1.6, KR, KR])}" fill="${u.upS}"/></g>
    <path d="${rp(R(6.3, 17.4, 18.4, 6.1), [1.6, 1.6, KR, KR])}" ${OL}/>`,
  target: (h, s) => ({ yb: s.active ? (h ? 16.2 : 15.2) : (h ? 16.2 : 12.2), fo: s.active ? 1 : 0, o: h ? 1 : 0 }),
  draw(p, E) {
    // The ribbon swings out and back as it falls, leaning about its top edge, most at the tails.
    const y = p.yb, o = clamp01(p.o), w = SWAY * o * o * bump(o), x = (v, at) => f(v + w * (at - 1.5) / (y - 1.5));
    const d = rp([[10.2, 1.5], [17.6, 1.5], [x(17.6, y), y], [x(13.9, y - 2.8), y - 2.8], [x(10.2, y), y]], [0, 0, 0.6, 0.7, 0.6]);
    at(E.rib, { d }); at(E.ribF, { d, opacity: f(p.fo) });
    at(E.star, { transform: `translate(${x(13.9, 1.5 + (y - 4.3) * 0.5)} ${f(1.5 + (y - 4.3) * 0.5)}) scale(${f(Math.max(0.001, p.fo))})` });
  }
});

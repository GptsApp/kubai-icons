import { defineIcon, f, OL, DEEPS, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'lamp',
  zh: '台灯',
  category: 'home',
  tags: ['light', 'desk lamp', 'table lamp', 'bedside', 'reading', '灯'],
  variants: ['plus', 'cog'],
  off: true,
  // A table lamp that switches on: its shade glows on hover.
  svg: (u) => {
    const shade = rp([[10.6, 2.6], [20.4, 2.6], [24.4, 13], [6.6, 13]], [1.4, 1.4, 1.6, 1.6]);
    const base = rr(9.6, 19.8, 11.8, 3.4, 1.7);
    return `<path d="M15.5 12V20" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${base}" fill="${u.loS}"/></g></g><path d="${base}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${shade}" fill="${u.upS}"/></g></g>
      <path data-n="glow" d="${shade}" fill="#fff"/><path d="${shade}" ${OL}/>`;
  },
  target: (h) => ({ glow: h ? 0.9 : 0 }),
  draw(p, E) { at(E.glow, { opacity: f(p.glow) }); }
});

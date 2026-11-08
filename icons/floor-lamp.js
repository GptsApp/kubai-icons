import { defineIcon, f, OL, DEEP, DEEPS, rp, rr, at, bump, clamp01 } from '../packages/core/src/kit.js';
import { back, front } from './_b1-home.js';

const CHAIN_X = 19.2;

export default defineIcon({
  name: 'floor-lamp',
  zh: '落地灯',
  category: 'home',
  tags: ['light', 'standing lamp', 'living room', 'lighting', '灯', '立灯'],
  off: true,
  // A tall standing lamp with a pull chain; on hover the chain is tugged and the shade lights up.
  svg: (u) => {
    const shade = rp([[12, 0.4], [19, 0.4], [22.2, 7.6], [8.8, 7.6]], [1.2, 1.2, 1.4, 1.4]);
    const beam = rp([[10.4, 8.2], [20.6, 8.2], [26.4, 22.6], [4.6, 22.6]], 1.2);
    return `<path data-n="beam" d="${beam}" data-t="fill:#D3E2FC" opacity="0"/>
      <path d="M15.5 7V22.4" fill="none" stroke-width="2.4" stroke-linecap="round" ${DEEPS}/>
      <g data-n="pull"><path d="M${CHAIN_X} 7.6V12.4" fill="none" stroke-width="1.6" ${DEEPS}/><circle cx="${CHAIN_X}" cy="13.4" r="1.5" ${DEEP}/></g>
      ${back(u, rr(11.3, 21.2, 8.4, 2.8, 1.4))}
      ${front(u, shade)}
      <path data-n="glow" d="${shade}" fill="#fff" opacity="0"/><path d="${shade}" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), g = f(0.9 * clamp01((o - 0.2) / 0.5));
    at(E.pull, { transform: `translate(0 ${f(2.4 * bump(o))})` });
    at(E.glow, { opacity: g });
    at(E.beam, { opacity: g });
  }
});

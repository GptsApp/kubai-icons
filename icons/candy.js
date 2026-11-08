import { defineIcon, f, OL, DEEPS, rp, circ, at, scaleAt, clamp01 } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'candy',
  zh: '糖果',
  category: 'food',
  tags: ['sweet', 'sweets', 'lolly', 'treat', 'halloween', '糖'],
  variants: ['heart', 'star'],
  // A wrapped sweet; on hover it spins half a turn and its wrapper ends twist.
  svg: (u) => {
    const l = rp([[10.6, 12.5], [4, 7.2], [4, 17.8]], [0.4, 1.4, 1.4]), r = rp([[20.4, 12.5], [27, 7.2], [27, 17.8]], [0.4, 1.4, 1.4]);
    const body = circ(15.5, 12.5, 6);
    return `<g data-n="l"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${l}" fill="${u.loS}"/></g></g><path d="${l}" ${OL}/></g>
      <g data-n="r"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${r}" fill="${u.loS}"/></g></g><path d="${r}" ${OL}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.upS}"/></g></g><path d="${body}" ${OL}/>
      <path data-n="st" d="M11.6 15L16.6 7.8M14.4 17.2L19.4 10" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS} stroke-opacity=".6"/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), k = Math.cos(o * Math.PI), sy = Math.abs(k) < 0.02 ? 0.02 : k;
    at(E.l, { transform: scaleAt(1, 7, 12.5, sy) }); at(E.r, { transform: scaleAt(1, 24, 12.5, sy) });
    at(E.st, { transform: `rotate(${f(180 * o)} 15.5 12.5)` });
  }
});

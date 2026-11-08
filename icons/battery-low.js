import { defineIcon, KR, f, OL, DEEP, R, rp, rr, at, clamp01, rattle, wave } from '../packages/core/src/kit.js';

// The shell, shifted right by x.
const body = (x) => rr(3.6 + x, 6.4, 21.6, 12.2, KR);
const nub = (x) => rp(R(24.6 + x, 10, 2.8, 5), [0, 1.2, 1.2, 0]);

export default defineIcon({
  name: 'battery-low',
  zh: '电量低',
  category: 'devices',
  tags: ['battery', 'low power', 'empty', 'drain', '没电'],
  variants: ['alert', 'bolt'],
  // A battery that is nearly flat; on hover it gives a warning shiver while the last of its
  // charge drains and flickers.
  svg: (u) => `<g filter="${u.sh}"><path data-n="nb" d="${nub(0)}" fill="${u.loS}"/></g><path data-n="nbO" d="${nub(0)}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="bd" d="${body(0)}" fill="${u.loS}"/></g></g><path data-n="bdO" d="${body(0)}" ${OL}/>
      <path data-n="wn" d="${rr(5.8, 8.6, 17.2, 7.8, 1.2)}" fill="#fff"/>
      <path data-n="lvl" ${DEEP}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), x = rattle(o, 0.8, 3);
    const n = nub(x), b = body(x);
    at(E.nb, { d: n }); at(E.nbO, { d: n }); at(E.bd, { d: b }); at(E.bdO, { d: b });
    at(E.wn, { d: rr(5.8 + x, 8.6, 17.2, 7.8, 1.2) });
    at(E.lvl, { d: rr(7.2 + x, 10, 4.6 - 2.8 * o, 5, 0.8), opacity: f(1 - 0.85 * wave(o, (t) => Math.abs(Math.sin(2 * Math.PI * t)) * (1 - 0.5 * t))) });
  }
});

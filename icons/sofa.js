import { defineIcon, KR, f, OL, DEEP, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'sofa',
  zh: '沙发',
  category: 'home',
  tags: ['couch', 'living room', 'furniture', 'lounge', 'relax', '客厅'],
  variants: ['plus', 'heart'],
  // A two-seat sofa from the front; on hover it sinks as if sat on, springs up and settles.
  svg: (u) => {
    const back = rr(6.8, 5.4, 17.4, 11.4, KR);
    const arms = rr(4, 10.8, 5.4, 10.8, 2.4) + rr(21.6, 10.8, 5.4, 10.8, 2.4);
    return `<path d="${rr(5.4, 20.4, 2.6, 2.8, 0.8) + rr(23, 20.4, 2.6, 2.8, 0.8)}" ${DEEP}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${back}" data-n="bk" fill="${u.loS}"/></g></g><path d="${back}" data-n="bkO" ${OL}/>
      <g filter="${u.hi}"><path data-n="s1" fill="${u.upS}"/></g><path data-n="s1O" ${OL}/>
      <g filter="${u.hi}"><path data-n="s2" fill="${u.upS}"/></g><path data-n="s2O" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${arms}" data-n="ar" fill="${u.loS}"/></g></g><path d="${arms}" data-n="arO" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // Every part keeps its bottom edge and lowers its top: the seat most, the frame less.
    const o = clamp01(p.o), s = rattle(o, 1, 3);
    const back = rr(6.8, 5.4 + 1.4 * s, 17.4, 11.4 - 1.4 * s, KR);
    const arms = rr(4, 10.8 + 1.2 * s, 5.4, 10.8 - 1.2 * s, 2.4) + rr(21.6, 10.8 + 1.2 * s, 5.4, 10.8 - 1.2 * s, 2.4);
    at(E.bk, { d: back }); at(E.bkO, { d: back }); at(E.ar, { d: arms }); at(E.arO, { d: arms });
    [[8.4, 0], [15.5, 0.08]].forEach(([x, lag], i) => {
      const dy = rattle(clamp01((o - lag) / (1 - lag)), 2.8, 3);
      const d = rr(x, 13.8 + dy, 7.1, 7.2 - dy, 1.6);
      at(E[`s${i + 1}`], { d }); at(E[`s${i + 1}O`], { d });
    });
  }
});

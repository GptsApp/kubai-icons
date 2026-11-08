import { defineIcon, f, OL, DEEP, rr, circ, at, scaleAt, bump } from '../packages/core/src/kit.js';

const PUSH = 0.16;
const PLATE = rr(7.5, 1, 16, 23, 8);

export default defineIcon({
  name: 'lock-keyhole',
  zh: '锁孔',
  category: 'security',
  tags: ['keyhole', 'door lock', 'lock', 'secure', '门锁'],
  // A lock plate with its key cylinder; on hover the cylinder presses in, turns past a quarter and
  // springs back to it, as a key would turn it.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${PLATE}" fill="${u.loS}"/></g></g>
    <path d="${PLATE}" ${OL}/>
    <g filter="${u.hi}"><path data-n="cf" d="${circ(15.5, 12.5, 5)}" fill="${u.upS}"/></g>
    <path data-n="co" d="${circ(15.5, 12.5, 5)}" ${OL}/>
    <g data-n="hole" ${DEEP}><circle cx="15.5" cy="11.2" r="1.8"/><path d="${rr(14.6, 11.4, 1.8, 4.2, 0.9)}"/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const a = -90 * p.o - 40 * bump(p.o), k = 1 - PUSH * bump(p.o);
    at(E.cf, { d: circ(15.5, 12.5, 5 * k) }); at(E.co, { d: circ(15.5, 12.5, 5 * k) });
    at(E.hole, { transform: p.o ? `rotate(${f(a)} 15.5 12.5) ${scaleAt(k, 15.5, 12.5)}` : `rotate(${f(a)} 15.5 12.5)` });
  }
});

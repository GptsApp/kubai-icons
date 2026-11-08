import { defineIcon, f, OL, DEEP, DEEPS, R, rp, rr, at, clamp01, rattle } from '../packages/core/src/kit.js';

// The scale with its top pushed down by dy: the body gets shorter and the pad gives half as much.
const body = (dy) => rr(5.2, 2.2 + dy, 20.6, 20.6 - dy, 4);
const dial = (dy) => rp(R(9.4, 4.6 + dy, 12.2, 6.6), [3.4, 3.4, 1.2, 1.2]);
const pad = (dy) => rp(R(5.2, 13.6 + dy / 2, 20.6, 9.2 - dy / 2), [1.8, 1.8, 4, 4]);

export default defineIcon({
  name: 'weight-scale',
  zh: '体重秤',
  category: 'health',
  tags: ['scale', 'weight', 'bathroom scale', 'fitness', 'body', '称重'],
  // A bathroom scale; on hover it is stepped on: its top dips and springs back while the needle
  // swings up, wavers and settles on a reading.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="body" d="${body(0)}" fill="${u.loS}"/></g></g>
    <path data-n="bodyO" d="${body(0)}" ${OL}/>
    <path data-n="dial" d="${dial(0)}" fill="#fff"/>
    <path data-n="nd" d="M15.5 10.4V6.6" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    <circle data-n="hub" cx="15.5" cy="10.4" r="1.3" ${DEEP}/>
    <g filter="${u.hi}"><path data-n="pad" d="${pad(0)}" fill="${u.upS}"/></g>
    <path data-n="padO" d="${pad(0)}" ${OL}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), a = -45 + 80 * o + rattle(o, 16, 2);
    const dy = rattle(o, 2, 1), cy = f(10.4 + dy);
    at(E.body, { d: body(dy) }); at(E.bodyO, { d: body(dy) }); at(E.dial, { d: dial(dy) });
    at(E.pad, { d: pad(dy) }); at(E.padO, { d: pad(dy) });
    at(E.nd, { d: `M15.5 ${cy}V${f(6.6 + dy)}`, transform: `rotate(${f(a)} 15.5 ${cy})` });
    at(E.hub, { cy });
  }
});

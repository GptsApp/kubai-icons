import { defineIcon, f, OL, DEEPS, circ, gear, at } from '../packages/core/src/kit.js';

const polar = (r, a) => [15.5 + r * Math.sin(a * Math.PI / 180), 12.5 - r * Math.cos(a * Math.PI / 180)];
const TYRE = gear(18, 11.6, 10.4);
const SLOTS = Array.from({ length: 5 }, (_, i) => { const p = polar(2.9, i * 72), q = polar(4.7, i * 72); return `M${f(p[0])} ${f(p[1])}L${f(q[0])} ${f(q[1])}`; }).join('');

export default defineIcon({
  name: 'tire',
  zh: '轮胎',
  category: 'transport',
  tags: ['tyre', 'wheel', 'tire', 'car', 'rim', 'repair', 'garage', '车轮', '换胎'],
  // A treaded tyre on a slotted rim; on hover it rolls half a turn.
  svg: (u) => `<g filter="${u.sh}"><g data-n="t"><path d="${TYRE}" fill="${u.pure('#2F6FE0')}"/></g></g><g data-n="tO"><path d="${TYRE}" ${OL}/></g>
    <g filter="${u.hi}"><path d="${circ(15.5, 12.5, 7)}" fill="${u.upS}"/></g><path d="${circ(15.5, 12.5, 7)}" ${OL}/>
    <g data-n="r"><path d="${SLOTS}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/></g>`,
  target: (h) => ({ a: h ? 180 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(p.a)} 15.5 12.5)`;
    ['t', 'tO', 'r'].forEach((n) => at(E[n], { transform: t }));
  }
});

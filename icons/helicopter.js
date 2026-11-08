import { defineIcon, f, OL, DEEPS, rp, rr, clamp01, at } from '../packages/core/src/kit.js';

const CABIN = 'M10 9.6H17C22.6 9.6 25.8 12.6 25.8 15.4C25.8 17.4 24.2 18.6 21.8 18.6H11.2Q9.2 18.6 9.2 16.6V10.4Q9.2 9.6 10 9.6Z';
const TAIL = rr(3.4, 11.4, 8, 2.6, 1.3) + rp([[2.6, 14], [3.4, 7.8], [5.8, 7.8], [7.2, 12.6]], [0.6, 0.8, 0.8, 0.6]);
const GLASS = 'M18.4 11.8C21.4 12 23.4 13.4 23.8 15.2H18.4Z';

export default defineIcon({
  name: 'helicopter',
  zh: '直升机',
  category: 'transport',
  tags: ['chopper', 'heli', 'rescue', 'aviation', 'fly', '直升飞机'],
  // A helicopter on its skids; on hover the rotor spins up and it lifts off.
  svg: (u) => `<g transform="translate(0 -1.2)"><g data-n="h">
    <path d="M16.8 9.6V6.4M12.4 18.6V22.2M21.4 18.6V22.2M9.4 22.2H24.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${TAIL}" fill="${u.loS}"/></g></g><path d="${TAIL}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${CABIN}" fill="${u.loS}"/></g></g><path d="${CABIN}" ${OL}/>
    <path d="${GLASS}" fill="#fff"/>
    <g filter="${u.hi}"><path data-n="bl" fill="${u.upS}"/></g><path data-n="blO" ${OL}/></g></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), L = Math.max(1.2, 11.4 * Math.abs(Math.cos(2 * Math.PI * o)));
    const d = rr(16.8 - L, 4.2, 2 * L, 2.4, 1.2);
    at(E.bl, { d }); at(E.blO, { d });
    at(E.h, { transform: `translate(0 ${f(-1.4 * o)})` });
  }
});

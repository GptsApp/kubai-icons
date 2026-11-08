import { defineIcon, f, OL, DEEPS, R, rp, circ, rattle, at, clamp01 } from '../packages/core/src/kit.js';

const CHAMBER = circ(12.2, 13.4, 7.4), MOUTH = rp(R(11, 6, 16, 5.8), [1.6, 1.8, 1.8, 0]);

export default defineIcon({
  name: 'whistle',
  zh: '口哨',
  category: 'sports',
  tags: ['referee', 'coach', 'blow', 'sport', 'signal', '裁判'],
  // A referee's whistle; on hover it is blown: it shakes and sound lines come out of the slot.
  svg: (u) => `<g data-n="g">
    <path d="${circ(5.6, 7.2, 2.6)}" fill="none" stroke-width="1.6" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${CHAMBER}" fill="${u.loS}"/></g></g><path d="${CHAMBER}" ${OL}/>
    <circle cx="12.2" cy="14.6" r="2.6" fill="#fff" data-w="fill"/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${MOUTH}" fill="${u.upS}"/></g></g><path d="${MOUTH}" ${OL}/></g>
    <path data-n="s" d="M19.4 3.8L18.4 1.2M23 3.8V1M26.6 3.8L27.6 1.2" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.g, { transform: `rotate(${f(rattle(o, 5, 3))} 15.5 13)` });
    at(E.s, { opacity: f(clamp01(o * 1.6 - 0.4)), transform: `translate(0 ${f(1.2 * (1 - o))})` });
  }
});

import { defineIcon, f, OL, DEEP, rr, circ, at, clamp01, rattle } from '../packages/core/src/kit.js';

// Drawn upright, then leaned so the head points to the upper right.
const LEAN = 45;
const BODY = circ(15.5, 18.2, 5.8) + circ(15.5, 11.8, 4.5);
const NECK = rr(14.3, -0.4, 2.4, 13, 0.6) + rr(13.2, -3.4, 4.6, 3.8, 1.2);

export default defineIcon({
  name: 'guitar',
  zh: '吉他',
  category: 'media',
  tags: ['acoustic', 'instrument', 'music', 'strum', 'band', '乐器'],
  // An acoustic guitar leaning to the right; on hover it is strummed and rocks gently on its base.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="b"><path d="${BODY}" fill="${u.loS}"/></g></g></g>
    <g data-n="bo"><path d="${BODY}" ${OL}/><circle cx="15.5" cy="16.2" r="2.2" ${DEEP}/>
      <path d="${rr(13.1, 19.6, 4.8, 2.4, 1)}" fill="#fff" data-w="fill"/></g>
    <g filter="${u.hi}"><g data-n="n"><path d="${NECK}" fill="${u.upS}"/></g></g>
    <g data-n="no"><path d="${NECK}" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The strum rocks it about the lowest point of its body.
    const t = `rotate(${f(rattle(clamp01(p.o), 6, 3))} 5.9 22.1) translate(0 2.3) rotate(${LEAN} 15.5 10.2)`;
    ['b', 'bo', 'n', 'no'].forEach((k) => at(E[k], { transform: t }));
  }
});

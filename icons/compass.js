import { defineIcon, f, OL, DEEP, rp, circ, at, wave } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'compass',
  zh: '指南针',
  category: 'travel',
  tags: ['direction', 'navigation', 'north', 'explore'],
  // A compass resting a little off north. On hover the needle swings past north and back,
  // each swing smaller, and settles pointing north.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 11.5)}" fill="${u.loS}"/></g></g>
    <path d="${circ(15.5, 12.5, 11.5)}" ${OL}/>
    <path d="${circ(15.5, 12.5, 8.6)}" fill="#fff"/>
    <g data-n="needle">
      <path d="${rp([[13.1, 12.5], [15.5, 5.9], [17.9, 12.5]], [0, 0.6, 0])}" ${DEEP}/>
      <path d="${rp([[17.9, 12.5], [15.5, 19.1], [13.1, 12.5]], [0, 0.6, 0])}" data-t="fill:#89B5FF"/>
      <circle cx="15.5" cy="12.5" r="1.3" fill="#fff"/>
    </g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o));
    at(E.needle, { transform: `rotate(${f(wave(o, (t) => 40 * (1 - t) * Math.cos(3 * Math.PI * t)))} 15.5 12.5)` });
  }
});

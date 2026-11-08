import { defineIcon, f, OL, DEEP, circ, at } from '../packages/core/src/kit.js';

const RX = 9.2, RY = 3.8, TILT = [45, 135], START = [Math.PI, Math.PI];
const onOrbit = (k, t) => {
  const a = TILT[k] * Math.PI / 180, x = RX * Math.cos(t), y = RY * Math.sin(t);
  return [15.5 + x * Math.cos(a) - y * Math.sin(a), 12.5 + x * Math.sin(a) + y * Math.cos(a)];
};

export default defineIcon({
  name: 'atom',
  zh: '原子',
  category: 'science',
  tags: ['physics', 'science', 'nucleus', 'electron', '物理', '原子核'],
  // Two orbits round a nucleus; on hover each electron travels half way round.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 11.5)}" fill="${u.loS}"/></g></g>
    <path d="${circ(15.5, 12.5, 11.5)}" ${OL}/>
    <g fill="none" stroke-width="1.6" stroke="#fff" data-w="stroke">${TILT.map((a) => `<ellipse cx="15.5" cy="12.5" rx="${RX}" ry="${RY}" transform="rotate(${a} 15.5 12.5)"/>`).join('')}</g>
    <path d="${circ(15.5, 12.5, 2.3)}" ${DEEP}/>
    ${TILT.map((_, k) => `<path data-n="e${k}" d="${circ(0, 0, 1.6)}" ${DEEP}/>`).join('')}`,
  target: (h) => ({ t: h ? Math.PI : 0 }),
  draw(p, E) {
    TILT.forEach((_, k) => { const q = onOrbit(k, START[k] + p.t); at(E[`e${k}`], { transform: `translate(${f(q[0])} ${f(q[1])})` }); });
  }
});

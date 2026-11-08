import { defineIcon, f, OL, circ, at, clamp01, bump } from '../packages/core/src/kit.js';

const SEAMS = 'M-9.4 -6.8C-4 -3.6 -4 3.6 -9.4 6.8M9.4 -6.8C4 -3.6 4 3.6 9.4 6.8';

export default defineIcon({
  name: 'tennis-ball',
  zh: '网球',
  category: 'sports',
  tags: ['tennis', 'ball', 'sport', 'game'],
  // A tennis ball; on hover it bounces and lands spun a third of a turn.
  svg: (u) => `<clipPath id="${u.id('tb')}"><path d="${circ(0, 0, 11.5)}"/></clipPath>
    <g data-n="g"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(0, 0, 11.5)}" fill="${u.loS}"/></g></g>
      <g clip-path="url(#${u.id('tb')})"><path data-n="s" d="${SEAMS}" fill="none" stroke-width="1.6" stroke="#fff" data-w="stroke"/></g>
      <path d="${circ(0, 0, 11.5)}" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.g, { transform: `translate(15.5 ${f(12.5 - 1.8 * bump(o))})` });
    at(E.s, { transform: `rotate(${f(-120 * o)})` });
  }
});

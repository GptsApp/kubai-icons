import { defineIcon, f, OL, circ, at } from '../packages/core/src/kit.js';

const SEAMS = 'M0 -11.5V11.5M-11.5 0H11.5M-7.4 -8.8C-3.4 -4.4 -3.4 4.4 -7.4 8.8M7.4 -8.8C3.4 -4.4 3.4 4.4 7.4 8.8';

export default defineIcon({
  name: 'basketball',
  zh: '篮球',
  category: 'sports',
  tags: ['ball', 'sport', 'nba', 'hoop', 'game'],
  // A basketball; on hover it spins half a turn.
  svg: (u) => `<clipPath id="${u.id('bb')}"><path d="${circ(15.5, 12.5, 11.5)}"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 11.5)}" fill="${u.loS}"/></g></g>
    <g clip-path="url(#${u.id('bb')})"><path data-n="s" d="${SEAMS}" fill="none" stroke-width="1.6" stroke="#fff" data-w="stroke"/></g>
    <path d="${circ(15.5, 12.5, 11.5)}" ${OL}/>`,
  target: (h) => ({ a: h ? 180 : 0 }),
  draw(p, E) { at(E.s, { transform: `translate(15.5 12.5) rotate(${f(p.a)})` }); }
});

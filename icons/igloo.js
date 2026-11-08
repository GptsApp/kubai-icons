import { defineIcon, f, WHITES, circ, at } from '../packages/core/src/kit.js';
import { back, front, setD, puff } from './_b6-vehicles.js';

const DOME = 'M5 21H26Q27.4 21 27.4 19.6A11.9 15 0 0 0 3.6 19.6Q3.6 21 5 21Z';
const DOOR = 'M13.1 21V16.6A2.4 2.4 0 0 1 17.9 16.6V21Z';

export default defineIcon({
  name: 'igloo',
  zh: '冰屋',
  category: 'travel',
  tags: ['snow house', 'arctic', 'inuit', 'ice', 'winter', 'shelter', '雪屋', '极地'],
  // A snow-block dome with an arched entrance; on hover a lamp comes on inside and a wisp
  // of warm air rises from the top.
  svg: (u) => `${puff(u, 'p')}
    <clipPath id="${u.id('d')}"><path d="${DOME}"/></clipPath>
    <g transform="translate(0 -0.2)">${back(u, DOME, u.loS)}
    <path d="M2 16Q15.5 13.6 29 16M2 11.2Q15.5 8.8 29 11.2M15.5 4V9.6M8.4 10.4V15M22.6 10.4V15"
      fill="none" stroke-width="1.6" stroke-linecap="round" clip-path="url(#${u.id('d')})" ${WHITES}/>
    ${front(u, 'M10.6 21V15.6A4.9 4.9 0 0 1 20.4 15.6V21Z', u.upS)}
    <path d="${DOOR}" fill="${u.pure('#2F6FE0')}"/>
    <path data-n="l" d="${DOOR}" fill="#fff"/></g>`,
  target: (h) => ({ s: h ? 1 : 0, p: h ? [18.4, 1.4, 2] : [15.5, 7.4, 0.6] }),
  draw(p, E) {
    at(E.l, { opacity: f(p.s) });
    setD(E, 'p', circ(p.p[0], p.p[1], p.p[2]));
  }
});

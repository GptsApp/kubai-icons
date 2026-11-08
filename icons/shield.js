import { defineIcon, f, OL, at } from '../packages/core/src/kit.js';

const SHIELD = 'M15.5 1.4L24.2 4.8V11.4C24.2 17.2 20.6 21.6 15.5 23.8C10.4 21.6 6.8 17.2 6.8 11.4V4.8Z';
const PLATE = 'M15.5 5.2L20.6 7.2V11.6C20.6 15.4 18.6 18.2 15.5 19.8C12.4 18.2 10.4 15.4 10.4 11.6V7.2Z';

export default defineIcon({
  name: 'shield',
  zh: '防护',
  category: 'security',
  tags: ['protect', 'security', 'safe', 'defense', 'guard', '安全'],
  variants: ['plus', 'minus', 'x', 'alert', 'info', 'lock', 'star', 'bolt'],
  // A shield with a raised inner plate; on hover it is lifted up to guard.
  svg: (u) => `<g data-n="g">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${SHIELD}" fill="${u.loS}"/></g></g>
      <path d="${SHIELD}" ${OL}/>
      <g filter="${u.hi}"><path d="${PLATE}" fill="${u.upS}"/></g>
      <path d="${PLATE}" ${OL}/>
    </g>`,
  target: (h) => ({ y: h ? -1 : 0, s: h ? 1.06 : 1 }),
  draw(p, E) { at(E.g, { transform: `translate(15.5 ${f(12.6 + p.y)}) scale(${f(p.s)}) translate(-15.5 -12.6)` }); }
});

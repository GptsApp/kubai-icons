import { defineIcon, f, OL, DEEP, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'vinyl',
  zh: '黑胶唱片',
  category: 'media',
  tags: ['record', 'disc', 'lp', 'turntable', 'music', '唱片'],
  // A record with a light label and a groove sheen; on hover it spins.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 11.5)}" fill="${u.loS}"/></g></g>
    <path d="${circ(15.5, 12.5, 11.5)}" ${OL}/>
    <g data-n="spin"><path d="M7.4 -3.2A8 8 0 0 0 3.2 -7.4M-7.4 3.2A8 8 0 0 0 -3.2 7.4" fill="none" stroke-width="1.6" stroke-linecap="round" stroke="#fff" data-w="stroke" opacity=".8"/></g>
    <g filter="${u.hi}"><path d="${circ(15.5, 12.5, 4.4)}" fill="${u.upS}"/></g><path d="${circ(15.5, 12.5, 4.4)}" ${OL}/>
    <circle cx="15.5" cy="12.5" r="1.3" ${DEEP}/>`,
  target: (h) => ({ rot: h ? 150 : 0 }),
  draw(p, E) { at(E.spin, { transform: `translate(15.5 12.5) rotate(${f(p.rot)})` }); }
});

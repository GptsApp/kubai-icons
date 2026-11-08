import { defineIcon, f, OL, rr, at } from '../packages/core/src/kit.js';
import { cwCirc } from './_security-time-health.js';

// Drawn level about the origin; every part winds the same way so they fill as one.
const BONE = rr(-7.6, -2, 15.2, 4, 0) + [[-7.6, -2.4], [-7.6, 2.4], [7.6, -2.4], [7.6, 2.4]].map(([x, y]) => cwCirc(x, y, 3.2)).join('');

export default defineIcon({
  name: 'bone',
  zh: '骨骼',
  category: 'health',
  tags: ['bone', 'skeleton', 'orthopedic', 'fracture', 'pet', '骨头'],
  // A bone lit on its upper side; on hover it is tossed end over end.
  svg: (u) => `<clipPath id="${u.id('top')}"><rect x="0" y="-3" width="31" height="15.5"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="b0"><path d="${BONE}" fill="${u.loS}"/></g></g></g>
    <g clip-path="url(#${u.id('top')})"><g filter="${u.hi}"><g data-n="b1"><path d="${BONE}" fill="${u.upS}"/></g></g></g>
    <g data-n="b2"><path d="${BONE}" ${OL}/></g>`,
  target: (h) => ({ a: h ? 135 : -45 }),
  draw(p, E) {
    const t = `translate(15.5 12.5) rotate(${f(p.a)})`;
    at(E.b0, { transform: t }); at(E.b1, { transform: t }); at(E.b2, { transform: t });
  }
});

import { defineIcon, f, OL, R, rp, at } from '../packages/core/src/kit.js';

// Drawn level about the origin and laid at 45 degrees.
const A = rp(R(-11, -4.7, 11.4, 9.4), [4.7, 0, 0, 4.7]), B = rp(R(0, -4.7, 11, 9.4), [0, 4.7, 4.7, 0]);
const PLACE = 'translate(15.5 12.5) rotate(-45)';

export default defineIcon({
  name: 'pill',
  zh: '胶囊',
  category: 'health',
  tags: ['capsule', 'medicine', 'drug', 'pharmacy', 'tablet', '药'],
  // A two-tone capsule; on hover its halves pull apart.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><g transform="${PLACE}"><path data-n="a" d="${A}" fill="${u.loS}"/></g></g></g>
    <g transform="${PLACE}"><path data-n="aO" d="${A}" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><g transform="${PLACE}"><path data-n="b" d="${B}" fill="${u.upS}"/></g></g></g>
    <g transform="${PLACE}"><path data-n="bO" d="${B}" ${OL}/></g>`,
  target: (h) => ({ d: h ? 2.2 : 0 }),
  draw(p, E) {
    const l = `translate(${f(-p.d)} 0)`, r = `translate(${f(p.d)} 0)`;
    at(E.a, { transform: l }); at(E.aO, { transform: l }); at(E.b, { transform: r }); at(E.bO, { transform: r });
  }
});

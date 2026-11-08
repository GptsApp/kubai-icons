import { defineIcon, f, OL, DEEP, DEEPS, rr, at } from '../packages/core/src/kit.js';

// Drawn level about the origin, needle to the left, then laid at 45 degrees.
const PLACE = 'translate(15.5 12.5) rotate(-45)';
const BARREL = rr(-7.4, -3.4, 13, 6.8, 1.4), FLANGE = rr(5.4, -5.8, 2.4, 11.6, 1.2), HUB = rr(-9.8, -1.6, 2.6, 3.2, 0.6);

export default defineIcon({
  name: 'syringe',
  zh: '注射器',
  category: 'health',
  tags: ['injection', 'vaccine', 'needle', 'shot', 'medicine', '打针'],
  // A syringe; on hover the plunger is pushed home and the dose goes in.
  svg: (u) => `<clipPath id="${u.id('br')}"><path d="${BARREL}"/></clipPath>
    <g transform="${PLACE}">
      <path d="M-14.4 0H-9" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <path data-n="rod" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    </g>
    <g filter="${u.sh}"><g filter="${u.hi}"><g transform="${PLACE}"><path d="${HUB}" fill="${u.loS}"/></g></g></g>
    <g transform="${PLACE}"><path d="${HUB}" ${OL}/></g>
    <g filter="${u.sh}"><g transform="${PLACE}"><path d="${BARREL}" fill="#fff"/></g></g>
    <g transform="${PLACE}"><g clip-path="url(#${u.id('br')})"><path data-n="dose" fill="${u.loS}"/><path data-n="head" ${DEEP}/></g>
      <path d="${BARREL}" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><g transform="${PLACE}"><path d="${FLANGE}" fill="${u.loS}"/><path data-n="thumb" fill="${u.loS}"/></g></g></g>
    <g transform="${PLACE}"><path d="${FLANGE}" ${OL}/><path data-n="thumbO" ${OL}/></g>`,
  target: (h) => ({ x: h ? -2.2 : 1.6 }),
  draw(p, E) {
    // p.x is the plunger head; the thumb rest rides 10 units behind it.
    at(E.dose, { d: rr(-8, -3.4, p.x + 8, 6.8, 0) });
    at(E.head, { d: rr(p.x, -3.4, 2, 6.8, 0) });
    at(E.rod, { d: `M${f(p.x + 1)} 0H${f(p.x + 10.6)}` });
    const t = rr(p.x + 10, -3.6, 2.4, 7.2, 1.2);
    at(E.thumb, { d: t }); at(E.thumbO, { d: t });
  }
});

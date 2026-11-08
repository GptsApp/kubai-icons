import { defineIcon, KR, CR, f, OL, DEEP, DEEPS, rr, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'polaroid',
  zh: '拍立得',
  category: 'media',
  tags: ['instant camera', 'instant photo', 'print', 'snapshot', 'retro', '相片'],
  // An instant camera; on hover the developing print slides further out of its slot.
  svg: (u) => {
    const body = rr(4, 2.2, 23, 15.6, KR), print = rr(0, 0, 13, 10.4, CR);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
    <path d="${rr(6.6, 4.4, 4.4, 2.6, 1)}" fill="#fff" data-w="fill"/>
    <g filter="${u.hi}"><path d="${circ(15.5, 8.6, 4.4)}" fill="${u.upS}"/></g><path d="${circ(15.5, 8.6, 4.4)}" ${OL}/>
    <circle cx="15.5" cy="8.6" r="1.8" ${DEEP}/>
    <clipPath id="${u.id('out')}"><rect x="0" y="15" width="31" height="12"/></clipPath>
    <g clip-path="url(#${u.id('out')})"><g data-n="pr"><g filter="${u.hi}"><path d="${print}" fill="${u.upS}"/></g><path d="${print}" ${OL}/>
      <path d="${rr(1.8, 1.8, 9.4, 5.6, 0.8)}" fill="#fff"/></g></g>
    <path d="M8 15H23" fill="none" stroke-width="2" stroke-linecap="round" ${DEEPS}/>`;
  },
  target: (h) => ({ y: h ? 12.8 : 10.4 }),
  draw(p, E) { at(E.pr, { transform: `translate(9 ${f(p.y)})` }); }
});

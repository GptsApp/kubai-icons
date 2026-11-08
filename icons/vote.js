import { defineIcon, KR, CR, f, OL, DEEP, DEEPS, R, rp, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'vote',
  zh: '投票',
  category: 'communication',
  tags: ['ballot', 'ballot box', 'election', 'poll', 'survey', 'choose', '选举'],
  variants: ['check', 'clock', 'lock'],
  // A ballot box with a ticked ballot in its slot; on hover the ballot drops in.
  svg: (u) => {
    const box = rp(R(5.4, 11.4, 20.2, 11.4), [0, 0, KR, KR]);
    const lid = rr(3.8, 8.6, 23.4, 4.4, 1.6);
    const paper = rr(11, 0, 9, 11, CR);
    return `<g filter="${u.sh}"><path d="${box}" fill="${u.lo(11.4)}"/></g><path d="${box}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${lid}" fill="${u.upS}"/></g></g><path d="${lid}" ${OL}/>
      <path d="${rr(9.6, 9.9, 11.8, 1.8, 0.9)}" ${DEEP}/>
      <clipPath id="${u.id('slot')}"><rect x="0" y="-4" width="31" height="14.8"/></clipPath>
      <g clip-path="url(#${u.id('slot')})"><g data-n="p"><g filter="${u.hi}"><path d="${paper}" fill="${u.upS}"/></g><path d="${paper}" ${OL}/>
        <path d="M13.2 4.6L15 6.4L18.2 3" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/></g></g>`;
  },
  target: (h) => ({ y: h ? 4.2 : 0.8 }),
  draw(p, E) { at(E.p, { transform: `translate(0 ${f(p.y)})` }); }
});

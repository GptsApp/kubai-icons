import { defineIcon, KR, f, OL, DEEP, rr, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'gift',
  zh: '礼物',
  category: 'commerce',
  tags: ['present', 'box', 'birthday', 'reward'],
  variants: ['plus', 'check', 'heart', 'star', 'sparkle', 'clock'],
  // A gift box whose lid lifts off on hover.
  svg: (u) => {
    const box = rr(6.6, 11, 17.8, 11.8, KR), lid = rr(5.2, 7.2, 20.6, 4.6, 1.6);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${box}" fill="${u.loS}"/></g></g><path d="${box}" ${OL}/>
      <path d="${rr(14.2, 11, 2.6, 11.8, 0)}" fill="#fff"/>
      <g data-n="lid">
        <path d="${circ(12.8, 5.6, 2.4) + circ(18.2, 5.6, 2.4)}" fill="${u.loS}"/><path d="${circ(12.8, 5.6, 2.4) + circ(18.2, 5.6, 2.4)}" ${OL}/>
        <g filter="${u.sh}"><g filter="${u.hi}"><path d="${lid}" fill="${u.upS}"/></g></g><path d="${lid}" ${OL}/>
        <path d="${rr(14.2, 7.2, 2.6, 4.6, 0)}" ${DEEP}/>
      </g>`;
  },
  target: (h) => ({ lid: h ? [-0.6, -3, -8] : [0, 0, 0] }),
  draw(p, E) { at(E.lid, { transform: `translate(${f(p.lid[0])} ${f(p.lid[1])}) rotate(${f(p.lid[2])} 15.5 9.5)` }); }
});

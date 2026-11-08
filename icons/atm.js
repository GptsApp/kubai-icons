import { defineIcon, KR, CR, f, OL, DEEP, DEEPS, R, rp, rr, circ, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

export default defineIcon({
  name: 'atm',
  zh: '取款机',
  category: 'devices',
  tags: ['atm', 'cash machine', 'cash', 'withdraw', 'bank', 'money', '自动取款机', '提款机'],
  variants: ['check', 'x', 'lock', 'clock'],
  // A cash machine; on hover a banknote slides out of its cash slot.
  svg: (u) => {
    const note = rr(0, 0, 10, 6.6, 1);
    return `${back(u, rr(6.3, 1, 18.4, 23, KR))}
      ${front(u, rp(R(6.3, 1, 18.4, 4.6), [KR, KR, 0, 0]))}
      <path d="${rr(8.6, 7.8, 13.8, 7.2, CR)}" fill="#fff"/>
      <clipPath id="${u.id('out')}"><rect x="0" y="18.6" width="31" height="10"/></clipPath>
      <g clip-path="url(#${u.id('out')})"><g data-n="note">${front(u, note)}<path d="${circ(5, 3.3, 1.3)}" ${DEEP}/></g></g>
      <path d="M9.6 18.6H21.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`;
  },
  target: (h) => ({ y: h ? 18.4 : 11.6 }),
  draw(p, E) { at(E.note, { transform: `translate(10.5 ${f(p.y)})` }); }
});

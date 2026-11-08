import { defineIcon, f, OL, DEEP, DEEPS, circ, at } from '../packages/core/src/kit.js';

const RW = [8, 17], FW = [23, 17], CR0 = [15.2, 17];
const tyre = (c) => circ(c[0], c[1], 5.1) + circ(c[0], c[1], 2.8);

export default defineIcon({
  name: 'bicycle',
  zh: '自行车',
  category: 'transport',
  tags: ['bike', 'cycling', 'ride', 'cycle', 'bike sharing', '单车', '骑行'],
  variants: ['check', 'clock'],
  // A bicycle; on hover its pedals go round and it lifts its front wheel in a small wheelie,
  // then sets it down.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="b0" d="${tyre(RW) + tyre(FW)}" fill-rule="evenodd" fill="${u.loS}"/></g></g><path data-n="b1" d="${tyre(RW) + tyre(FW)}" fill-rule="evenodd" ${OL}/>
    <path data-n="b2" d="M8 17L12 9.4H20.4L23 17M12 9.4L15.2 17L20.4 9.4M8 17H15.2M12 9.4L11.2 7M9.6 6.6H13M20.4 9.4L19.6 6.4H22.4" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
    <g data-n="cr"><path d="M15.2 13.8V20.2" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/></g>
    <circle data-n="b3" cx="15.2" cy="17" r="1.6" ${DEEP}/>`,
  target: (h) => ({ a: h ? 180 : 0 }),
  draw(p, E) {
    // The whole bike tips back about the rear tyre's contact with the ground.
    const w = -9 * Math.sin(Math.PI * p.a / 180), t = Math.abs(w) < 1e-4 ? '' : `rotate(${f(w)} ${RW[0]} 22.1)`;
    for (let i = 0; i < 4; i++) t ? E['b' + i].setAttribute('transform', t) : E['b' + i].removeAttribute('transform');
    at(E.cr, { transform: `${t ? t + ' ' : ''}rotate(${f(p.a)} ${CR0[0]} ${CR0[1]})` });
  }
});

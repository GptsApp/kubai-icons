import { defineIcon, f, OL, DEEPS, rp, rr, circ, at } from '../packages/core/src/kit.js';

const tyre = (x) => circ(x, 17.4, 4.6) + circ(x, 17.4, 2.2);

export default defineIcon({
  name: 'motorcycle',
  zh: '摩托车',
  category: 'transport',
  tags: ['motorbike', 'bike', 'ride', 'scooter', 'delivery', '机车'],
  variants: ['check', 'clock'],
  // A motorcycle; on hover it pulls a wheelie, lifting its front wheel off the ground.
  svg: (u) => {
    const body = rp([[5.2, 11.6], [12, 10.2], [14.4, 7.4], [19.6, 7.4], [21.4, 10.6], [16, 14.8], [10.4, 14.8]], [1.2, 1, 1.4, 1.4, 1.2, 1.2, 1.2]);
    const engine = rr(11.4, 12.8, 5.8, 4.6, 1.2);
    return `<g data-n="m">
      <path d="M7.8 17.4L12.4 14.2M23.4 17.4L20.2 7.2M18.2 5.6H21.4" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${tyre(7.8) + tyre(23.4)}" fill-rule="evenodd" fill="${u.loS}"/></g></g><path d="${tyre(7.8) + tyre(23.4)}" fill-rule="evenodd" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <g filter="${u.hi}"><path d="${engine}" fill="${u.upS}"/></g><path d="${engine}" ${OL}/></g>`;
  },
  target: (h) => ({ a: h ? -12 : 0 }),
  draw(p, E) { at(E.m, { transform: `rotate(${f(p.a)} 7.8 22)` }); }
});

import { defineIcon, f, WHITE, DEEPS, rp, rr, clamp01, at } from '../packages/core/src/kit.js';
import { back, front, setD, drive } from './_b6-vehicles.js';

export default defineIcon({
  name: 'bulldozer',
  zh: '推土机',
  category: 'transport',
  tags: ['dozer', 'construction', 'earthmover', 'excavation', 'heavy machinery', '工程车'],
  // A tracked bulldozer; on hover its blade lifts and the machine pushes forward.
  svg: (u) => {
    const cab = rp([[6.6, 2.6], [15.4, 2.6], [17.8, 9.4], [6.6, 9.4]], [1.8, 1.6, 0, 0]);
    const body = rr(3.6, 9, 17.6, 7.6, 2.2);
    return `<g transform="translate(-0.4 0)"><g data-n="t">
      <path d="${rr(3.6, 16, 18.6, 7, 3.5)}" fill="${u.pure('#2F6FE0')}"/>
      ${[7.1, 12.9, 18.7].map((x) => `<circle cx="${x}" cy="19.5" r="1.5" ${WHITE}/>`).join('')}
      ${back(u, cab, u.loS)}
      <path d="${rp([[8.8, 4.8], [14, 4.8], [15.4, 9], [8.8, 9]], [1, 0.8, 0, 0])}" fill="#fff"/>
      ${back(u, body, u.upS)}
      <path data-n="arm" fill="none" stroke-width="2.4" stroke-linecap="round" ${DEEPS}/>
      ${front(u, '', u.upS, 'bl')}</g></g>`;
  },
  target: (h) => ({ y: h ? -3.6 : 0, o: h ? 1 : 0 }),
  draw(p, E) {
    const y = p.y;
    at(E.arm, { d: `M19.6 15.4L25 ${f(15.6 + y)}` });
    setD(E, 'bl', rp([[23.8, 9.6 + y], [27.6, 9.6 + y], [26.2, 16 + y], [28, 22.8 + y], [22.8, 22.8 + y]], [1, 1, 2, 0.8, 1]));
    at(E.t, { transform: drive(clamp01(p.o), 12, 23) });
  }
});

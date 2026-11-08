import { defineIcon, f, CR, DEEP, DEEPS, R, rp, rr, at } from '../packages/core/src/kit.js';
import { back, front, setD } from './_b6-vehicles.js';

export default defineIcon({
  name: 'gas-station',
  zh: '加油站',
  category: 'transport',
  tags: ['petrol station', 'filling station', 'service station', 'forecourt', 'refuel', '油站'],
  // A large fuel pump with its nozzle, standing under a forecourt canopy; on hover the nozzle
  // lifts on its hose and the meter runs up.
  svg: (u) => `<path data-n="h" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
    ${front(u, '', u.upS, 'n')}
    ${back(u, rr(5.8, 3, 11.8, 20.6, 1.8), u.loS)}
    <path d="${rr(8.1, 9.4, 7.2, 5.6, CR)}" fill="#fff"/>
    <path data-n="b" ${DEEP}/>
    ${front(u, rr(3.6, 1.6, 23.8, 4.4, 1.8), u.upS)}`,
  target: (h) => ({ w: h ? 4.6 : 2.6, ny: h ? -2.4 : 0 }),
  draw(p, E) {
    setD(E, 'n', rp(R(21.2, 11.6 + p.ny, 4.2, 5.8), [1.2, 1.2, 1, 1]));
    at(E.h, { d: `M17.4 20.6H20Q23.3 20.6 23.3 17.3V${f(17 + p.ny)}` });
    at(E.b, { d: rr(9.5, 11, p.w, 2.6, 1) });
  }
});

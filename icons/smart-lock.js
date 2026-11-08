import { defineIcon, CR, f, OL, DEEP, rr, circ, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';
import { span } from './_devices.js';

const PIV = [15.5, 17.6];
const LEVER = rr(4.6, PIV[1] - 1.6, 11.6, 3.2, 1.6);

export default defineIcon({
  name: 'smart-lock',
  zh: '智能门锁',
  category: 'home',
  tags: ['smart lock', 'door lock', 'keypad lock', 'keyless', 'smart home', '指纹锁', '电子锁'],
  variants: ['check', 'x', 'alert'],
  // A keypad door lock with its lever handle; on hover the handle is pressed down and the keys light.
  svg: (u) => `${back(u, rr(10.2, 1, 10.6, 23, 3))}
      <path d="${rr(12.2, 3.2, 6.6, 8.6, CR)}" fill="#fff"/>
      <path data-n="k" d="${circ(14, 5.6, 1.2) + circ(17, 5.6, 1.2) + circ(14, 9.2, 1.2) + circ(17, 9.2, 1.2)}" ${DEEP}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="l1"><path d="${LEVER}" fill="${u.loS}"/></g></g></g><g data-n="l2"><path d="${LEVER}" ${OL}/></g>
      ${front(u, circ(PIV[0], PIV[1], 2.8))}`,
  target: (h) => ({ a: h ? -28 : 0, o: h ? 1 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(p.a)} ${PIV[0]} ${PIV[1]})`;
    at(E.l1, { transform: t }); at(E.l2, { transform: t });
    at(E.k, { opacity: f(0.45 + 0.55 * span(p.o, 0.2, 0.7)) });
  }
});

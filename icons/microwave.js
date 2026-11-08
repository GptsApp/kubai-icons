import { defineIcon, KR, CR, f, DEEP, SOFT, R, rp, rr, circ, ellipse, at, clamp01 } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

const WIN = rr(6.6, 6.8, 12.4, 11.4, CR);

export default defineIcon({
  name: 'microwave',
  zh: '微波炉',
  category: 'home',
  tags: ['microwave oven', 'kitchen', 'heat', 'appliance', 'reheat', '加热'],
  variants: ['clock', 'check'],
  // A microwave oven; on hover its start knob is pressed, the display blinks and the turntable
  // carries the bowl once round.
  svg: (u) => `${back(u, rr(4, 4.4, 23, 16.2, KR))}
      ${front(u, rp(R(20.8, 4.4, 6.2, 16.2), [0, KR, KR, 0]))}
      <path data-n="pn" d="${rr(22.2, 7, 3.4, 2.4, 0.6) + circ(23.9, 14, 1.6)}" ${DEEP}/>
      <clipPath id="${u.id('w')}"><path d="${WIN}"/></clipPath>
      <path d="${WIN}" fill="#fff"/>
      <g clip-path="url(#${u.id('w')})"><path d="${ellipse(12.8, 15.6, 4.6, 1.2)}" ${SOFT}/><path data-n="bowl" ${DEEP}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // One turn of the turntable: the bowl swings right, passes behind (higher and smaller) and
    // comes back to the front.
    const o = clamp01(p.o), t = 2 * Math.PI * o, far = (1 - Math.cos(t)) / 2;
    const x = 12.8 + 3 * Math.sin(t), y = -1.2 * far, s = 1 - 0.14 * far, hw = 2.8 * s;
    at(E.bowl, { d: `M${f(x - hw)} ${f(11.8 + y)}H${f(x + hw)}Q${f(x + hw)} ${f(11.8 + y + 3 * s)} ${f(x)} ${f(11.8 + y + 3 * s)}Q${f(x - hw)} ${f(11.8 + y + 3 * s)} ${f(x - hw)} ${f(11.8 + y)}Z` });
    // The display goes dark twice while the knob is held in.
    const blink = (o > 0.18 && o < 0.34) || (o > 0.5 && o < 0.66);
    const knob = 1.6 - 0.5 * Math.sin(Math.PI * Math.min(1, o / 0.7));
    at(E.pn, { d: (blink ? '' : rr(22.2, 7, 3.4, 2.4, 0.6)) + circ(23.9, 14, knob) });
  }
});

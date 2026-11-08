import { defineIcon, f, DEEP, rp, circ, at, wave } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

const C = [15.5, 15], HOLES = [0, 1, 2, 3, 4, 5].map((i) => {
  const a = (-125 + i * 52) * Math.PI / 180;
  return circ(4.1 * Math.sin(a), -4.1 * Math.cos(a), 1.25);
}).join('');

export default defineIcon({
  name: 'rotary-phone',
  zh: '转盘电话',
  category: 'communication',
  tags: ['telephone', 'landline', 'dial', 'retro', 'vintage', 'call', '老式电话', '座机'],
  variants: ['x', 'clock'],
  // A desk telephone with its handset on top and a round finger dial; on hover the dial is
  // pulled round and runs back to its stop.
  svg: (u) => `${back(u, rp([[9.6, 6.8], [21.4, 6.8], [26.6, 23.2], [4.4, 23.2]], [2.4, 2.4, 2.8, 2.8]))}
      <path d="${circ(C[0], C[1], 6.2)}" fill="#fff"/>
      <g data-n="dial"><path d="${HOLES}" ${DEEP}/></g>
      <circle cx="${C[0]}" cy="${C[1]}" r="1.5" ${DEEP}/>
      ${front(u, rp([[3.6, 1.6], [27.4, 1.6], [27.4, 8.8], [22, 8.8], [21.2, 5.4], [9.8, 5.4], [9, 8.8], [3.6, 8.8]], [3, 3, 1.8, 1.8, 0.8, 0.8, 1.8, 1.8]))}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const a = 130 * wave(p.o, (t) => (t < 0.55 ? Math.sin((Math.PI / 2) * (t / 0.55)) : 1 - ((t - 0.55) / 0.45) ** 2));
    at(E.dial, { transform: `translate(${C[0]} ${C[1]}) rotate(${f(a)})` });
  }
});

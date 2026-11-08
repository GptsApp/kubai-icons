import { defineIcon, CR, f, DEEP, DEEPS, WHITE, rp, rr, circ, at, wave } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

const KEYS = [9.8, 13.6, 17.4, 21.2].map((x) => circ(x, 14.2, 1.3)).join('')
  + [7.9, 11.7, 15.5, 19.3, 23.1].map((x) => circ(x, 18.8, 1.3)).join('');

// Three key strikes, each a quick step followed by a pause.
const strikes = (t) => { const k = Math.min(3, Math.floor(t * 3)); return k === 3 ? 1 : (k + Math.min(1, (t * 3 - k) / 0.4)) / 3; };

export default defineIcon({
  name: 'typewriter',
  zh: '打字机',
  category: 'devices',
  tags: ['type', 'writer', 'keys', 'carriage', 'retro', 'draft', '老式打字'],
  // A typewriter with a sheet in its roller and two rows of round keys; on hover the carriage
  // steps left three strikes as the line of type grows.
  svg: (u) => `${back(u, rp([[6.6, 9.8], [24.4, 9.8], [27, 22.8], [4, 22.8]], [1.8, 1.8, 2.6, 2.6]))}
      <path d="${KEYS}" ${WHITE}/>
      <g data-n="car">${front(u, rr(10, 1.4, 11, 9, CR))}
        <path data-n="ink" class="ln" ${DEEPS}/>
        <path d="${rr(3.6, 6.4, 3, 5.4, 1.2) + rr(24.4, 6.4, 3, 5.4, 1.2)}" ${DEEP}/>
        ${front(u, rr(5.6, 7.2, 19.8, 3.8, 1.9))}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const s = wave(p.o, strikes);
    at(E.car, { transform: `translate(${f(-2.7 * s)} 0)` });
    at(E.ink, { d: `M12.4 4.4H${f(16 + 2.7 * s)}` });
  }
});

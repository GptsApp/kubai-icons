import { defineIcon, KR, f, DEEPS, WHITE, WHITES, rp, rr, circ, at, wave } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';

const TOP = 3.3, H = 11, MID = TOP + H / 2;

export default defineIcon({
  name: 'crt-monitor',
  zh: 'CRT 显示器',
  category: 'devices',
  tags: ['tube monitor', 'old computer', 'cathode ray', 'retro', 'terminal', 'vintage display', '老式显示器', '显像管'],
  variants: ['check', 'x', 'alert'],
  off: true,
  // A deep tube monitor with a rounded screen, a chin of dials and a swivel foot; on hover the
  // picture collapses to a bright line and opens out again, as a tube does when switched.
  svg: (u) => `${back(u, rp([[11.4, 17], [19.6, 17], [22.2, 22.8], [8.8, 22.8]], [0.5, 0.5, 1.4, 1.4]))}
      ${back(u, rr(4.6, 1.3, 21.8, 18.2, KR))}
      <path data-n="sc" fill="#fff"/>
      <path data-n="cu" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      <path d="M8 16.9H13.4" class="ln" ${WHITES}/>
      <path d="${circ(19.2, 16.9, 1.3) + circ(23, 16.9, 1.3)}" ${WHITE}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const k = wave(p.o, (t) => Math.sin(Math.PI * t) ** 2), h = H * (1 - 0.84 * k);
    at(E.sc, { d: rr(6.8, MID - h / 2, 17.4, h, Math.min(3.2, h / 2)) });
    const s = 1 - k, x = 11;
    at(E.cu, { d: `M${x} ${f(MID - 3 * s)}L${f(x + 3.2)} ${f(MID)}L${x} ${f(MID + 3 * s)}M${f(x + 5.4)} ${f(MID + 3 * s)}H${f(x + 9.4)}`, opacity: f(1 - k) });
  }
});

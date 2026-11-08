import { defineIcon, CR, KR, f, DEEP, DEEPS, R, rp, rr, circ, at, clamp01, rattle } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

export default defineIcon({
  name: 'arcade-machine',
  zh: '街机',
  category: 'devices',
  tags: ['arcade', 'cabinet', 'coin-op', 'retro game', 'video game', 'joystick', '游戏机', '投币'],
  variants: ['star'],
  // An arcade cabinet with a marquee, a screen and a control deck; on hover the joystick is
  // pushed from side to side and the block on the screen follows it.
  svg: (u) => `${back(u, rp(R(8.1, 3, 14.8, 21), [0, 0, KR, KR]))}
      <path d="${rr(10.1, 7, 10.8, 6.6, CR)}" fill="#fff"/>
      <path data-n="sp" ${DEEP}/>
      ${front(u, rr(6.3, 1, 18.4, 4.6, 1.8))}
      ${front(u, rr(6.3, 16, 18.4, 5, 1.6))}
      <path d="${circ(18.9, 18.5, 1.3) + circ(22.5, 18.5, 1.3)}" ${DEEP}/>
      <g data-n="st"><path d="M0 0V-2.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/><circle cx="0" cy="-3.2" r="2" ${DEEP}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), a = rattle(o, 34, 2);
    at(E.st, { transform: `translate(11.2 19) rotate(${f(a)})` });
    at(E.sp, { d: rr(14.2 + a * 0.16, 9, 2.6, 2.6, 0.5) });
  }
});

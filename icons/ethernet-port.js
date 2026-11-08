import { defineIcon, KR, f, WHITE, rp, rr, circ, at, wave } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';
import { span } from './_devices.js';

const HOLE = rp([[8.6, 5.6], [22.4, 5.6], [22.4, 15.2], [19.4, 15.2], [19.4, 18.4], [11.6, 18.4], [11.6, 15.2], [8.6, 15.2]],
  [1.2, 1.2, 1.2, 0.6, 1.2, 1.2, 0.6, 1.2]);

export default defineIcon({
  name: 'ethernet-port',
  zh: '网口',
  category: 'devices',
  tags: ['ethernet', 'lan', 'rj45', 'network port', 'wired', '网线接口', '以太网'],
  variants: ['check', 'x', 'alert'],
  // A network port with two link lights; on hover both lights flare as data starts and the
  // activity light blinks on beside the link light.
  svg: (u) => `${back(u, rr(5.2, 2.2, 20.6, 20.6, KR))}
      <path d="${HOLE}" fill="#fff"/>
      <path data-n="lk" d="${circ(8.4, 19.6, 1.3)}" ${WHITE}/>
      <path data-n="act" d="${circ(22.6, 19.6, 1.3)}" ${WHITE}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = p.o;
    at(E.lk, { d: circ(8.4, 19.6, 1.3 + 1 * Math.sin(Math.PI * span(o, 0, 0.55))) });
    at(E.act, { d: circ(22.6, 19.6, 1.3 + 1 * Math.sin(Math.PI * span(o, 0, 0.55))),
      opacity: f(0.35 + 0.65 * wave(o, (t) => Math.abs(Math.sin(2.5 * Math.PI * t)))) });
  }
});

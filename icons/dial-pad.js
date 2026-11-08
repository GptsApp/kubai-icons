import { defineIcon, KR, f, DEEP, WHITE, rr, circ, at, wave } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';
import { span } from './_devices.js';

const XS = [10.1, 15.5, 20.9], YS = [4.65, 9.95, 15.25, 20.55];
const KEYS = YS.flatMap((y) => XS.map((x) => [x, y]));
// The order the keys are pressed on hover.
const SEQ = [0, 4, 8, 10];

export default defineIcon({
  name: 'dial-pad',
  zh: '拨号键盘',
  category: 'communication',
  tags: ['keypad', 'phone keypad', 'numbers', 'dial', 'call', 'touch tone', '拨号盘', '数字键'],
  variants: ['x'],
  // A telephone keypad of twelve round keys; on hover four keys are pressed in turn.
  svg: (u) => `${back(u, rr(6.3, 1, 18.4, 23, KR))}
      <path d="${KEYS.map(([x, y]) => circ(x, y, 1.9)).join('')}" ${WHITE}/>
      ${SEQ.map((k, i) => `<circle data-n="k${i}" cx="${KEYS[k][0]}" cy="${KEYS[k][1]}" r="1.9" ${DEEP}/>`).join('')}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    SEQ.forEach((_, i) => {
      const a = 0.04 + i * 0.22;
      const v = wave(p.o, (t) => Math.sin(Math.PI * span(t, a, a + 0.3)));
      at(E['k' + i], { opacity: f(v), r: f(1.9 + 0.5 * v) });
    });
  }
});

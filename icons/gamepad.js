import { defineIcon, f, OL, rp, rr, circ, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { circCW } from './_devices.js';

// A plus-shaped D-pad centred on (cx, cy): arms a wide, reaching r from the centre.
const dpad = (cx, cy, a, r) => {
  const h = a / 2;
  return rp([[cx - h, cy - r], [cx + h, cy - r], [cx + h, cy - h], [cx + r, cy - h], [cx + r, cy + h], [cx + h, cy + h],
    [cx + h, cy + r], [cx - h, cy + r], [cx - h, cy + h], [cx - r, cy + h], [cx - r, cy - h], [cx - h, cy - h]],
  [0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, 0.5, 0]);
};

export default defineIcon({
  name: 'gamepad',
  zh: '游戏手柄',
  category: 'devices',
  tags: ['game', 'controller', 'joypad', 'play', 'console', '游戏'],
  variants: ['plus', 'check', 'star', 'heart'],
  // A game controller with a D-pad and two buttons; on hover it rumbles and a button is pressed.
  svg: (u) => {
    const body = rr(3.8, 6.4, 23.4, 10.6, 5.3) + circCW(9.2, 16.2, 4.8) + circCW(21.8, 16.2, 4.8);
    return `<g data-n="pad"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <path d="${dpad(9.8, 11.8, 2.6, 3.6) + circ(20.4, 13.4, 1.5) + circ(23.4, 10.4, 1.5)}" fill="#fff"/>
      <circle data-n="btn" cx="23.4" cy="10.4" fill="${u.pure('#4389FF')}"/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.pad, { transform: `rotate(${f(rattle(o, 5, 4))} 15.5 14)` });
    at(E.btn, { r: f(1.3 * clamp01(o * 2 - 0.6)), opacity: f(clamp01(o * 3)) });
  }
});

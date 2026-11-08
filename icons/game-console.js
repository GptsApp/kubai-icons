import { defineIcon, KR, CR, f, DEEP, rp, rr, circ, at, clamp01 } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';

// A plus-shaped D-pad centred on (cx, cy): arms a wide, reaching r from the centre.
const dpad = (cx, cy, a, r) => {
  const h = a / 2;
  return rp([[cx - h, cy - r], [cx + h, cy - r], [cx + h, cy - h], [cx + r, cy - h], [cx + r, cy + h], [cx + h, cy + h],
    [cx + h, cy + r], [cx - h, cy + r], [cx - h, cy + h], [cx - r, cy + h], [cx - r, cy - h], [cx - h, cy - h]],
  [0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, 0.5, 0]);
};
const SCREEN = rr(9.6, 3.2, 11.8, 9, CR);

export default defineIcon({
  name: 'game-console',
  zh: '游戏机',
  category: 'devices',
  tags: ['handheld', 'game console', 'portable game', 'gaming', 'play', '掌机'],
  variants: ['plus', 'check', 'star', 'down'],
  // A handheld game console; on hover its D-pad is pushed right, the jump button is held and the
  // character on the screen leaps across.
  svg: (u) => `${back(u, rr(7.4, 1, 16.2, 23, KR))}
      <clipPath id="${u.id('sc')}"><path d="${SCREEN}"/></clipPath>
      <path d="${SCREEN}" fill="#fff"/>
      <g clip-path="url(#${u.id('sc')})"><path d="M9.6 10.6H21.4" class="ln" data-t="stroke:#D3E2FC"/><path data-n="hero" ${DEEP}/></g>
      <path data-n="pad" d="${dpad(11.6, 17.8, 2.4, 3.4) + circ(19.8, 16.4, 1.4) + circ(17.6, 19.4, 1.4)}" fill="#fff"/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The jump button is held down while the character arcs over and stretches in the air.
    const o = clamp01(p.o), push = Math.sin(Math.PI * Math.min(1, o / 0.75));
    const air = Math.sin(Math.PI * o), x = 11.6 + 6.4 * o, y = 6.6 - 2.6 * air;
    const w = 2.8 - 0.4 * air, h = 3 + 0.4 * air;
    at(E.hero, { d: rr(x + (2.8 - w) / 2, y + 3 - h, w, h, 0.7) });
    // The D-pad rocks toward the right while the character runs that way.
    const run = Math.sin(Math.PI * o) * 0.9;
    at(E.pad, { d: dpad(11.6 + run, 17.8, 2.4, 3.4) + circ(19.8, 16.4, 1.4 - 0.55 * push) + circ(17.6, 19.4, 1.4) });
  }
});

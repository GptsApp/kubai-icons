import { defineIcon, KR, f, OL, R, rp, rr, circ, at, clamp01 } from '../packages/core/src/kit.js';
import { back } from './_commerce-charts.js';

export default defineIcon({
  name: 'safe',
  zh: '保险箱',
  category: 'commerce',
  tags: ['vault', 'deposit', 'secure', 'savings', 'strongbox', '金库'],
  variants: ['check', 'lock', 'plus', 'x'],
  // A safe on two feet; on hover its dial turns, then the door swings open on its hinge.
  svg: (u) => {
    const door = rr(8.2, 5.2, 14.6, 12.6, 1.8);
    return `${back(u, rr(7.6, 18, 3.4, 4.8, 1) + rr(20, 18, 3.4, 4.8, 1), u.loS)}
      ${back(u, rr(5.2, 2.2, 20.6, 18.6, KR), u.loS)}
      <path d="${door}" fill="${u.pure('#2F6FE0')}"/>
      <g data-n="door"><g filter="${u.hi}"><path d="${door}" fill="${u.upS}"/></g><path d="${door}" ${OL}/>
        <path d="M19.6 9.4V13.6" class="ln" data-t="stroke:#2F6FE0" stroke-linecap="round"/>
        <g data-n="dial"><path d="${circ(14.2, 11.5, 3.4)}" fill="#fff"/><path d="M14.2 11.5V9.1" class="ln" data-t="stroke:#2F6FE0" stroke-linecap="round"/></g></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), turn = clamp01(o / 0.55), open = clamp01((o - 0.45) / 0.55);
    at(E.dial, { transform: `rotate(${f(180 * turn)} 14.2 11.5)` });
    at(E.door, { transform: `translate(8.2 0) scale(${f(Math.max(0.001, 1 - 0.62 * open))} 1) translate(-8.2 0)` });
  }
});

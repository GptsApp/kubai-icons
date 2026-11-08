import { defineIcon, KR, f, OL, DEEPS, WHITE, rr, circ, at } from '../packages/core/src/kit.js';
import { solid } from './_devices.js';

export default defineIcon({
  name: 'joystick',
  zh: '摇杆',
  category: 'devices',
  tags: ['arcade', 'game', 'stick', 'controller', 'retro', '街机'],
  variants: ['plus', 'check', 'star'],
  // An arcade joystick on its base; on hover the stick tilts over.
  svg: (u) => {
    const boot = 'M11.8 15.6A3.7 2.8 0 0 1 19.2 15.6Z';
    return `${solid(u, rr(3.6, 14.6, 23.8, 8.4, KR), u.loS)}
      <path d="${circ(7.8, 18.8, 1.5) + circ(23.2, 18.8, 1.5)}" ${WHITE}/>
      <g data-n="st"><path d="M15.5 15V7" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
        ${solid(u, circ(15.5, 5.2, 3.4), u.upS)}</g>
      ${solid(u, boot, u.upS, { sh: false })}`;
  },
  target: (h) => ({ a: h ? -24 : 0 }),
  draw(p, E) { at(E.st, { transform: `rotate(${f(p.a)} 15.5 15.4)` }); }
});

import { defineIcon, f, OL, DEEP, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'bell',
  zh: '通知',
  category: 'communication',
  tags: ['notification', 'alert', 'alarm', 'ring', 'reminder'],
  variants: ['plus', 'minus', 'check', 'x', 'alert', 'clock', 'cog', 'sparkle'],
  off: true,
  // A bell that swings from its knob; the clapper lags behind.
  svg: (u) => {
    const bell = 'M7.8 18.4C9 17 9.3 15 9.3 12C9.3 8 12 5.2 15.5 5.2C19 5.2 21.7 8 21.7 12C21.7 15 22 17 23.2 18.4Z';
    const rim = rr(5.6, 17.4, 19.8, 3.8, 1.9);
    return `<g data-n="bell">
      <circle cx="15.5" cy="4.4" r="1.8" ${DEEP}/>
      <circle data-n="clap" cx="15.5" cy="21.4" r="2.3" ${DEEP}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${bell}" fill="${u.loS}"/></g></g><path d="${bell}" ${OL}/>
      <g filter="${u.hi}"><path d="${rim}" fill="${u.upS}"/></g><path d="${rim}" ${OL}/>
    </g>`;
  },
  target: (h) => ({ swing: h ? 14 : 0, clap: h ? -1.6 : 0 }),
  draw(p, E) {
    at(E.bell, { transform: `rotate(${f(p.swing)} 15.5 4.4)` });
    at(E.clap, { cx: f(15.5 + p.clap) });
  }
});

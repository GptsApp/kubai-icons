import { defineIcon, f, OL, WHITES, lines, at } from '../packages/core/src/kit.js';

// The ticket and its stub meet at the perforation x=21.2; each has a notch on its outer side.
const MAIN = 'M6 4.8H21.2V20.2H6Q3.8 20.2 3.8 18V14.7A2.2 2.2 0 0 0 3.8 10.3V7Q3.8 4.8 6 4.8Z';
const STUB = 'M21.2 4.8H25Q27.2 4.8 27.2 7V10.3A2.2 2.2 0 0 0 27.2 14.7V18Q27.2 20.2 25 20.2H21.2Z';

export default defineIcon({
  name: 'ticket',
  zh: '票',
  category: 'travel',
  tags: ['admission', 'event', 'pass', 'coupon', 'booking', '门票', '车票'],
  variants: ['plus', 'check', 'x', 'clock', 'star', 'heart'],
  // A ticket with its stub; on hover the stub starts to tear away at the perforation.
  svg: (u) => `<g data-n="m"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${MAIN}" fill="${u.loS}"/></g></g><path d="${MAIN}" ${OL}/>
      <path d="${lines(8.2, 11, [8.6, 5.4])}" class="ln" ${WHITES}/></g>
    <g data-n="s"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${STUB}" fill="${u.upS}"/></g></g><path d="${STUB}" ${OL}/></g>`,
  target: (h) => ({ m: h ? -0.8 : 0, s: h ? [0.6, 9] : [0, 0] }),
  draw(p, E) {
    at(E.m, { transform: `translate(${f(p.m)} 0)` });
    at(E.s, { transform: `translate(${f(p.s[0])} 0) rotate(${f(p.s[1])} 21.2 20.2)` });
  }
});

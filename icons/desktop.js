import { defineIcon, KR, CR, f, OL, ACC, WHITE, WHITES, R, rp, rr, circ, at } from '../packages/core/src/kit.js';
import { solid, span } from './_devices.js';

export default defineIcon({
  name: 'desktop',
  zh: '台式电脑',
  category: 'devices',
  tags: ['computer', 'pc', 'tower', 'workstation', '主机'],
  variants: ['plus', 'check', 'x', 'alert', 'lock', 'search', 'sync', 'cog', 'down', 'sparkle'],
  badgeAt: [22.6, 19.6],
  // A monitor beside a tower; on hover the tower's power light flares on and two lines of
  // content type out on the screen.
  svg: (u) => `${solid(u, rp(R(10.4, 15, 3.6, 6), 0), u.loS, { sh: false, hi: false })}
      ${solid(u, rr(6.6, 19.6, 10.4, 2.4, 1.2), u.upS)}
      ${solid(u, rr(4, 3.6, 15.4, 12.4, KR), u.loS)}
      <path d="${rr(6, 5.6, 11.4, 8.4, CR)}" fill="#fff"/>
      <path data-n="ln" ${ACC}/>
      ${solid(u, rr(21, 3.6, 6, 18.4, 1.8), u.loS)}
      <path d="M22.8 7.4H25.2" class="ln" ${WHITES}/>
      <circle data-n="led" cx="24" cy="11.4" r="1.3" ${WHITE}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.led, { r: f(1.3 + 0.35 * span(p.o, 0, 0.3) + 0.4 * Math.sin(Math.PI * span(p.o, 0, 0.6))), opacity: f(0.45 + 0.55 * span(p.o, 0, 0.4)) });
    // The second line starts once the first has run on.
    const l2 = span(p.o, 0.35, 0.85);
    at(E.ln, { d: `M8.2 8.6H${f(8.2 + 2.6 + 4.8 * span(p.o, 0.1, 0.55))}` + (l2 > 0 ? `M8.2 11.4H${f(8.2 + 7 * l2)}` : '') });
  }
});

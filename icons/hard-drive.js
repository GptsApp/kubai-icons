import { defineIcon, KR, f, OL, DEEP, DEEPS, R, rp, rr, circ, at, rattle, wave } from '../packages/core/src/kit.js';

// The case and its front panel, shifted right by x.
const body = (x) => rr(4 + x, 3.8, 23, 17.4, KR);
const panel = (x) => rp(R(4 + x, 12.6, 23, 8.6), [1.8, 1.8, KR, KR]);

export default defineIcon({
  name: 'hard-drive',
  zh: '硬盘',
  category: 'devices',
  tags: ['disk', 'storage', 'hdd', 'ssd', 'drive', '存储'],
  variants: ['plus', 'minus', 'check', 'x', 'alert', 'up', 'down', 'sync', 'lock', 'search', 'clock', 'cog'],
  // A drive with a front panel; on hover it hums with a short shudder as it spins up, its activity
  // light blinks on and the meter fills.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="bd" d="${body(0)}" fill="${u.loS}"/></g></g><path data-n="bdO" d="${body(0)}" ${OL}/>
      <g filter="${u.hi}"><path data-n="pn" d="${panel(0)}" fill="${u.upS}"/></g><path data-n="pnO" d="${panel(0)}" ${OL}/>
      <path data-n="bar" class="ln" ${DEEPS}/>
      <circle data-n="sk" cx="8.4" cy="16.9" r="1.4" data-t="fill:#89B5FF"/><circle data-n="led" cx="8.4" cy="16.9" r="1.4" ${DEEP}/>`,
  target: (h) => ({ w: h ? 10.6 : 4.4, l: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.l)), x = rattle(o, 0.7, 4);
    const b = body(x), q = panel(x);
    at(E.bd, { d: b }); at(E.bdO, { d: b }); at(E.pn, { d: q }); at(E.pnO, { d: q });
    at(E.bar, { d: `M${f(12 + x)} 16.9H${f(12 + x + p.w)}` });
    at(E.sk, { cx: f(8.4 + x) });
    at(E.led, { cx: f(8.4 + x), opacity: f(wave(o, (t) => Math.abs(Math.sin(2.5 * Math.PI * t)))) });
  }
});

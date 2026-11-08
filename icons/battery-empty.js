import { defineIcon, f, DEEP, at, clamp01, wave } from '../packages/core/src/kit.js';
import { battery, level } from './_w2-devices.js';

export default defineIcon({
  name: 'battery-empty',
  zh: '电量耗尽',
  category: 'devices',
  tags: ['battery', 'empty', 'dead', 'no power', 'drained', '没电'],
  variants: ['alert', 'bolt', 'x'],
  // A flat battery; on hover a last bit of charge flickers up in its window, drains away and goes out.
  svg: (u) => `${battery(u)}<path data-n="lvl" d="${level(2.4)}" ${DEEP}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.lvl, { d: level(2.4 + 6 * Math.sin(Math.PI * Math.min(1, o * 2))), opacity: f(wave(o, (t) => Math.sin(3 * Math.PI * t) ** 2 * (1 - t * 0.6))) });
  }
});

import { defineIcon, KR, f, WHITE, rr, circ, at } from '../packages/core/src/kit.js';
import { back, bolt } from './_w2-devices.js';
import { span } from './_devices.js';

export default defineIcon({
  name: 'power-bank',
  zh: '充电宝',
  category: 'devices',
  tags: ['portable charger', 'battery pack', 'power', 'charge', '移动电源'],
  variants: ['check', 'alert', 'clock'],
  // A power bank with four charge lights; on hover the bolt pulses with charge and the lights
  // pop on one after another.
  svg: (u) => `${back(u, rr(8.6, 1.4, 13.8, 22.2, KR))}
      <path data-n="bt" d="${bolt(12.3, 5.4, 1.4)}" ${WHITE}/>
      ${[11, 14, 17, 20].map((x, i) => `<path data-n="d${i}" d="${circ(x, 19.4, 1.2)}" ${WHITE}/>`).join('')}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // The bolt grows about its own centre and settles back.
    const s = 1.4 + 0.6 * Math.sin(Math.PI * span(p.o, 0, 0.9));
    at(E.bt, { d: bolt(12.3 - 2.7 * (s - 1.4), 5.4 - 3.4 * (s - 1.4), s) });
    [0, 1, 2, 3].forEach((i) => {
      const pop = Math.sin(Math.PI * span(p.o, i * 0.15, i * 0.15 + 0.4));
      at(E['d' + i], { d: circ(11 + 3 * i, 19.4, 1.2 + 0.25 * pop),
        opacity: f(i < 2 ? 1 : 0.35 + 0.65 * span(p.o, 0.15 + (i - 2) * 0.2, 0.4 + (i - 2) * 0.2)) });
    });
  }
});

import { defineIcon, f, DEEPS, at } from '../packages/core/src/kit.js';
import { sky } from './_weather-nature.js';

export default defineIcon({
  name: 'cloud-fog',
  zh: '雾',
  category: 'weather',
  tags: ['fog', 'mist', 'haze', 'foggy', 'weather', '雾霾'],
  // Two bands of fog under a cloud; on hover they drift well apart sideways.
  svg: (u) => sky(u, `<path data-n="f1" fill="none" stroke-width="2.8" stroke-linecap="round" ${DEEPS}/>
    <path data-n="f2" fill="none" stroke-width="2.8" stroke-linecap="round" ${DEEPS}/>`),
  target: (h) => ({ s: h ? 3.6 : 0 }),
  draw(p, E) {
    at(E.f1, { d: `M${f(5.4 - p.s)} 20.8H${f(19.4 - p.s)}` });
    at(E.f2, { d: `M${f(11.6 + p.s)} 24.8H${f(25.6 + p.s)}` });
  }
});

import { defineIcon, f, OL, cloud, at } from '../packages/core/src/kit.js';
import { crescent } from './_weather-nature.js';

const MOON = crescent([10.4, 10, 6.6], [14.6, 6.2, 5.6]);
const CL = cloud([12.6, 16.6, 4.4], [18.2, 12.6, 5.8], [23, 17, 4]);

export default defineIcon({
  name: 'cloud-moon',
  zh: '夜间多云',
  category: 'weather',
  tags: ['night', 'cloudy night', 'partly cloudy', 'moon', 'cloud', 'weather'],
  // A crescent moon behind a cloud comes out on hover as the cloud drifts aside.
  svg: (u) => `<g data-n="moon"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${MOON}" fill="${u.loS}"/></g></g><path d="${MOON}" stroke-linejoin="round" ${OL}/></g>
    <g data-n="cl"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${CL}" fill="${u.upS}"/></g></g><path d="${CL}" ${OL}/></g>`,
  target: (h) => ({ moon: h ? [-1, -1.6] : [0, 0], cl: h ? 1.2 : 0 }),
  draw(p, E) {
    at(E.moon, { transform: `translate(${f(p.moon[0])} ${f(p.moon[1])})` });
    at(E.cl, { transform: `translate(${f(p.cl)} 0)` });
  }
});

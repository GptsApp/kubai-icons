import { defineIcon, f, OL, circ, cloud, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'cloud-sun',
  zh: '天气',
  category: 'weather',
  tags: ['weather', 'partly cloudy', 'sun', 'cloud'],
  variants: ['alert'],
  // The sun behind a cloud comes out on hover.
  svg: (u) => `<g data-n="sun"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(10.6, 10, 6)}" fill="${u.loS}"/></g></g><path d="${circ(10.6, 10, 6)}" ${OL}/></g>
    <g data-n="cl"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${cloud([12.6, 16.6, 4.4], [18.2, 12.6, 5.8], [23, 17, 4])}" fill="${u.upS}"/></g></g>
      <path d="${cloud([12.6, 16.6, 4.4], [18.2, 12.6, 5.8], [23, 17, 4])}" ${OL}/></g>`,
  target: (h) => ({ sun: h ? [-1, -1.6] : [0, 0], cl: h ? 1.2 : 0 }),
  draw(p, E) {
    at(E.sun, { transform: `translate(${f(p.sun[0])} ${f(p.sun[1])})` });
    at(E.cl, { transform: `translate(${f(p.cl)} 0)` });
  }
});

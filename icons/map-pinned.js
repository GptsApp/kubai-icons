import { defineIcon, f, OL, R, rp, at } from '../packages/core/src/kit.js';
import { mapFolds, pinPath } from './_travel-transport.js';

const RAD = [1.6, 0.6, 0.6, 1.6, 1.6, 0.6, 0.6, 1.6];

export default defineIcon({
  name: 'map-pinned',
  zh: '地图标记',
  category: 'travel',
  tags: ['map', 'pin', 'location', 'place', 'destination', '目的地'],
  variants: ['plus', 'check', 'x', 'search', 'star'],
  // A folded map with a pin standing on it; on hover the pin hops up off the map.
  svg: (u) => {
    const { x, pts } = mapFolds(11.5, 1.8, 11.4, 23.4);
    const map = rp(pts, RAD), pin = pinPath(15.5, 6.6, 5.2);
    return `<clipPath id="${u.id('mp')}"><path d="${map}"/></clipPath>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${map}" fill="${u.loS}"/></g></g>
      <g clip-path="url(#${u.id('mp')})"><g filter="${u.hi}"><path d="${rp(R(x[1], 9, x[2] - x[1], 16), 0)}" fill="${u.upS}"/></g></g>
      <path d="${map}" ${OL}/>
      <path data-n="shade" d="M12.9 16.4A2.6 1.1 0 1 0 18.1 16.4A2.6 1.1 0 1 0 12.9 16.4Z" data-t="fill:#89B5FF"/>
      <g data-n="pin"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${pin}" fill="${u.loS}"/></g></g><path d="${pin}" ${OL}/>
        <circle cx="15.5" cy="6.6" r="2.2" fill="#fff"/></g>`;
  },
  target: (h) => ({ lift: h ? -2.4 : 0, sh: h ? 0.55 : 1 }),
  draw(p, E) {
    at(E.pin, { transform: `translate(0 ${f(p.lift)})` });
    at(E.shade, { transform: `translate(15.5 16.4) scale(${f(p.sh)} 1) translate(-15.5 -16.4)` });
  }
});

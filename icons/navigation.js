import { defineIcon, f, OL, rp, at } from '../packages/core/src/kit.js';

// A navigation arrow drawn pointing up, then turned 45° to point north-east.
const TIP = [0, -11.2], RT = [8.4, 9.8], NOTCH = [0, 4.8], LT = [-8.4, 9.8];
const KITE = rp([TIP, RT, NOTCH, LT], [1.2, 1.4, 0.8, 1.4]);

export default defineIcon({
  name: 'navigation',
  zh: '导航',
  category: 'travel',
  tags: ['direction', 'gps', 'location arrow', 'heading', 'route', '定位箭头'],
  off: true,
  // A navigation arrow heading north-east; on hover it glides a little forward.
  svg: (u) => `<clipPath id="${u.id('nv')}"><path d="${KITE}"/></clipPath>
    <g data-n="a"><g transform="rotate(45)">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${KITE}" fill="${u.loS}"/></g></g>
      <g clip-path="url(#${u.id('nv')})"><g filter="${u.hi}"><path d="M0 -14L12 12L0 ${NOTCH[1]}Z" fill="${u.upS}"/></g></g>
      <path d="${KITE}" ${OL}/></g></g>`,
  target: (h) => ({ d: h ? 1.4 : 0 }),
  draw(p, E) {
    // The rotated arrow's bounding box is centred on the canvas at rest.
    at(E.a, { transform: `translate(${f(17.3 + p.d)} ${f(10.7 - p.d)})` });
  }
});

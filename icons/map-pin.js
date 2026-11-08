import { defineIcon, f, OL, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'map-pin',
  zh: '定位',
  category: 'travel',
  tags: ['location', 'place', 'marker', 'gps', 'address'],
  variants: ['plus', 'minus', 'check', 'x', 'heart', 'star', 'search', 'lock'],
  off: true,
  // A map pin that hops up on hover while its shadow on the ground shrinks.
  svg: (u) => {
    const pin = 'M15.5 22.4C12.2 18.8 7.6 14.8 7.6 9.6A7.9 7.9 0 0 1 23.4 9.6C23.4 14.8 18.8 18.8 15.5 22.4Z';
    return `<path data-n="shade" d="M11.5 23.6A4 1.1 0 1 0 19.5 23.6A4 1.1 0 1 0 11.5 23.6Z" data-t="fill:#B2CEFF"/>
      <g data-n="pin"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${pin}" fill="${u.loS}"/></g></g><path d="${pin}" ${OL}/>
        <circle cx="15.5" cy="9.6" r="3.2" fill="#fff"/></g>`;
  },
  target: (h) => ({ lift: h ? -2.4 : 0, sh: h ? 0.6 : 1 }),
  draw(p, E) {
    at(E.pin, { transform: `translate(0 ${f(p.lift)})` });
    at(E.shade, { transform: `translate(15.5 23.6) scale(${f(p.sh)} 1) translate(-15.5 -23.6)` });
  }
});

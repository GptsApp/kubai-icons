import { defineIcon, f, OL, DEEPS, WHITE, R, rp, circ, clamp01, at, wave } from '../packages/core/src/kit.js';

const HEAD = 'M15.5 1.6C21.4 1.6 25.4 5.8 25.4 11.2C25.4 14.4 24 16.6 21.8 17.6V19.4H9.2V17.6C7 16.6 5.6 14.4 5.6 11.2C5.6 5.8 9.6 1.6 15.5 1.6Z';
const JAW = rp(R(9.6, 17.2, 11.8, 6.2), [0.8, 0.8, 2.6, 2.6]);

export default defineIcon({
  name: 'skull',
  zh: '骷髅',
  category: 'people',
  tags: ['skull', 'death', 'danger', 'poison', 'halloween', 'pirate', '危险'],
  // A skull with a lighter jaw; on hover the jaw chatters and comes to rest.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${HEAD}" fill="${u.loS}"/></g></g><path d="${HEAD}" ${OL}/>
    <g ${WHITE}><path d="${circ(11.6, 10.8, 2.7) + circ(19.4, 10.8, 2.7)}"/><path d="${rp([[15.5, 13.2], [17.1, 16.2], [13.9, 16.2]], 0.5)}"/></g>
    <g data-n="j"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${JAW}" fill="${u.upS}"/></g></g><path d="${JAW}" ${OL}/>
      <path d="M13.6 19.2V21.8M17.4 19.2V21.8" class="ln" ${DEEPS}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.j, { transform: `translate(0 ${f(1.8 * wave(o, (t) => (1 - t) * Math.abs(Math.sin(3 * Math.PI * t))))})` });
  }
});

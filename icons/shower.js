import { defineIcon, f, OL, DEEPS, rp, at, clamp01 } from '../packages/core/src/kit.js';

const DROPS = [15.6, 19.4, 23.2];

export default defineIcon({
  name: 'shower',
  zh: '淋浴',
  category: 'home',
  tags: ['bathroom', 'wash', 'water', 'shower head', '洗澡'],
  // A shower head on its pipe; water starts to fall from it on hover.
  svg: (u) => {
    const head = rp([[16.6, 6.6], [22.2, 6.6], [25.6, 12], [13.2, 12]], [1.4, 1.4, 1.2, 1.2]);
    const row = (n) => `<path data-n="${n}" d="${DROPS.map((x) => `M${x} 7.8V10.2`).join('')}" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>`;
    return `<path d="M8.4 23.6V6.6Q8.4 3.4 11.6 3.4H16.2Q19.4 3.4 19.4 6.6V7.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      ${row('r1')}${row('r2')}
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${head}" fill="${u.upS}"/></g></g><path d="${head}" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.r1, { transform: `translate(0 ${f(7 * o)})` });
    at(E.r2, { transform: `translate(${f(-0.8 * o)} ${f(11.8 * o)})`, opacity: f(clamp01(o * 3 - 0.6)) });
  }
});

import { defineIcon, f, OL, DEEP, DEEPS, rr, at } from '../packages/core/src/kit.js';

// The dish in its own frame, opening up: a shallow bowl under the rim line y = 0.
const BOWL = 'M-9.6 0A9.6 7.4 0 0 0 9.6 0Z';

export default defineIcon({
  name: 'satellite-dish',
  zh: '卫星天线',
  category: 'communication',
  tags: ['satellite', 'antenna', 'signal', 'broadcast', 'receiver', '卫星'],
  // A dish on a stand; on hover it swings up to aim at the sky.
  svg: (u) => {
    const base = rr(8.6, 20.2, 12.8, 3.8, 1.6);
    return `<path d="M15.5 14.8V20.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${base}" fill="${u.upS}"/></g></g><path d="${base}" ${OL}/>
      <g data-n="armG"><path d="M0 0V-6.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/><circle cy="-7.4" r="1.8" ${DEEP}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="dish"><path d="${BOWL}" fill="${u.loS}"/></g></g></g>
      <g data-n="dishO"><path d="${BOWL}" ${OL}/></g>`;
  },
  target: (h) => ({ a: h ? 28 : 42 }),
  draw(p, E) {
    const t = `translate(15.5 12.6) rotate(${f(p.a)}) translate(0 -1.6)`;
    at(E.dish, { transform: t }); at(E.dishO, { transform: t }); at(E.armG, { transform: t });
  }
});

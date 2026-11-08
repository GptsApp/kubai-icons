import { defineIcon, f, OL, SOFTS, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'orbit',
  zh: '轨道',
  category: 'science',
  tags: ['planet', 'moon', 'space', 'astronomy', '天文', '行星'],
  // A planet with a moon on its orbit; on hover the moon travels a third of the way round.
  svg: (u) => `<path d="${circ(15.5, 12.5, 9.6)}" fill="none" stroke-width="1.6" ${SOFTS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 6.2)}" fill="${u.loS}"/></g></g><path d="${circ(15.5, 12.5, 6.2)}" ${OL}/>
    <g data-n="m"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(0, 0, 2.6)}" fill="${u.upS}"/></g></g><path d="${circ(0, 0, 2.6)}" ${OL}/></g>`,
  target: (h) => ({ a: h ? 165 : 45 }),
  draw(p, E) {
    const a = p.a * Math.PI / 180;
    at(E.m, { transform: `translate(${f(15.5 + 9.6 * Math.sin(a))} ${f(12.5 - 9.6 * Math.cos(a))})` });
  }
});

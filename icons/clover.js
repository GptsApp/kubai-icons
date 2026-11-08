import { defineIcon, f, OL, DEEPS, at } from '../packages/core/src/kit.js';

const HEART = 'M0 9.6C-5.5 5.6 -10.9 1.4 -10.9 -3.6C-10.9 -7 -8.3 -9.6 -5.1 -9.6C-2.9 -9.6 -1.1 -8.4 0 -6.6C1.1 -8.4 2.9 -9.6 5.1 -9.6C8.3 -9.6 10.9 -7 10.9 -3.6C10.9 1.4 5.5 5.6 0 9.6Z';
const ANGLES = [0, 180, 90, 270];

export default defineIcon({
  name: 'clover',
  zh: '四叶草',
  category: 'nature',
  tags: ['clover', 'luck', 'lucky', 'shamrock', "st patrick's", '幸运'],
  // A four-leaf clover, two leaves lighter and in front, on a curved stem; on hover the
  // leaves turn a quarter round the stem.
  svg: (u) => `<path d="M15.5 12.5C17 17 19.4 20.6 22.6 23.2" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    ${ANGLES.map((_, i) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="a${i}"><path d="${HEART}" fill="${i < 2 ? u.loS : u.upS}"/></g></g></g><g data-n="b${i}"><path d="${HEART}" ${OL}/></g>`).join('')}`,
  target: (h) => ({ rot: h ? 90 : 0 }),
  draw(p, E) {
    ANGLES.forEach((a, i) => {
      const t = `translate(15.5 11.8) rotate(${f(a + p.rot)}) translate(0 -6.4) scale(0.5)`;
      at(E[`a${i}`], { transform: t }); at(E[`b${i}`], { transform: t });
    });
  }
});

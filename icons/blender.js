import { defineIcon, KR, f, OL, WHITE, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';

const JAR = rp([[8.2, 4.4], [22.8, 4.4], [20.6, 17.6], [10.4, 17.6]], [1, 1, 1.4, 1.4]);

export default defineIcon({
  name: 'blender',
  zh: '搅拌机',
  category: 'home',
  tags: ['smoothie', 'mixer', 'juice', 'kitchen', 'appliance', 'shake', '榨汁机', '料理机'],
  variants: [],
  // A blender on its motor base; on hover the jar shakes as the drink whirls inside.
  svg: (u) => {
    const lid = rr(7.4, 1.6, 16.2, 3.6, 1.4), base = rr(8.4, 16.8, 14.2, 6.8, KR);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${base}" fill="${u.loS}"/></g></g><path d="${base}" ${OL}/>
      <circle cx="15.5" cy="20.2" r="1.5" ${WHITE}/>
      <g data-n="jar"><g filter="${u.sh}"><path d="${JAR}" fill="${u.upS}"/></g>
      <clipPath id="${u.id('jar')}"><path d="${JAR}"/></clipPath>
      <g clip-path="url(#${u.id('jar')})"><g data-n="mix"><g filter="${u.hi}"><path d="${rr(3, 9.6, 25, 12, 0)}" fill="${u.loS}"/></g></g></g>
      <path d="${JAR}" ${OL}/>
      <g filter="${u.hi}"><path d="${lid}" fill="${u.upS}"/></g><path d="${lid}" ${OL}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.jar, { transform: `translate(${f(rattle(o, 0.8, 5))} 0)` });
    at(E.mix, { transform: `rotate(${f(rattle(o, 20, 3))} 15.5 12)` });
  }
});

import { defineIcon, f, OL, WHITES, rp, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { reveal } from './_home-food.js';

const EGG = 'M15.5 1.6C20 1.6 22.4 7.6 22.4 12.4C22.4 16.4 19.4 19.4 15.5 19.4C11.6 19.4 8.6 16.4 8.6 12.4C8.6 7.6 11 1.6 15.5 1.6Z';

export default defineIcon({
  name: 'egg',
  zh: '鸡蛋',
  category: 'food',
  tags: ['breakfast', 'protein', 'egg cup', 'hatch', 'easter', '蛋'],
  variants: ['plus'],
  // An egg in an egg cup; on hover it wobbles and a crack runs across its shell.
  svg: (u) => {
    const bowl = rp([[7.4, 14.2], [23.6, 14.2], [21, 21], [10, 21]], [1.2, 1.2, 2.6, 2.6]), foot = rr(11.4, 19.6, 8.2, 3.6, 1.2);
    return `<g data-n="egg"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${EGG}" fill="${u.loS}"/></g></g><path d="${EGG}" ${OL}/>
      <path data-n="crack" d="M10.6 9.4L12.6 7.6L14.4 10L16.6 7.6L18.6 10L20.4 8.4" pathLength="1" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${WHITES}/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${foot}" fill="${u.loS}"/></g></g><path d="${foot}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${bowl}" fill="${u.upS}"/></g></g><path d="${bowl}" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.egg, { transform: `rotate(${f(rattle(o, 9, 3))} 15.5 17)` });
    at(E.crack, reveal(clamp01((o - 0.3) / 0.6)));
  }
});

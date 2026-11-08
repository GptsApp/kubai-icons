import { defineIcon, f, OL, circ, at, scaleAt, rattle, clamp01 } from '../packages/core/src/kit.js';

const SKIN = 'M15.5 1.4C19 1.4 20.6 4.2 21.6 7.4C22.4 9.8 24.4 11.6 24.4 15.6C24.4 20.6 20.4 24 15.5 24C10.6 24 6.6 20.6 6.6 15.6C6.6 11.6 8.6 9.8 9.4 7.4C10.4 4.2 12 1.4 15.5 1.4Z';

export default defineIcon({
  name: 'avocado',
  zh: '牛油果',
  category: 'food',
  tags: ['fruit', 'healthy', 'guacamole', 'vegan', 'diet', '鳄梨'],
  variants: [],
  // Half an avocado with its round stone; it wobbles on its round back on hover.
  svg: (u) => `<g data-n="g"><g transform="rotate(16 15.5 13)">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${SKIN}" fill="${u.loS}"/></g></g><path d="${SKIN}" ${OL}/>
      <g filter="${u.hi}"><path d="${SKIN}" transform="${scaleAt(0.72, 15.5, 14.4)}" fill="${u.upS}"/></g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 16.2, 4.2)}" fill="${u.loS}"/></g></g><path d="${circ(15.5, 16.2, 4.2)}" ${OL}/></g></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 9, 3))} 15.5 23.4)` }); }
});

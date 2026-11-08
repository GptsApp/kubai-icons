import { defineIcon, f, DEEPS, clamp01, at } from '../packages/core/src/kit.js';
import { layer } from './_science-edu-sports.js';
import { capsule } from './_weather-nature.js';

const L = [7.4, 13.4], Rt = [23.6, 13.4];

export default defineIcon({
  name: 'jump-rope',
  zh: '跳绳',
  category: 'sports',
  tags: ['skipping rope', 'jump rope', 'fitness', 'cardio', 'exercise', 'workout', '健身'],
  // A skipping rope held by its two handles; on hover the rope swings once over the top.
  svg: (u) => `<path data-n="r" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    ${layer(u, 'hl', capsule(5.4, 2.2, 7.4, 13.4, 3.6), u.upS)}${layer(u, 'hr', capsule(25.6, 2.2, 23.6, 13.4, 3.6), u.upS)}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const c = 13.4 + 19.4 * Math.cos(2 * Math.PI * clamp01(p.o));
    at(E.r, { d: `M${L[0]} ${L[1]}Q15.5 ${f(c)} ${Rt[0]} ${Rt[1]}` });
  }
});

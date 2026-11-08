import { defineIcon, DEEP, at } from '../packages/core/src/kit.js';
import { battery, level } from './_w2-devices.js';

export default defineIcon({
  name: 'battery-medium',
  zh: '电量中',
  category: 'devices',
  tags: ['battery', 'half', 'medium', 'power', '一半电量'],
  variants: ['bolt'],
  // A half-charged battery; on hover its charge rises a step.
  svg: (u) => `${battery(u)}<path data-n="lvl" ${DEEP}/>`,
  target: (h) => ({ w: h ? 13.2 : 8 }),
  draw(p, E) { at(E.lvl, { d: level(p.w) }); }
});

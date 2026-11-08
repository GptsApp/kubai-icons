import { defineIcon, f, DEEP, circ, at } from '../packages/core/src/kit.js';
import { DISC, back } from './_interface.js';

export default defineIcon({
  name: 'circle-dot',
  zh: '单选',
  category: 'interface',
  tags: ['radio button', 'radio', 'option', 'select', 'choice', '选项'],
  // A round option button; on hover its dot swells as the option is picked.
  svg: (u) => `${back(u, DISC)}<path d="${circ(15.5, 12.5, 7.4)}" fill="#fff"/><circle data-n="dot" cx="15.5" cy="12.5" ${DEEP}/>`,
  target: (h) => ({ r: h ? 4.6 : 3.6 }),
  draw(p, E) { at(E.dot, { r: f(p.r) }); }
});

import { defineIcon, f, rp, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { back, MARK } from './_interface.js';

const SIGN = rp([[15.5, 1.4], [27.6, 22.6], [3.4, 22.6]], [2.8, 2.4, 2.4]);

export default defineIcon({
  name: 'triangle-alert',
  zh: '警告',
  category: 'interface',
  tags: ['warning', 'alert', 'caution', 'danger', 'error', '注意'],
  // A warning sign that rocks on its base on hover and settles upright.
  svg: (u) => `<g data-n="sign">${back(u, SIGN)}<path d="M15.5 9.2V15" ${MARK}/><circle cx="15.5" cy="19" r="1.6" fill="#fff" data-w="fill"/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.sign, { transform: `rotate(${f(rattle(clamp01(p.o), 8, 3))} 15.5 22.6)` }); }
});

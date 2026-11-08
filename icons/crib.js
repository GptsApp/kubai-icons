import { defineIcon, f, DEEPS, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { back, flat } from './_b1-home.js';

export default defineIcon({
  name: 'crib',
  zh: '婴儿床',
  category: 'home',
  tags: ['cradle', 'baby', 'cot', 'nursery', 'infant', 'sleep', '摇篮', '宝宝', '小床'],
  // A slatted cradle on rockers; it rocks gently from side to side on hover.
  svg: (u) => `<g data-n="g">
      <path d="M5 21A19.9 19.9 0 0 0 26 21" fill="none" stroke-width="2.6" stroke-linecap="round" ${DEEPS}/>
      <path d="M11.5 7V17M15.5 7V17M19.5 7V17" fill="none" stroke-width="2.2" ${DEEPS}/>
      ${flat(u, rr(6, 5, 19, 3.2, 1))}${flat(u, rr(6, 15.4, 19, 3.2, 1))}
      ${back(u, rr(4.2, 2, 4, 19.4, 2) + rr(22.8, 2, 4, 19.4, 2))}
    </g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 11, 3))} 15.5 4.1)` }); }
});

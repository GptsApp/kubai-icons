import { defineIcon, f, rr, at } from '../packages/core/src/kit.js';
import { back, front } from './_interface.js';

// Folded fingers behind the palm: middle, ring and little finger.
const KNUCKLES = [[14.6, 8.4], [18.4, 9.2], [22.2, 10.4]];

export default defineIcon({
  name: 'pointer',
  zh: '手型',
  category: 'interface',
  tags: ['hand', 'pointer', 'tap', 'click', 'touch', 'link', '点击'],
  // A pointing hand that taps on hover: the hand dips and the finger bends down.
  svg: (u) => `<g data-n="hand">
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="fg" fill="${u.loS}"/></g></g><path data-n="fgO" class="ol" data-t="stroke:#5393FF"/>
    ${KNUCKLES.map(([x, y]) => back(u, rr(x, y, 3.8, 8, 1.9))).join('')}
    ${front(u, rr(7.2, 12.4, 19, 11.4, 3.6))}</g>`,
  target: (h) => ({ top: h ? 4.2 : 1.2, y: h ? 0.6 : 0 }),
  draw(p, E) {
    const d = rr(10.2, p.top, 4.4, 14 - p.top, 2.2);
    at(E.fg, { d }); at(E.fgO, { d });
    at(E.hand, { transform: `translate(0 ${f(p.y)})` });
  }
});

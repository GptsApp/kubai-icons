import { defineIcon, f, OL, WHITES, rr, at } from '../packages/core/src/kit.js';
import { light } from './_b2-kitchen.js';

const X0 = 7.7, X1 = 23.3, B = 18.4, R = 1.6;

export default defineIcon({
  name: 'ice-pop',
  zh: '冰棍',
  category: 'food',
  tags: ['popsicle', 'ice lolly', 'summer', 'frozen', 'dessert', 'stick', '雪糕', '冰棒'],
  variants: [],
  // An ice pop on a stick with two grooves; on hover it melts and a drip runs down.
  svg: (u) => `${light(u, rr(13.7, 15, 3.6, 9.6, 1.8))}
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="b" fill="${u.loS}"/></g></g><path data-n="bO" ${OL}/>
    <path d="M12.9 6.4V13.4M18.1 6.4V13.4" fill="none" stroke-width="1.6" stroke-linecap="round" ${WHITES}/>`,
  target: (h) => ({ d: h ? 4.6 : 1.3 }),
  draw(p, E) {
    const low = f(B + p.d - 1.3), end = X0 + R;
    const d = `M${X0} 8.8A7.8 7.8 0 0 1 ${X1} 8.8V${B - R}Q${X1} ${B} ${X1 - R} ${B}H${end + 2.6}V${low}A1.3 1.3 0 0 1 ${end} ${low}V${B}Q${X0} ${B} ${X0} ${B - R}Z`;
    at(E.b, { d }); at(E.bO, { d });
  }
});

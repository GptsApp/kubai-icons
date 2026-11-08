import { defineIcon, f, OL, DEEP, DEEPS, ellipse, circ, at } from '../packages/core/src/kit.js';

const GREEN = ellipse(15.5, 20.6, 11, 3);

export default defineIcon({
  name: 'golf-flag',
  zh: '高尔夫',
  category: 'sports',
  tags: ['golf', 'hole', 'flag', 'green', 'course', '果岭'],
  // A flag in the hole on a green, with a ball; on hover the flag flutters and the ball rolls closer.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${GREEN}" fill="${u.upS}"/></g></g><path d="${GREEN}" ${OL}/>
    <path d="${ellipse(19, 20.6, 2.6, 1.2)}" ${DEEP}/>
    <path d="M19 20.6V2.2" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="fl" fill="${u.loS}"/></g></g><path data-n="flO" ${OL}/>
    <g data-n="ball"><path d="${circ(0, 0, 2)}" fill="#fff"/><path d="${circ(0, 0, 2)}" ${OL}/></g>`,
  target: (h) => ({ a: h ? -1.4 : 1.2, tip: h ? 8.2 : 7.6, bx: h ? 12.8 : 9.6 }),
  draw(p, E) {
    const d = `M18 2.6Q13.4 ${f(4 + p.a)} ${f(p.tip)} 6.8Q13.4 ${f(9.4 - p.a)} 18 11Z`;
    at(E.fl, { d }); at(E.flO, { d });
    at(E.ball, { transform: `translate(${f(p.bx)} 19.4)` });
  }
});

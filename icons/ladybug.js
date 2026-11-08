import { defineIcon, f, OL, DEEPS, WHITE, circ, ellipse, at } from '../packages/core/src/kit.js';
import { layer, move } from './_w2-people.js';

// The two wing cases are halves of one oval, hinged at its top.
const HALF = 'M15.5 5.2A9.4 9.2 0 0 0 15.5 23.6Z';
const SPOTS = circ(11.6, 11.6, 1.6) + circ(10.8, 17.6, 1.5);

export default defineIcon({
  name: 'ladybug',
  zh: '瓢虫',
  category: 'nature',
  tags: ['ladybug', 'ladybird', 'beetle', 'insect', 'garden', 'lucky', '昆虫'],
  // A spotted ladybug seen from above; on hover it lifts its wing cases to show the wings beneath.
  svg: (u) => `<path d="M13.4 3.2L11.4 0.8M17.6 3.2L19.6 0.8" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    ${layer(u, circ(15.5, 5.8, 3.8), u.upS)}
    <g filter="${u.hi}"><path d="${ellipse(15.5, 15, 5.6, 7.6)}" fill="${u.upS}"/></g><path d="${ellipse(15.5, 15, 5.6, 7.6)}" ${OL}/>
    ${layer(u, HALF, u.loS, 'l')}<g data-n="ls"><path d="${SPOTS}" ${WHITE}/></g>
    ${layer(u, HALF, u.loS, 'r')}<g data-n="rs"><path d="${SPOTS}" ${WHITE}/></g>`,
  target: (h) => ({ a: h ? 16 : 0 }),
  draw(p, E) {
    const l = `rotate(${f(p.a)} 15.5 6.4)`, r = `rotate(${f(-p.a)} 15.5 6.4) translate(31 0) scale(-1 1)`;
    move(E, 'l', l); at(E.ls, { transform: l });
    move(E, 'r', r); at(E.rs, { transform: r });
  }
});

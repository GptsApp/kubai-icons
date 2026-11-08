import { defineIcon, f, OL, DEEPS, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'flag',
  zh: '旗帜',
  category: 'interface',
  tags: ['report', 'milestone', 'mark', 'country'],
  variants: ['plus', 'check', 'x', 'alert'],
  off: true,
  // A flag that ripples on hover.
  svg: (u) => `<path d="M8.2 2.4V23.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="cl" fill="${u.loS}"/></g></g><path data-n="clO" ${OL}/>`,
  target: (h) => ({ a: h ? -2 : 2 }),
  draw(p, E) {
    const a = p.a;
    const d = `M9.2 3.4C13.6 ${f(3.4 - a)} 18 ${f(3.4 + a)} 25 3.4V15.2C18 ${f(15.2 + a)} 13.6 ${f(15.2 - a)} 9.2 15.2Z`;
    at(E.cl, { d }); at(E.clO, { d });
  }
});

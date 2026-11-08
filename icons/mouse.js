import { defineIcon, f, OL, DEEP, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'mouse',
  zh: '鼠标',
  category: 'devices',
  tags: ['click', 'pointer', 'cursor', 'input', '点击'],
  variants: ['cog', 'plus', 'check'],
  // A mouse with two buttons and a wheel; on hover the left button clicks.
  svg: (u) => {
    const body = rr(8.6, 2.2, 13.8, 20.6, 6.9);
    const left = 'M8.6 10.6V9.1A6.9 6.9 0 0 1 15.5 2.2V10.6Z', right = 'M15.5 2.2A6.9 6.9 0 0 1 22.4 9.1V10.6H15.5Z';
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
      <g filter="${u.hi}"><path d="${right}" fill="${u.upS}"/></g><path d="${right}" ${OL}/>
      <g filter="${u.hi}"><path d="${left}" fill="${u.upS}"/><path data-n="lit" d="${left}" fill="${u.pure('#4389FF')}"/></g><path d="${left}" ${OL}/>
      <path data-n="wheel" ${DEEP}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    at(E.lit, { opacity: f(p.o) });
    at(E.wheel, { d: rr(14.3, 4.4 + 0.4 * p.o, 2.4, 4.6, 1.2) });
  }
});

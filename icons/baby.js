import { defineIcon, f, OL, DEEPS, circ, clamp01, rattle, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'baby',
  zh: '婴儿',
  category: 'people',
  tags: ['child', 'infant', 'kid', 'toddler', 'family', 'parenting', '宝宝'],
  // A baby with a tuft of hair; on hover it giggles, rocking its head as its smile grows.
  svg: (u) => {
    const head = circ(15.5, 14, 10);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="f"><path d="${head}" fill="${u.loS}"/></g></g></g>
      <g data-n="fo"><path d="${head}" ${OL}/>
        <path d="M15.2 3.6Q15.6 0.8 19 1.2" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
        <g fill="#fff" data-w="fill"><circle cx="11.4" cy="13" r="1.6"/><circle cx="19.6" cy="13" r="1.6"/></g>
        <path data-n="m" fill="none" stroke-width="2.2" stroke-linecap="round" stroke="#fff" data-w="stroke"/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0, m: h ? 19.6 : 18.8 }),
  draw(p, E) {
    const t = `rotate(${f(rattle(clamp01(p.o), 9, 2))} 15.5 22)`;
    at(E.f, { transform: t }); at(E.fo, { transform: t });
    at(E.m, { d: `M12.6 16.8Q15.5 ${f(p.m)} 18.4 16.8` });
  }
});

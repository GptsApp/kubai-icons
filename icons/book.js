import { defineIcon, KR, CR, f, OL, ACC, DEEP, rr, lines, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'book',
  zh: '书本',
  category: 'education',
  tags: ['read', 'library', 'novel', 'open book'],
  variants: ['plus', 'check', 'x', 'heart', 'star', 'search', 'lock', 'clock', 'sparkle', 'down'],
  // A closed book whose cover swings open on hover.
  svg: (u) => {
    const back = rr(6.3, 1.5, 18.4, 22, KR), cover = rr(6.3, 1.5, 18.4, 19.4, KR);
    return `<g filter="${u.sh}"><path d="${back}" fill="${u.loS}"/></g><path d="${back}" ${OL}/>
      <path d="${rr(7.8, 3, 15.6, 19.4, CR)}" fill="#fff"/>
      <path d="${lines(11.4, 8.4, [9.2, 6.6])}" ${ACC}/>
      <g data-n="cv"><g filter="${u.hi}"><path d="${cover}" fill="${u.loS}"/></g><path data-n="sh" d="${cover}" ${DEEP} opacity="0"/><path d="${cover}" ${OL}/>
        <path d="${lines(10.4, 7.6, [10.2])}" class="ln" stroke="#fff" data-w="stroke"/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o));
    at(E.cv, { transform: `translate(6.3 0) scale(${f(Math.max(0.001, 1 - 0.72 * o))} 1) translate(-6.3 0)` });
    at(E.sh, { opacity: f(0.35 * o) });
  }
});

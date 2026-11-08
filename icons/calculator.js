import { defineIcon, KR, CR, f, OL, DEEPS, rr, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'calculator',
  zh: '计算器',
  category: 'commerce',
  tags: ['math', 'calculate', 'accounting'],
  // A calculator with a display, a plus key and an equals key. On hover the equals key is
  // pressed, lights up, and the display fills with the result.
  svg: (u) => {
    const body = rr(6.3, 1, 18.4, 23, KR), eq = rr(16.5, 16.8, 6.2, 5.2, CR);
    const eqMark = 'M18.3 18.1H20.9M18.3 20.7H20.9';
    return `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g>
    <path d="${body}" ${OL}/>
    <path d="${rr(8.3, 3, 14.4, 4.6, CR)}" fill="#fff"/>
    <path data-n="read" class="ln" ${DEEPS}/>
    <path d="${rr(8.3, 9.6, 6.2, 5.2, CR) + rr(16.5, 9.6, 6.2, 5.2, CR) + rr(8.3, 16.8, 6.2, 5.2, CR)}" fill="#fff"/>
    <path d="M10.1 12.2H12.7M11.4 10.9V13.5" class="ln" ${DEEPS}/>
    <g data-n="eq"><path d="${eq}" fill="#fff"/><path data-n="lit" d="${eq}" fill="${u.pure('#2F6FE0')}"/>
      <path data-n="eqD" d="${eqMark}" class="ln" ${DEEPS}/><path data-n="eqW" d="${eqMark}" class="ln" stroke="#fff" data-w="stroke"/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0, s: h ? 0.9 : 1, n: h ? 9.6 : 3.4 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o));
    at(E.eq, { transform: `translate(19.6 19.4) scale(${f(p.s)}) translate(-19.6 -19.4)` });
    at(E.lit, { opacity: f(o) }); at(E.eqW, { opacity: f(o) }); at(E.eqD, { opacity: f(1 - o) });
    at(E.read, { d: `M${f(20.9 - p.n)} 5.3H20.9` });
  }
});

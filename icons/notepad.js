import { defineIcon, KR, CR, f, OL, ACC, R, rp, rr, lines, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'notepad',
  zh: '记事本',
  category: 'files',
  tags: ['notepad', 'memo', 'pad', 'notes', 'jotter', '便笺'],
  variants: ['plus', 'minus', 'check', 'x', 'alert', 'clock', 'star', 'heart', 'lock', 'search', 'sync', 'sparkle'],
  // A gummed pad of lined sheets; on hover the top sheet flips up over the binding,
  // uncovering a fresh one.
  svg: (u) => {
    const body = rr(6.3, 1, 18.4, 23, KR);
    const sheet = rp(R(8.6, 5.6, 13.8, 16.2), [0, 0, CR, CR]);
    const head = rp(R(6.3, 1, 18.4, 4.8), [KR, KR, 0, 0]);
    return `<g filter="${u.sh}"><path d="${body}" fill="${u.loS}"/></g>
      <path d="${sheet}" fill="#fff"/>
      <g data-n="sheet"><path d="${sheet}" fill="#fff"/>
        <path d="${lines(11.2, 10.6, [8.6, 5.6])}" ${ACC}/>
        <path data-n="shade" d="${sheet}" data-t="fill:#4389FF" opacity="0"/></g>
      <path d="${body}" ${OL}/>
      <g filter="${u.hi}"><path d="${head}" fill="${u.upS}"/></g><path d="${head}" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o)), sy = Math.cos(o * Math.PI / 2);
    at(E.sheet, { transform: `translate(0 5.6) scale(1 ${f(Math.max(0.001, sy))}) translate(0 -5.6)`, opacity: o > 0.985 ? 0 : 1 });
    at(E.shade, { opacity: f(0.45 * Math.sin(o * Math.PI / 2)) });
  }
});

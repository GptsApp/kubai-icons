import { defineIcon, KR, f, OL, rp, lines, circ, at, clamp01 } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'invoice',
  zh: '发票',
  category: 'commerce',
  tags: ['bill', 'billing', 'statement', 'paid', 'document', '账单'],
  variants: ['plus', 'check', 'x', 'search', 'down', 'up', 'right', 'clock', 'alert', 'lock'],
  // An invoice page with a folded corner; on hover a round "paid" stamp lands on it.
  svg: (u) => {
    const pg = rp([[6.3, 1], [18.3, 1], [24.7, 7.4], [24.7, 24], [6.3, 24]], [KR, 0.5, 0.5, KR, KR]);
    const fold = rp([[18.3, 1], [24.7, 7.4], [18.3, 7.4]], [0.4, 0.4, 1.2]);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${pg}" fill="${u.loS}"/></g></g><path d="${pg}" ${OL}/>
      <path d="${lines(9.4, 4.8, [6.4, 9.6])}" class="ln" stroke="#fff" data-w="stroke"/>
      <path d="${lines(9.4, 20.4, [12.2])}" class="ln" stroke="#fff" data-w="stroke"/>
      <g filter="${u.hi}"><path d="${fold}" fill="${u.upS}"/></g><path d="${fold}" ${OL}/>
      <g data-n="st" fill="none" stroke="#fff" data-w="stroke" stroke-linecap="round" stroke-linejoin="round">
        <path d="${circ(12.8, 13.6, 3.4)}" stroke-width="1.6"/><path d="M11.3 13.7L12.4 14.8L14.4 12.6" stroke-width="1.6"/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), s = 1.6 - 0.6 * o;
    at(E.st, { transform: `translate(12.8 13.6) scale(${f(s)}) rotate(${f(-18 * (1 - o))}) translate(-12.8 -13.6)`, opacity: f(clamp01(o * 1.6)) });
  }
});

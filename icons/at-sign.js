import { defineIcon, f, OL, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'at-sign',
  zh: '提及',
  category: 'communication',
  tags: ['at', 'mention', 'email', 'address', '@', '艾特'],
  // An @ on a round tile; on hover it whirls a full turn the way its loop is written, and the
  // tail sweeps further round.
  svg: (u) => {
    const disc = circ(15.5, 12.5, 11.5);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${disc}" fill="${u.loS}"/></g></g><path d="${disc}" ${OL}/>
      <g fill="none" stroke-width="2.2" stroke-linecap="round" stroke="#fff" data-w="stroke">
        <path d="${circ(15.5, 12.5, 3.2)}"/><path data-n="at"/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const r = 7.4, pt = (d) => [15.5 + r * Math.cos(d * Math.PI / 180), 12.5 + r * Math.sin(d * Math.PI / 180)];
    const s = pt(10), e = pt(92 - 36 * p.o);
    if (!p.o) return at(E.at, { d: `M18.7 9.4V13.6Q18.7 16.4 20.8 16.4Q${f(s[0])} 16.4 ${f(s[0])} ${f(s[1])}A${r} ${r} 0 1 0 ${f(e[0])} ${f(e[1])}` });
    // Counter-clockwise turn about the centre, the same way the loop runs.
    const t = -2 * Math.PI * p.o, c = Math.cos(t), n = Math.sin(t);
    const q = ([x, y]) => `${f(15.5 + (x - 15.5) * c - (y - 12.5) * n)} ${f(12.5 + (x - 15.5) * n + (y - 12.5) * c)}`;
    at(E.at, { d: `M${q([18.7, 9.4])}L${q([18.7, 13.6])}Q${q([18.7, 16.4])} ${q([20.8, 16.4])}Q${q([s[0], 16.4])} ${q(s)}A${r} ${r} 0 1 0 ${q(e)}` });
  }
});

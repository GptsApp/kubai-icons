import { defineIcon, KR, CR, f, OL, DEEP, SOFT, SOFTS, rr, at } from '../packages/core/src/kit.js';

// Two rods; each row's beads are listed left to right with their rest and hover x.
const ROWS = [8.6, 16.4];
const BEADS = [
  [[7.8, 7.8], [12.2, 15.8], [19.2, 19.2]],
  [[7.8, 7.8], [15, 11.4], [19.2, 19.2]]
];

export default defineIcon({
  name: 'abacus',
  zh: '算盘',
  category: 'education',
  tags: ['count', 'math', 'calculate', 'beads', '计算', '数学'],
  // An abacus; on hover a group of beads on each rod slides across to the other side.
  svg: (u) => {
    const frame = rr(4.6, 2.2, 21.8, 20.6, KR);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${frame}" fill="${u.loS}"/></g></g><path d="${frame}" ${OL}/>
    <path d="${rr(6.8, 4.4, 17.4, 16.2, CR)}" fill="#fff"/>
    <path d="${ROWS.map((y) => `M6.8 ${y}H24.2`).join('')}" fill="none" stroke-width="1.6" ${SOFTS}/>
    ${BEADS.map((row, r) => row.map((_, i) => `<path data-n="b${r}${i}" d="${rr(0, -2.1, 4, 4.2, 1.6)}" ${i % 2 ? SOFT : DEEP}/>`).join('')).join('')}`;
  },
  target: (h) => ({ x: BEADS.map((row) => row.map((b) => b[h ? 1 : 0])) }),
  draw(p, E) { p.x.forEach((row, r) => row.forEach((x, i) => at(E[`b${r}${i}`], { transform: `translate(${f(x)} ${ROWS[r]})` }))); }
});

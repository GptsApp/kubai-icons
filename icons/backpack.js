import { defineIcon, f, OL, DEEP, DEEPS, R, rp, rr, rattle, at, clamp01 } from '../packages/core/src/kit.js';

const BODY_PTS = R(6.4, 4.4, 18.2, 19.2), BODY_R = [6, 6, 2.4, 2.4];
const POCKET_PTS = R(9, 12.6, 13, 8.6), POCKET_R = [2, 2, 1.6, 1.6];
const BODY = rp(BODY_PTS, BODY_R), POCKET = rp(POCKET_PTS, POCKET_R);
const HANDLE = 'M12.6 6V4.2A2.9 2.9 0 0 1 18.4 4.2V6';
// A point turned by a degrees about the top of the carry loop.
const turn = (a) => {
  const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180);
  return ([x, y]) => [15.5 + (x - 15.5) * c - (y - 1.3) * s, 1.3 + (x - 15.5) * s + (y - 1.3) * c].map(f);
};
const seg = (t, x0, x1, y) => `M${t([x0, y]).join(' ')}L${t([x1, y]).join(' ')}`;

export default defineIcon({
  name: 'backpack',
  zh: '书包',
  category: 'education',
  tags: ['bag', 'school', 'rucksack', 'travel', 'student', '背包'],
  // A backpack with a front pocket; on hover the zip pull is tugged across, its tab trailing,
  // and the bag sways on its carry loop.
  svg: (u) => `<path data-n="loop" d="${HANDLE}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="body" d="${BODY}" fill="${u.loS}"/></g></g><path data-n="bodyO" d="${BODY}" ${OL}/>
    <path data-n="top" d="M12.2 8.8H18.8" class="ln" stroke="#fff" data-w="stroke"/>
    <g filter="${u.hi}"><path data-n="pk" d="${POCKET}" fill="${u.upS}"/></g><path data-n="pkO" d="${POCKET}" ${OL}/>
    <path data-n="zip" d="M11.4 15.4H19.6" class="ln" ${DEEPS}/>
    <path data-n="tab" d="${rr(-1.2, -0.6, 2.4, 4.2, 1.2)}" ${DEEP}/>`,
  target: (h) => ({ x: h ? 18.8 : 12.2 }),
  draw(p, E) {
    const k = clamp01((p.x - 12.2) / 6.6), rock = rattle(k, 5, 2), lag = rattle(k, -28, 2);
    if (rock) {
      const t = turn(rock), [a, b] = t([12.6, 6]), [c, d] = t([12.6, 4.2]), [g, h] = t([18.4, 4.2]), [i, j] = t([18.4, 6]);
      at(E.loop, { d: `M${a} ${b}L${c} ${d}A2.9 2.9 0 0 1 ${g} ${h}L${i} ${j}` });
      const body = rp(BODY_PTS.map(t), BODY_R), pk = rp(POCKET_PTS.map(t), POCKET_R);
      at(E.body, { d: body }); at(E.bodyO, { d: body }); at(E.pk, { d: pk }); at(E.pkO, { d: pk });
      at(E.top, { d: seg(t, 12.2, 18.8, 8.8) }); at(E.zip, { d: seg(t, 11.4, 19.6, 15.4) });
    } else {
      at(E.loop, { d: HANDLE }); at(E.body, { d: BODY }); at(E.bodyO, { d: BODY }); at(E.pk, { d: POCKET }); at(E.pkO, { d: POCKET });
      at(E.top, { d: 'M12.2 8.8H18.8' }); at(E.zip, { d: 'M11.4 15.4H19.6' });
    }
    // The tab hangs from the zip and swings behind the pull as it moves.
    const tab = `translate(${f(p.x)} 15.4)`;
    at(E.tab, { transform: rock ? `rotate(${f(rock)} 15.5 1.3) ${tab} rotate(${f(lag)})` : tab });
  }
});

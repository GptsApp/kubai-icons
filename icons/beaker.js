import { defineIcon, KR, f, OL, DEEPS, rp, rattle, at, clamp01 } from '../packages/core/src/kit.js';

const PTS = [[5.6, 1.8], [25.4, 1.8], [23.6, 4.6], [23.6, 23.4], [7.4, 23.4], [7.4, 4.6]];
const RAD = [1, 1, 0.6, KR, KR, 0.6];
const BODY = rp(PTS, RAD), MARKS = [[10.4, 6.8, 15], [10.4, 9.8, 13.2]];
// A point turned by a degrees about the middle of the beaker's foot.
const turn = (a) => {
  const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180);
  return ([x, y]) => [15.5 + (x - 15.5) * c - (y - 23.4) * s, 23.4 + (x - 15.5) * s + (y - 23.4) * c];
};
const marks = (t) => MARKS.map(([x0, y, x1]) => `M${t([x0, y]).map(f).join(' ')}L${t([x1, y]).map(f).join(' ')}`).join('');

export default defineIcon({
  name: 'beaker',
  zh: '烧杯',
  category: 'science',
  tags: ['chemistry', 'lab', 'measure', 'experiment', '化学', '实验'],
  variants: ['sparkle', 'check', 'alert'],
  // A lipped beaker with two graduation marks; on hover it rocks on its foot, the liquid
  // sloshes against the swing and both settle level.
  svg: (u) => `<clipPath id="${u.id('bk')}"><path data-n="clip" d="${BODY}"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="body" d="${BODY}" fill="${u.upS}"/></g></g>
    <g clip-path="url(#${u.id('bk')})"><g filter="${u.hi}"><path data-n="liq" fill="${u.loS}"/></g></g>
    <path data-n="marks" d="M10.4 6.8H15M10.4 9.8H13.2" class="ln" ${DEEPS}/>
    <path data-n="bodyO" d="${BODY}" ${OL}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), rock = rattle(o, 5, 2);
    if (rock) {
      const t = turn(rock), d = rp(PTS.map(t), RAD);
      at(E.clip, { d }); at(E.body, { d }); at(E.bodyO, { d }); at(E.marks, { d: marks(t) });
    } else {
      at(E.clip, { d: BODY }); at(E.body, { d: BODY }); at(E.bodyO, { d: BODY }); at(E.marks, { d: 'M10.4 6.8H15M10.4 9.8H13.2' });
    }
    // The surface rocks three times and bobs down and up before it settles level.
    const s = Math.tan(rattle(o, 26, 3) * Math.PI / 180), y = 12.8 + rattle(o, 1.8, 2);
    at(E.liq, { d: `M4 ${f(y - 11.5 * s)}L27 ${f(y + 11.5 * s)}L27 25L4 25Z` });
  }
});

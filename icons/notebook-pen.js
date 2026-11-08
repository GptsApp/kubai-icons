import { defineIcon, KR, CR, f, OL, DEEP, DEEPS, rp, rr, lines, at, clamp01, rattle, bump } from '../packages/core/src/kit.js';

// A pencil lying with its point at the origin and its body running back along -x.
const PEN = rp([[-11, -1.8], [-3.6, -1.8], [0, 0], [-3.6, 1.8], [-11, 1.8]], [0.8, 0.2, 0.4, 0.2, 0.8]);
const TIP = [17.6, 15.6];

export default defineIcon({
  name: 'notebook-pen',
  zh: '记笔记',
  category: 'files',
  tags: ['notebook', 'journal', 'write', 'note taking', 'diary', 'compose', '写笔记'],
  variants: ['plus', 'check', 'lock', 'sparkle'],
  // A spiral notebook with a pencil resting on its cover; on hover the pencil writes a few strokes.
  svg: (u) => {
    const back = rr(5.4, 1, 18.4, 23, KR), cover = rp([[8.4, 1], [23.8, 1], [23.8, 24], [8.4, 24]], [1.6, KR, KR, 1.6]);
    const rings = [5.5, 10.2, 14.8, 19.5].map((y) => rr(2.9, y - 1.2, 7.4, 2.4, 1.2)).join('');
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${back}" fill="${u.loS}"/></g></g><path d="${back}" ${OL}/>
      <g filter="${u.hi}"><path d="${cover}" fill="${u.upS}"/></g><path d="${cover}" ${OL}/>
      <path d="${lines(12.2, 6.4, [5.2])}" class="ln" ${DEEPS} stroke-opacity=".55"/>
      <path d="${rings}" ${DEEP}/>
      <path data-n="pen" d="${PEN}" ${DEEP}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), dx = rattle(o, 1.6, 3), dy = 0.6 * bump(o);
    at(E.pen, { transform: `translate(${f(TIP[0] + dx)} ${f(TIP[1] + dy)}) rotate(${f(132 + rattle(o, 5, 3))})` });
  }
});

import { defineIcon, f, OL, at } from '../packages/core/src/kit.js';
import { FACE } from './_comm-people.js';

export default defineIcon({
  name: 'meh',
  zh: '一般',
  category: 'people',
  tags: ['face', 'neutral', 'okay', 'so-so', 'emoji', 'emotion', 'feedback', '还行'],
  // A neutral face with a straight mouth; on hover its eyes glance aside and the mouth tilts.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${FACE}" fill="${u.loS}"/></g></g><path d="${FACE}" ${OL}/>
    <g fill="#fff" data-w="fill"><circle data-n="e1" cy="9.8" r="1.7"/><circle data-n="e2" cy="9.8" r="1.7"/></g>
    <path data-n="m" fill="none" stroke-width="2.2" stroke-linecap="round" stroke="#fff" data-w="stroke"/>`,
  target: (h) => ({ x: h ? 2.4 : 0, t: h ? 1.5 : 0 }),
  draw(p, E) {
    at(E.e1, { cx: f(11.4 + p.x) }); at(E.e2, { cx: f(19.6 + p.x) });
    at(E.m, { d: `M10.8 ${f(16.6 + p.t)}L20.2 ${f(16.6 - p.t)}` });
  }
});

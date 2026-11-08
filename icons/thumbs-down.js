import { defineIcon, f, OL, DEEPS, at } from '../packages/core/src/kit.js';
import { thumb } from './_comm-people.js';

const T = thumb(true);

export default defineIcon({
  name: 'thumbs-down',
  zh: '点踩',
  category: 'people',
  tags: ['dislike', 'disapprove', 'bad', 'disagree', 'no', 'downvote', '踩'],
  // A fist with its thumb down; on hover it pushes down a little.
  svg: (u) => `<g data-n="g"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${T.cuff}" fill="${u.loS}"/></g></g><path d="${T.cuff}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${T.hand}" fill="${u.upS}"/></g></g><path d="${T.hand}" ${OL}/>
    <path d="${T.seams}" class="ln" stroke-linecap="round" ${DEEPS}/></g>`,
  target: (h) => ({ y: h ? 1.2 : 0, a: h ? 7 : 0 }),
  draw(p, E) { at(E.g, { transform: `translate(0 ${f(p.y)}) rotate(${f(p.a)} 6.4 1.2)` }); }
});

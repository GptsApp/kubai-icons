import { defineIcon, f, OL, at } from '../packages/core/src/kit.js';
import { person } from './_comm-people.js';

const BACK = person(20, 1.6, 3.5, 13.2, 9.4), FRONT = person(11.8, 4, 3.9, 15.4, 8.6);

export default defineIcon({
  name: 'users',
  zh: '多人',
  category: 'people',
  tags: ['people', 'group', 'team', 'members', 'friends', 'contacts', '团队'],
  variants: ['plus', 'minus', 'check', 'x', 'lock', 'search', 'cog', 'star', 'heart', 'clock', 'sync', 'alert', 'info', 'right'],
  // Two people, one behind the other; on hover both look up, the one behind a beat later.
  svg: (u) => `<g data-n="b"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${BACK.body}" fill="${u.loS}"/></g></g><path d="${BACK.body}" ${OL}/>
      <g data-n="bh"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${BACK.head}" fill="${u.loS}"/></g></g><path d="${BACK.head}" ${OL}/></g></g>
    <g data-n="fr"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${FRONT.body}" fill="${u.upS}"/></g></g><path d="${FRONT.body}" ${OL}/>
      <g data-n="fh"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${FRONT.head}" fill="${u.upS}"/></g></g><path d="${FRONT.head}" ${OL}/></g></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const a = Math.min(1, p.o / 0.7), b = Math.max(0, (p.o - 0.3) / 0.7);
    at(E.fh, { transform: `translate(0 ${f(-1.2 * a)})` });
    at(E.bh, { transform: `translate(0 ${f(-1 * b)})` });
  }
});

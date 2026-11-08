import { defineIcon, f, OL, at } from '../packages/core/src/kit.js';
import { person } from './_comm-people.js';

const SIDE = person(0, 0, 3.2, 11.4, 9), MID = person(15.5, 4.2, 3.8, 14.4, 8.4);

export default defineIcon({
  name: 'user-group',
  zh: '群组',
  category: 'people',
  tags: ['group', 'team', 'community', 'organization', 'members', 'crowd', '团体'],
  variants: ['plus', 'minus', 'check', 'x', 'lock', 'search', 'cog', 'star', 'heart', 'sync', 'alert', 'info'],
  // Three people, the one in front between two behind; on hover the two behind step apart.
  svg: (u) => {
    const side = (n) => `<g data-n="${n}"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${SIDE.body}" fill="${u.loS}"/></g></g><path d="${SIDE.body}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${SIDE.head}" fill="${u.loS}"/></g></g><path d="${SIDE.head}" ${OL}/></g>`;
    return `${side('l')}${side('r')}
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${MID.body}" fill="${u.upS}"/></g></g><path d="${MID.body}" ${OL}/>
      <g data-n="mh"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${MID.head}" fill="${u.upS}"/></g></g><path d="${MID.head}" ${OL}/></g>`;
  },
  target: (h) => ({ d: h ? 0.9 : 0, lift: h ? -0.8 : 0 }),
  draw(p, E) {
    at(E.l, { transform: `translate(${f(8.4 - p.d)} 2.6)` });
    at(E.r, { transform: `translate(${f(22.6 + p.d)} 2.6)` });
    at(E.mh, { transform: `translate(0 ${f(p.lift)})` });
  }
});

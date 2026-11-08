import { defineIcon, OL, clamp01, rattle, at } from '../packages/core/src/kit.js';
import { handset } from './_comm-people.js';

export default defineIcon({
  name: 'phone',
  zh: '电话',
  category: 'communication',
  tags: ['call', 'handset', 'telephone', 'contact', '通话'],
  variants: ['plus', 'x', 'clock', 'right', 'lock'],
  // A telephone handset; on hover it rings, rattling in place and settling again.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="hd" fill="${u.loS}"/></g></g><path data-n="hdO" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="cp" fill="${u.upS}"/></g></g><path data-n="cpO" ${OL}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const g = handset(15, 13, 1.02, -135 + rattle(clamp01(p.o), 14, 3));
    at(E.hd, { d: g.handle }); at(E.hdO, { d: g.handle });
    at(E.cp, { d: g.cups }); at(E.cpO, { d: g.cups });
  }
});

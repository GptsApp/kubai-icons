import { defineIcon, f, OL, rr, rp, rattle, clamp01, at } from '../packages/core/src/kit.js';

const TOP = rp([[15.5, 1.2], [22.6, 11.4], [8.4, 11.4]], [1.4, 1.8, 1.8]);
const LOW = rp([[15.5, 5.8], [25.6, 19.6], [5.4, 19.6]], [1.8, KR(), KR()]);
function KR() { return 2.2; }
const TRUNK = rr(13.6, 17, 3.8, 7, 1.4);

export default defineIcon({
  name: 'tree-pine',
  zh: '松树',
  category: 'nature',
  tags: ['pine', 'christmas tree', 'evergreen', 'forest', 'conifer', '圣诞树'],
  // A pine of two tiers, the lower one lighter and in front; on hover it sways, the top swinging further.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${TRUNK}" fill="${u.loS}"/></g></g><path d="${TRUNK}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="t"><path d="${TOP}" fill="${u.loS}"/></g></g></g><g data-n="tO"><path d="${TOP}" stroke-linejoin="round" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="l"><path d="${LOW}" fill="${u.upS}"/></g></g></g><g data-n="lO"><path d="${LOW}" stroke-linejoin="round" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const a = rattle(clamp01(p.o), 5, 3);
    at(E.t, { transform: `rotate(${f(a * 1.8)} 15.5 21)` }); at(E.tO, { transform: `rotate(${f(a * 1.8)} 15.5 21)` });
    at(E.l, { transform: `rotate(${f(a)} 15.5 21)` }); at(E.lO, { transform: `rotate(${f(a)} 15.5 21)` });
  }
});

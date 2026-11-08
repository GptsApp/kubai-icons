import { defineIcon, f, OL, DEEP, DEEPS, rr, at } from '../packages/core/src/kit.js';

const TUBE = rr(-9, -3, 14.4, 6, 2), HOOD = rr(0, -3.8, 6.4, 7.6, 1.8), EYE = rr(-11.6, -1.6, 3.4, 3.2, 1);

export default defineIcon({
  name: 'telescope',
  zh: '望远镜',
  category: 'science',
  tags: ['astronomy', 'space', 'observe', 'stars', '天文', '观测'],
  // A telescope on a tripod; on hover it tilts higher and its hood slides out.
  svg: (u) => `<path d="M15.5 12.4L9.6 23.2M15.5 12.4L21.4 23.2M15.5 12.4V23.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="t"><path d="${EYE}" ${DEEP}/><path d="${TUBE}" fill="${u.loS}"/></g></g></g>
    <g data-n="tO"><path d="${TUBE}" ${OL}/>
      <g data-n="h"><g filter="${u.hi}"><path d="${HOOD}" fill="${u.upS}"/></g><path d="${HOOD}" ${OL}/></g></g>`,
  target: (h) => ({ a: h ? -36 : -28, x: h ? 6.2 : 4.6 }),
  draw(p, E) {
    const t = `translate(15.5 11.6) rotate(${f(p.a)})`;
    at(E.t, { transform: t }); at(E.tO, { transform: t }); at(E.h, { transform: `translate(${f(p.x)} 0)` });
  }
});

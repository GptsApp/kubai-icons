import { defineIcon, f, OL, R, rp, rr, circ, at } from '../packages/core/src/kit.js';

const ARM = rr(-1.5, -1.5, 3, 9.6, 1.5);

export default defineIcon({
  name: 'person-standing',
  zh: '站立的人',
  category: 'people',
  tags: ['person', 'human', 'figure', 'body', 'stand', 'pedestrian', '人'],
  // A standing figure; on hover it raises one arm and waves.
  svg: (u) => {
    const torso = rp(R(11.8, 10.8, 7.4, 6.8), [3, 3, 0.6, 0.6]);
    const legL = rr(12, 14.6, 3.5, 9.4, 1.75), legR = rr(15.5, 14.6, 3.5, 9.4, 1.75);
    const arm = (n) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="${n}"><path d="${ARM}" fill="${u.loS}"/></g></g></g><g data-n="${n}o"><path d="${ARM}" ${OL}/></g>`;
    return `${arm('al')}${arm('ar')}
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${legL}" fill="${u.loS}"/></g></g><path d="${legL}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${legR}" fill="${u.loS}"/></g></g><path d="${legR}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${torso}" fill="${u.loS}"/></g></g><path d="${torso}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 4, 2.9)}" fill="${u.upS}"/></g></g><path d="${circ(15.5, 4, 2.9)}" ${OL}/>`;
  },
  target: (h) => ({ ar: h ? -150 : -14 }),
  draw(p, E) {
    const l = 'translate(11.2 12.2) rotate(14)', r = `translate(19.8 12.2) rotate(${f(p.ar)})`;
    at(E.al, { transform: l }); at(E.alo, { transform: l });
    at(E.ar, { transform: r }); at(E.aro, { transform: r });
  }
});

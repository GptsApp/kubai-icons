import { defineIcon, f, OL, DEEP, rr, circ, at } from '../packages/core/src/kit.js';

const CASE = rr(4, 2.4, 18.4, 18.4, 6.4);

export default defineIcon({
  name: 'tape-measure',
  zh: '卷尺',
  category: 'tools',
  tags: ['measure', 'tape', 'length', 'size', '测量'],
  // A tape measure; on hover more tape is pulled out by its hook.
  svg: (u) => `<g data-n="tp"><g filter="${u.hi}"><path data-n="tf" fill="${u.upS}"/></g><path data-n="to" ${OL}/>
      <path data-n="hk" fill="${u.loS}"/><path data-n="hko" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${CASE}" fill="${u.loS}"/></g></g><path d="${CASE}" ${OL}/>
    <g filter="${u.hi}"><path d="${circ(13.2, 11.6, 5)}" fill="${u.upS}"/></g><path d="${circ(13.2, 11.6, 5)}" ${OL}/>
    <path d="${circ(13.2, 11.6, 1.5)}" ${DEEP}/>`,
  target: (h) => ({ x: h ? 26.4 : 22.6 }),
  draw(p, E) {
    const tape = rr(14, 17.2, p.x - 14, 3.6, 0.4), hook = rr(p.x - 0.6, 15.2, 2.6, 7.6, 0.8);
    at(E.tf, { d: tape }); at(E.to, { d: tape }); at(E.hk, { d: hook }); at(E.hko, { d: hook });
  }
});

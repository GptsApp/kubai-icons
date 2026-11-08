import { defineIcon, OL, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'circle',
  zh: '圆形',
  category: 'shapes',
  tags: ['round', 'dot', 'ring', 'shape', '圆'],
  // A disc with a lighter disc inset; on hover the inner disc swells.
  svg: (u) => {
    const disc = circ(15.5, 12.5, 11.5);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${disc}" fill="${u.loS}"/></g></g><path d="${disc}" ${OL}/>
      <g filter="${u.hi}"><path data-n="i" fill="${u.upS}"/></g><path data-n="iO" ${OL}/>`;
  },
  target: (h) => ({ r: h ? 7.2 : 5.6 }),
  draw(p, E) { const d = circ(15.5, 12.5, p.r); at(E.i, { d }); at(E.iO, { d }); }
});

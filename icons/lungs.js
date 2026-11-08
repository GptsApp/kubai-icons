import { defineIcon, f, OL, DEEPS, scaleAt, at } from '../packages/core/src/kit.js';

// The left lung; the right one is its mirror image.
const LOBE = 'M13.4 7.4C13.4 5.4 12 4.6 10.6 5.2C7 6.6 4.4 11.6 4.4 17.4C4.4 20.6 6.4 22.4 9.2 21.8C11.4 21.4 13.4 20.4 13.4 18.2Z';
const MIRROR = 'translate(31 0) scale(-1 1)';

export default defineIcon({
  name: 'lungs',
  zh: '肺',
  category: 'health',
  tags: ['lungs', 'breathe', 'respiratory', 'breath', 'pulmonary', '呼吸', '肺部'],
  // A pair of lungs on the windpipe; on hover they fill with a breath and swell.
  svg: (u) => `<path d="M15.5 2.2V10.6M15.5 9.6Q15.5 12.2 12 13.2M15.5 9.6Q15.5 12.2 19 13.2" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g data-n="l"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${LOBE}" fill="${u.loS}"/></g></g><path d="${LOBE}" ${OL}/></g>
    <g data-n="r"><g transform="${MIRROR}"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${LOBE}" fill="${u.upS}"/></g></g><path d="${LOBE}" ${OL}/></g></g>`,
  target: (h) => ({ s: h ? 1.07 : 1 }),
  draw(p, E) {
    at(E.l, { transform: scaleAt(p.s, 13.4, 6) });
    at(E.r, { transform: scaleAt(p.s, 17.6, 6) });
  }
});

import { defineIcon, f, OL, DEEPS, ellipse, at } from '../packages/core/src/kit.js';

const SHELL = 'M4.9 11.4V19.2A10.6 3.4 0 0 0 26.1 19.2V11.4Z';
const HEAD = ellipse(15.5, 11.4, 10.6, 3.4);

export default defineIcon({
  name: 'drum',
  zh: '鼓',
  category: 'media',
  tags: ['snare', 'drumsticks', 'percussion', 'beat', 'instrument', '打击乐'],
  // A snare drum with two sticks raised above it; on hover the sticks come down on the head.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${SHELL}" fill="${u.loS}"/></g></g><path d="${SHELL}" ${OL}/>
    <path d="M8.4 16.6L11.95 20.2L15.5 16.6L19.05 20.2L22.6 16.6" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" stroke="#fff" data-w="stroke"/>
    <g filter="${u.hi}"><path d="${HEAD}" fill="${u.upS}"/></g><path d="${HEAD}" ${OL}/>
    <path data-n="l" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <path data-n="r" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ a: h ? 0 : 1 }),
  draw(p, E) {
    // The sticks pivot at their butts; at rest the tips hang 2 above the head's outline.
    const tip = (x0, y0, sx) => {
      const ang = (32 + 16 * p.a) * Math.PI / 180, len = 9.4;
      return `M${f(x0)} ${f(y0)}L${f(x0 + sx * len * Math.cos(ang))} ${f(y0 + len * Math.sin(ang))}`;
    };
    at(E.l, { d: tip(4.6, 0.4, 1) }); at(E.r, { d: tip(26.4, 0.4, -1) });
  }
});

import { defineIcon, f, OL, rp, circ, frontPiece, at } from '../packages/core/src/kit.js';

const DISC = [15.5, 12.5, 11.5];

export default defineIcon({
  name: 'reply',
  zh: '回复',
  category: 'communication',
  tags: ['answer', 'respond', 'back', 'arrow', 'return', '回应'],
  // A round tile with a curved arrow turning back; on hover the arrow heads further back.
  svg: (u) => {
    const seg = frontPiece(DISC, DISC, 17.4, 2);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 11.5)}" fill="${u.loS}"/></g></g><path d="${circ(15.5, 12.5, 11.5)}" ${OL}/>
      <g data-n="ar"><path d="M12.6 9.4H17.2Q21.4 9.4 21.4 13.4V14.2" fill="none" stroke-width="2.2" stroke-linecap="round" stroke="#fff" data-w="stroke"/>
        <path d="${rp([[13.6, 5.4], [8, 9.4], [13.6, 13.4]], [0.5, 0.6, 0.5])}" fill="#fff" data-w="fill"/></g>
      <g filter="${u.hi}"><path d="${seg}" fill="${u.upS}"/></g><path d="${seg}" ${OL}/>`;
  },
  target: (h) => ({ x: h ? -2.2 : 0 }),
  draw(p, E) { at(E.ar, { transform: `translate(${f(p.x)} 0)` }); }
});

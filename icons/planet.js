import { defineIcon, f, OL, circ, ellipse, rattle, clamp01, at } from '../packages/core/src/kit.js';

const RING = ellipse(0, 0, 12.6, 4.4) + ellipse(0, 0, 10, 2.4);

export default defineIcon({
  name: 'planet',
  zh: '行星',
  category: 'nature',
  tags: ['saturn', 'space', 'universe', 'orbit', 'astronomy', '土星', '宇宙'],
  // A planet inside a lighter ring; on hover the ring rocks on its tilt and settles.
  svg: (u) => `<clipPath id="${u.id('fr')}"><path d="M-14 0H14V6H-14Z"/></clipPath>
    <g filter="${u.hi}"><g data-n="r1"><path d="${RING}" fill-rule="evenodd" fill="${u.upS}"/></g></g><g data-n="r1O"><path d="${RING}" fill-rule="evenodd" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 7.8)}" fill="${u.loS}"/></g></g><path d="${circ(15.5, 12.5, 7.8)}" ${OL}/>
    <g filter="${u.hi}"><g data-n="r2"><g clip-path="url(#${u.id('fr')})"><path d="${RING}" fill-rule="evenodd" fill="${u.upS}"/></g></g></g>
    <g data-n="r2O"><g clip-path="url(#${u.id('fr')})"><path d="${RING}" fill-rule="evenodd" ${OL}/></g></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const t = `translate(15.5 12.5) rotate(${f(-20 + rattle(clamp01(p.o), 12, 2))})`;
    ['r1', 'r1O', 'r2', 'r2O'].forEach((n) => at(E[n], { transform: t }));
  }
});

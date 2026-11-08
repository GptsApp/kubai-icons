import { defineIcon, KR, f, OL, DEEP, DEEPS, SOFT, R, rp, rr, circ, at, rattle, clamp01 } from '../packages/core/src/kit.js';

const C = [15.5, 15];

export default defineIcon({
  name: 'washing-machine',
  zh: '洗衣机',
  category: 'home',
  tags: ['laundry', 'washer', 'clothes', 'wash', 'appliance', '洗衣'],
  variants: ['clock', 'check', 'cog'],
  // A front-loading washer; on hover its drum spins the water once round while the machine
  // shakes on its feet, then both settle.
  svg: (u) => {
    const body = rr(6.3, 1, 18.4, 23, KR), panel = rp(R(6.3, 1, 18.4, 5), [KR, KR, 0, 0]), door = circ(C[0], C[1], 6);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="m0" d="${body}" fill="${u.loS}"/></g></g><path data-n="m1" d="${body}" ${OL}/>
      <g filter="${u.hi}"><path data-n="m2" d="${panel}" fill="${u.upS}"/></g><path data-n="m3" d="${panel}" ${OL}/>
      <circle data-n="m4" cx="10.2" cy="3.6" r="1.3" ${DEEP}/><path data-n="m5" d="M15.6 3.6H20.8" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.hi}"><path data-n="m6" d="${door}" fill="${u.upS}"/></g><path data-n="m7" d="${door}" ${OL}/>
      <clipPath id="${u.id('drum')}"><path d="${circ(C[0], C[1], 3.9)}"/></clipPath>
      <path data-n="m8" d="${circ(C[0], C[1], 3.9)}" fill="#fff"/>
      <g data-n="m9" clip-path="url(#${u.id('drum')})"><path data-n="water" d="${rr(9, 15.4, 13, 6, 0)}" ${SOFT}/></g>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), x = rattle(o, 0.8, 5);
    const t = Math.abs(x) < 1e-4 ? '' : `translate(${f(x)} 0)`;
    for (let i = 0; i < 10; i++) t ? E['m' + i].setAttribute('transform', t) : E['m' + i].removeAttribute('transform');
    at(E.water, { transform: `rotate(${f(360 * o + rattle(o, 24, 2))} ${C[0]} ${C[1]})` });
  }
});

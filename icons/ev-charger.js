import { defineIcon, KR, CR, f, OL, DEEP, DEEPS, SOFT, R, rp, rr, at, scaleAt, clamp01 } from '../packages/core/src/kit.js';

const SCREEN = rr(8.4, 4.4, 7.6, 8.6, CR);

export default defineIcon({
  name: 'ev-charger',
  zh: '充电桩',
  category: 'transport',
  tags: ['charging station', 'electric vehicle', 'ev', 'charge', 'plug', '新能源', '充电'],
  variants: ['check', 'clock', 'alert'],
  // A charging post with its plug on a cable; on hover the plug rises on its cable, the charge
  // rises on its screen and the bolt on it swells with a pulse.
  svg: (u) => {
    const body = rr(5.8, 2, 12.8, 21.6, KR), plug = rp(R(22.2, 5, 4, 5), [1, 1, 1.4, 1.4]);
    const bolt = rp([[13.9, 5.4], [9.8, 9.8], [12.3, 9.8], [11, 12.4], [15, 7.9], [12.6, 7.9]], 0.3);
    return `<path data-n="cab" d="M18 17.6H21.8Q24.2 17.6 24.2 15.2V9.6" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      <path data-n="pins" d="M23.2 5V2.8M25.2 5V2.8" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.hi}"><path data-n="pl" d="${plug}" fill="${u.upS}"/></g><path data-n="plO" d="${plug}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.lo(21.6)}"/></g></g><path d="${body}" ${OL}/>
      <clipPath id="${u.id('sc')}"><path d="${SCREEN}"/></clipPath>
      <path d="${SCREEN}" fill="#fff"/>
      <g clip-path="url(#${u.id('sc')})"><path data-n="lv" ${SOFT}/></g>
      <path data-n="bolt" d="${bolt}" ${DEEP}/>`;
  },
  target: (h) => ({ lv: h ? 8.6 : 2.6, py: h ? -2.8 : 0 }),
  draw(p, E) {
    const y = p.py, plug = rp(R(22.2, 5 + y, 4, 5), [1, 1, 1.4, 1.4]);
    at(E.pl, { d: plug }); at(E.plO, { d: plug });
    at(E.pins, { d: `M23.2 ${f(5 + y)}V${f(2.8 + y)}M25.2 ${f(5 + y)}V${f(2.8 + y)}` });
    at(E.cab, { d: `M18 17.6H21.8Q24.2 17.6 24.2 15.2V${f(9.6 + y)}` });
    at(E.lv, { d: rp(R(8.4, 13 - p.lv, 7.6, p.lv + 1), 0) });
    const k = 1 + 0.3 * Math.sin(Math.PI * clamp01((p.lv - 2.6) / 6));
    if (Math.abs(k - 1) < 1e-4) E.bolt.removeAttribute('transform'); else at(E.bolt, { transform: scaleAt(k, 12.4, 8.9) });
  }
});

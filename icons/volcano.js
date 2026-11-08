import { defineIcon, KR, f, OL, DEEP, rp, cloud, clamp01, at } from '../packages/core/src/kit.js';

const CONE = rp([[11.4, 9.2], [19.6, 9.2], [28.2, 23.6], [2.8, 23.6]], [1.2, 1.2, KR, KR]);
const PUFF = cloud([12.4, 6.4, 2.8], [15.8, 4.2, 3.6], [19, 6.6, 2.6]);

export default defineIcon({
  name: 'volcano',
  zh: '火山',
  category: 'nature',
  tags: ['volcano', 'eruption', 'lava', 'mountain', 'disaster', '喷发'],
  // A volcano with lava down its side and lighter smoke over the crater; on hover the
  // smoke billows up and the lava runs further.
  svg: (u) => `<clipPath id="${u.id('vc')}"><path d="${CONE}"/></clipPath>
    <g filter="${u.hi}"><g data-n="pf"><path d="${PUFF}" fill="${u.upS}"/></g></g><g data-n="pfO"><path d="${PUFF}" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${CONE}" fill="${u.loS}"/></g></g>
    <path d="${CONE}" stroke-linejoin="round" ${OL}/>
    <path data-n="lv" clip-path="url(#${u.id('vc')})" ${DEEP}/>`,
  target: (h) => ({ s: h ? 1 : 0 }),
  draw(p, E) {
    const s = clamp01(p.s), t = `translate(15.6 ${f(8.8 - 1 * s)}) scale(${f(1 + 0.16 * s)}) translate(-15.6 -8.8)`;
    at(E.pf, { transform: t }); at(E.pfO, { transform: t });
    const a = 13.2 + 3 * s, b = 16.4 + 3.6 * s;
    const d = `M10.4 8H20.6V9.8L19 ${f(b - 2.2)}A1.6 1.6 0 0 1 15.8 ${f(b - 2.2)}L15.4 ${f(a - 2)}A1.6 1.6 0 0 1 12.2 ${f(a - 2)}L11.6 9.8Z`;
    at(E.lv, { d });
  }
});

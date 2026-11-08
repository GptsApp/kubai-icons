import { defineIcon, f, OL, rp, circ, at } from '../packages/core/src/kit.js';

// A rosette with twelve rounded points, centred on the origin.
const ROSETTE = rp(Array.from({ length: 24 }, (_, i) => {
  const a = i * Math.PI / 12, r = i % 2 ? 9.9 : 11.8;
  return [Math.sin(a) * r, -Math.cos(a) * r];
}), 1.3);

export default defineIcon({
  name: 'badge-percent',
  zh: '折扣',
  category: 'commerce',
  tags: ['discount', 'sale', 'offer', 'coupon', 'promotion', 'percent', '优惠', '促销'],
  variants: ['plus', 'check', 'x', 'clock'],
  // A discount seal with a percent sign; on hover the seal turns one point.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="r1"><path d="${ROSETTE}" fill="${u.loS}"/></g></g></g>
    <g data-n="r2"><path d="${ROSETTE}" ${OL}/></g>
    <g filter="${u.hi}"><path d="${circ(15.5, 12.5, 7.6)}" fill="${u.upS}"/></g><path d="${circ(15.5, 12.5, 7.6)}" ${OL}/>
    <path d="M18.6 9.2L12.4 15.8" fill="none" stroke-width="2.2" stroke-linecap="round" data-t="stroke:#2F6FE0"/>
    <path d="${circ(12.3, 9.3, 1.6) + circ(18.7, 15.7, 1.6)}" data-t="fill:#2F6FE0"/>`,
  target: (h) => ({ a: h ? 30 : 0 }),
  draw(p, E) {
    const t = `translate(15.5 12.5) rotate(${f(p.a)})`;
    at(E.r1, { transform: t }); at(E.r2, { transform: t });
  }
});

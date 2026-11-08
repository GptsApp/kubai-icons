import { defineIcon, f, OL, DEEPS, rr, at, clamp01 } from '../packages/core/src/kit.js';

const BODY = rr(-3.4, -4.6, 6.8, 9.2, 1.6), PANEL = rr(-12.2, -3.6, 7, 7.2, 1.2) + rr(5.2, -3.6, 7, 7.2, 1.2);
const DISH = 'M-3.8 -7.6A3.8 2.8 0 0 0 3.8 -7.6Z';
const wave = (r) => `M${f(-r * Math.sin(0.7))} ${f(-10 - r * Math.cos(0.7))}A${r} ${r} 0 0 1 ${f(r * Math.sin(0.7))} ${f(-10 - r * Math.cos(0.7))}`;

export default defineIcon({
  name: 'satellite',
  zh: '卫星',
  category: 'science',
  tags: ['space', 'orbit', 'signal', 'broadcast', '航天', '信号'],
  // A satellite with two solar panels and a dish; on hover it turns a little and sends a signal.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="g1">
      <path d="${PANEL}" fill="${u.loS}"/><path d="${DISH}" fill="${u.upS}"/><path d="${BODY}" fill="${u.upS}"/></g></g></g>
    <g data-n="g2"><path d="${PANEL}" ${OL}/><path d="${DISH}" ${OL}/><path d="${BODY}" ${OL}/>
      <path d="M-5.2 0H-3.4M3.4 0H5.2M0 -4.6V-7.6" fill="none" stroke-width="1.6" ${DEEPS}/>
      <path d="M-8.7 -3.6V3.6M8.7 -3.6V3.6" fill="none" stroke-width="1.6" stroke="#fff" data-w="stroke"/>
      <path data-n="w" d="${wave(2.4) + wave(5)}" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/></g>`,
  target: (h) => ({ a: h ? -38 : -45, w: h ? 1 : 0 }),
  draw(p, E) {
    const t = `translate(15.9 13.2) rotate(${f(p.a)})`;
    at(E.g1, { transform: t }); at(E.g2, { transform: t });
    at(E.w, { opacity: f(clamp01(p.w)), transform: `translate(0 ${f(1.4 * (1 - p.w))})` });
  }
});

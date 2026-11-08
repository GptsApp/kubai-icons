import { defineIcon, f, OL, rp, at } from '../packages/core/src/kit.js';
import { MARK, tick } from './_interface.js';

// A scalloped seal: sixteen points alternating between two radii.
const SEAL = rp(Array.from({ length: 16 }, (_, i) => {
  const a = i * Math.PI / 8, r = i % 2 ? 9.6 : 11.8;
  return [15.5 + r * Math.sin(a), 12.5 - r * Math.cos(a)];
}), 2.2);

export default defineIcon({
  name: 'badge',
  zh: '认证',
  category: 'interface',
  tags: ['verified', 'badge-check', 'seal', 'rosette', 'certified', 'approved', '徽章'],
  // A seal of approval that turns on hover while its tick stays upright.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="seal"><path d="${SEAL}" fill="${u.loS}"/></g></g></g>
    <g data-n="sealO"><path d="${SEAL}" ${OL}/></g>
    <path d="${tick(0.95)}" ${MARK}/>`,
  target: (h) => ({ rot: h ? 45 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(p.rot)} 15.5 12.5)`;
    at(E.seal, { transform: t }); at(E.sealO, { transform: t });
  }
});

import { defineIcon, KR, f, OL, rr, rp, clamp01, at } from '../packages/core/src/kit.js';

const BODY = rr(12.6, 4, 5.8, 16, 2.9) + rr(6.4, 7.6, 4.4, 8.8, 2.2) + rr(6.4, 12, 8, 4.4, 2.2) + rr(20.6, 5.4, 4.4, 7.6, 2.2) + rr(16.6, 8.6, 8.4, 4.4, 2.2);
const POT = rp([[8.6, 18.6], [22.4, 18.6], [21, 24], [10, 24]], [1.6, 1.6, KR, KR]);
const BLOOM = Array.from({ length: 5 }, (_, i) => {
  const a = i * 72 * Math.PI / 180, x = 1.8 * Math.sin(a), y = -1.8 * Math.cos(a);
  return `M${f(x + 1.9)} ${f(y)}A1.9 1.9 0 1 1 ${f(x - 1.9)} ${f(y)}A1.9 1.9 0 1 1 ${f(x + 1.9)} ${f(y)}Z`;
}).join('');

export default defineIcon({
  name: 'cactus',
  zh: '仙人掌',
  category: 'nature',
  tags: ['cactus', 'desert', 'plant', 'succulent', 'houseplant', '多肉'],
  // A potted cactus with two arms; on hover a flower opens on its top.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g><path d="${BODY}" ${OL}/>
    <g filter="${u.hi}"><g data-n="bl"><path d="${BLOOM}" fill="${u.upS}"/></g></g><g data-n="blO"><path d="${BLOOM}" ${OL}/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${POT}" fill="${u.upS}"/></g></g><path d="${POT}" ${OL}/>`,
  target: (h) => ({ s: h ? 1 : 0 }),
  draw(p, E) {
    const s = Math.max(0.001, clamp01(p.s)), t = `translate(15.5 4.2) scale(${f(s)}) rotate(${f(40 * (1 - s))})`;
    at(E.bl, { transform: t }); at(E.blO, { transform: t, opacity: f(clamp01(s * 3)) });
  }
});

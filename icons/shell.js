import { defineIcon, KR, f, OL, WHITES, R, rp, rattle, clamp01, at } from '../packages/core/src/kit.js';

const H = [15.5, 20.8], RAD = 15.6, A0 = -142, A1 = -38, LOBES = 5;
const pt = (a, r = RAD) => [H[0] + r * Math.cos(a * Math.PI / 180), H[1] + r * Math.sin(a * Math.PI / 180)];
const FAN = (() => {
  let d = `M${f(H[0] - 1.4)} ${f(H[1])}L${pt(A0).map(f).join(' ')}`;
  for (let i = 1; i <= LOBES; i++) d += `A3.2 3.2 0 0 1 ${pt(A0 + (A1 - A0) * i / LOBES).map(f).join(' ')}`;
  return d + `L${f(H[0] + 1.4)} ${f(H[1])}Z`;
})();
const EARS = rp(R(11.2, 17.8, 8.6, 4.6), [1.6, 1.6, KR, KR]);
const RIBS = [-114, -66].map((a) => `M${pt(a, 5.8).map(f).join(' ')}L${pt(a, 12.6).map(f).join(' ')}`).join('');

export default defineIcon({
  name: 'shell',
  zh: '贝壳',
  category: 'nature',
  tags: ['seashell', 'scallop', 'beach', 'ocean', 'sea', '海滩'],
  // A scallop shell with lighter ears at its hinge; on hover it rocks on its hinge and settles.
  svg: (u) => `<g data-n="g">
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${FAN}" fill="${u.loS}"/></g></g><path d="${FAN}" stroke-linejoin="round" ${OL}/>
    <path d="${RIBS}" class="ln" ${WHITES}/>
    <g filter="${u.hi}"><path d="${EARS}" fill="${u.upS}"/></g><path d="${EARS}" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(rattle(clamp01(p.o), 9, 3))} 15.5 22.4)` }); }
});

import { defineIcon, f, OL, rp, at } from '../packages/core/src/kit.js';

// A cube seen from above at a fixed elevation, turned about its vertical axis.
const A = 7.2, KY = 0.86, KZ = 0.5, CX = 15.5, CY = 12.6;
const proj = (x, y, z, t) => {
  const c = Math.cos(t), s = Math.sin(t), X = x * c + z * s, Z = -x * s + z * c;
  return [CX + X, CY - y * KY + Z * KZ];
};

export default defineIcon({
  name: 'cube',
  zh: '立方体',
  category: 'development',
  tags: ['3d', 'model', 'box', 'object', 'package', 'module', '模型'],
  variants: ['plus', 'minus', 'check', 'x', 'search', 'sparkle'],
  // A cube; on hover it turns a quarter about its vertical axis.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="L" fill="${u.loS}"/></g></g><path data-n="Lo" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="R" fill="${u.pure('#6BA2FF')}"/></g></g><path data-n="Ro" ${OL}/>
    <g filter="${u.hi}"><path data-n="T" fill="${u.upS}"/></g><path data-n="To" ${OL}/>`,
  target: (h) => ({ a: h ? 135 : 45 }),
  draw(p, E) {
    const t = p.a * Math.PI / 180;
    // Corners of the top square, in turn round the cube.
    const ring = [[-A, -A], [A, -A], [A, A], [-A, A]];
    const top = ring.map(([x, z]) => proj(x, A, z, t)), bot = ring.map(([x, z]) => proj(x, -A, z, t));
    const faces = [0, 1, 2, 3].map((i) => {
      const j = (i + 1) % 4, mx = (ring[i][0] + ring[j][0]) / 2, mz = (ring[i][1] + ring[j][1]) / 2;
      const nz = -mx * Math.sin(t) + mz * Math.cos(t);
      return { i, j, nz, sx: (top[i][0] + top[j][0]) / 2 };
    }).filter((q) => q.nz > 1e-3).sort((a, b) => a.sx - b.sx);
    const face = (q) => (q ? rp([top[q.i], top[q.j], bot[q.j], bot[q.i]], 1) : 'M0 0');
    const l = face(faces[0]), r = face(faces[1]), tp = rp(top, 1.2);
    at(E.L, { d: l }); at(E.Lo, { d: l }); at(E.R, { d: r }); at(E.Ro, { d: r }); at(E.T, { d: tp }); at(E.To, { d: tp });
  }
});

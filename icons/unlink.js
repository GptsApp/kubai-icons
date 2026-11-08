import { defineIcon, f, OL, DEEPS, capsuleRing, at } from '../packages/core/src/kit.js';

const RING = capsuleRing(11.6, 9.2, 2.8);
const ring = (u, n, fill) => `<g data-n="${n}"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${RING}" fill-rule="evenodd" fill="${fill}"/></g></g><path d="${RING}" fill-rule="evenodd" ${OL}/></g>`;

export default defineIcon({
  name: 'unlink',
  zh: '取消链接',
  category: 'interface',
  tags: ['unlink', 'break link', 'remove link', 'disconnect', 'chain', '断开链接'],
  // Two links of a chain broken apart, with marks at the break; on hover they pull further apart.
  svg: (u) => `<g transform="rotate(-45 15.5 12.5)">${ring(u, 'a', u.loS)}${ring(u, 'b', u.upS)}
    <path data-n="k" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/></g>`,
  target: (h) => ({ g: h ? 8.4 : 7.8 }),
  draw(p, E) {
    at(E.a, { transform: `translate(${f(15.5 - p.g)} 12.5)` });
    at(E.b, { transform: `translate(${f(15.5 + p.g)} 12.5)` });
    const t = p.g - 7.8;
    at(E.k, { d: `M15.5 ${f(8.6 - t)}V${f(6 - t)}M15.5 ${f(16.4 + t)}V${f(19 + t)}` });
  }
});

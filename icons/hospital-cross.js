import { defineIcon, f, OL, rp, at, clamp01 } from '../packages/core/src/kit.js';

const plus = (w, l, ro, ri) => rp([[-w, -l], [w, -l], [w, -w], [l, -w], [l, w], [w, w], [w, l], [-w, l], [-w, w], [-l, w], [-l, -w], [-w, -w]].map(([x, y]) => [15.5 + x, 12.5 + y]), [ro, ro, ri, ro, ro, ri, ro, ro, ri, ro, ro, ri]);
const OUTER = plus(3.7, 10.3, 2.2, 1.2), INNER = plus(1.7, 6.2, 1, 0.6);

export default defineIcon({
  name: 'hospital-cross',
  zh: '医疗',
  category: 'health',
  tags: ['hospital', 'medical', 'cross', 'clinic', 'pharmacy', 'health', '医院'],
  variants: ['plus', 'check', 'alert'],
  // A medical cross sign; on hover it lights up, its inner cross turning bright white.
  svg: (u) => `<g data-n="g">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${OUTER}" fill="${u.loS}"/></g></g><path d="${OUTER}" ${OL}/>
      <g filter="${u.hi}"><path d="${INNER}" fill="${u.upS}"/></g>
      <path data-n="lit" d="${INNER}" fill="#fff" data-w="fill" opacity="0"/>
    </g>`,
  target: (h) => ({ o: h ? 1 : 0, s: h ? 1.06 : 1 }),
  draw(p, E) {
    at(E.lit, { opacity: f(clamp01(p.o)) });
    at(E.g, { transform: `translate(15.5 12.5) scale(${f(p.s)}) translate(-15.5 -12.5)` });
  }
});

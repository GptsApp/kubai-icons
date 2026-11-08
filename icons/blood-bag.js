import { defineIcon, f, OL, DEEP, DEEPS, WHITE, rr, clamp01, at } from '../packages/core/src/kit.js';
import { solid } from './_b5-parts.js';

const CX = 14.6, BX = 6.6, BY = 1, BW = 16, BH = 16.8;
const BODY = rr(BX, BY, BW, BH, 3.2);
const DROP = `M${CX} 6.8C${CX + 0.9} 8.6 ${CX + 3.9} 9.9 ${CX + 3.9} 12.4A3.9 3.9 0 0 1 ${CX - 3.9} 12.4C${CX - 3.9} 9.9 ${CX - 0.9} 8.6 ${CX} 6.8Z`;
const TUBE = `M${CX} 17V18.8C${CX} 20.8 ${CX + 1.2} 21.9 ${CX + 3.2} 21.9H23`;
const ROUTE = [[CX, 16], [CX, 19], [CX + 1, 21.1], [CX + 3.2, 21.9], [26, 21.9]];

/** The point a share t of the way along the tube's route. */
const along = (t) => {
  const seg = ROUTE.slice(1).map((q, i) => Math.hypot(q[0] - ROUTE[i][0], q[1] - ROUTE[i][1]));
  let d = t * seg.reduce((a, b) => a + b);
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i]) {
      const k = d / seg[i], [a, b] = [ROUTE[i], ROUTE[i + 1]];
      return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    }
    d -= seg[i];
  }
  return ROUTE[ROUTE.length - 1];
};

export default defineIcon({
  name: 'blood-bag',
  zh: '血袋',
  category: 'health',
  tags: ['transfusion', 'blood', 'donation', 'plasma', 'iv bag', '输血', '献血'],
  variants: ['plus', 'alert'],
  // A blood bag with a hanging slot and a line curving to a connector; on hover the level falls as blood runs along the line.
  svg: (u) => `<clipPath id="${u.id('bg')}"><path d="${BODY}"/></clipPath>
    <path d="${TUBE}" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
    <circle data-n="dp" r="2" ${DEEP}/>
    ${solid(u, rr(21.6, 20.1, 5.8, 3.6, 1.2), u.upS)}
    <g filter="${u.sh}"><path d="${BODY}" fill="${u.upS}"/></g>
    <g clip-path="url(#${u.id('bg')})"><g filter="${u.hi}"><path data-n="lq" fill="${u.loS}"/></g></g>
    <path d="${BODY}" ${OL}/>
    <path d="${rr(CX - 3.4, 2.8, 6.8, 2.6, 1.3)}" fill="#fff"/>
    <path d="${DROP}" ${WHITE}/>`,
  target: (h) => ({ y: h ? 11.4 : 6.2, d: h ? 1 : 0 }),
  draw(p, E) {
    at(E.lq, { d: rr(BX - 1, p.y, BW + 2, 20, 0) });
    const [x, y] = along(clamp01(p.d));
    at(E.dp, { cx: f(x), cy: f(y) });
  }
});

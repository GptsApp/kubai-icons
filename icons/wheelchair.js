import { defineIcon, f, OL, DEEP, DEEPS, rr, circ, at } from '../packages/core/src/kit.js';

const CHAIR = rr(6.6, 1.6, 3.6, 11, 1.6) + rr(6.6, 9.2, 13.8, 3.4, 1.6);
const WX = 12.6, WY = 16;
const SPOKES = [0, 120, 240].map((a) => { const r = a * Math.PI / 180; return `M${WX} ${WY}L${f(WX + 4.6 * Math.sin(r))} ${f(WY - 4.6 * Math.cos(r))}`; }).join('');

export default defineIcon({
  name: 'wheelchair',
  zh: '轮椅',
  category: 'health',
  tags: ['accessibility', 'accessible', 'disability', 'mobility', '无障碍'],
  // A wheelchair seen from the side; on hover it rolls forward, its wheel turning.
  svg: (u) => `<g data-n="g">
      <path d="M18.6 11L21.4 19.4H24.6" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${CHAIR}" fill="${u.loS}"/></g></g><path d="${CHAIR}" ${OL}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(WX, WY, 7)}" fill="${u.upS}"/></g></g><path d="${circ(WX, WY, 7)}" ${OL}/>
      <path d="${circ(WX, WY, 4.6)}" fill="#fff"/>
      <path data-n="sp" d="${SPOKES}" class="ln" ${DEEPS}/>
      <circle cx="${WX}" cy="${WY}" r="1.6" ${DEEP}/>
    </g>`,
  target: (h) => ({ x: h ? 0.8 : -0.4, a: h ? 120 : 0 }),
  draw(p, E) {
    at(E.g, { transform: `translate(${f(p.x)} 0)` });
    at(E.sp, { transform: `rotate(${f(p.a)} ${WX} ${WY})` });
  }
});

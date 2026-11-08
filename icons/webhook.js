import { defineIcon, f, OL, DEEPS, circ, at } from '../packages/core/src/kit.js';

// Three nodes on a circle, each hooked to the next by an arc.
const RING = 8.2, NODE = 3.2;
const pt = (a) => [15.5 + RING * Math.sin(a * Math.PI / 180), 13 - RING * Math.cos(a * Math.PI / 180)];

export default defineIcon({
  name: 'webhook',
  zh: '网络钩子',
  category: 'development',
  tags: ['webhook', 'callback', 'event', 'integration', 'trigger', '回调'],
  variants: ['plus', 'check', 'x', 'bolt'],
  // Three event nodes chained round a loop; on hover the events pass a step round.
  svg: (u) => `<g data-n="g"><path d="${[0, 120, 240].map((a) => { const s = pt(a + 30), e = pt(a + 90); return `M${f(s[0])} ${f(s[1])}A${RING} ${RING} 0 0 1 ${f(e[0])} ${f(e[1])}`; }).join('')}" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    ${[0, 120, 240].map((a, i) => { const c = pt(a); return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(c[0], c[1], NODE)}" fill="${i ? u.loS : u.upS}"/></g></g><path d="${circ(c[0], c[1], NODE)}" ${OL}/>`; }).join('')}</g>`,
  target: (h) => ({ a: h ? 120 : 0 }),
  draw(p, E) { at(E.g, { transform: `rotate(${f(p.a)} 15.5 13)` }); }
});

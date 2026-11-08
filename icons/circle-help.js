import { defineIcon, f, OL, circ, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'circle-help',
  zh: '帮助',
  category: 'interface',
  tags: ['help', 'question', 'faq', 'support'],
  // A help badge whose question mark bobs up and tilts its head on hover.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(15.5, 12.5, 11.5)}" fill="${u.loS}"/></g></g>
    <path d="${circ(15.5, 12.5, 11.5)}" ${OL}/>
    <g data-n="q"><text x="15.5" y="18.4" text-anchor="middle" font-size="16" font-weight="700" fill="#fff" data-w="fill">?</text></g>`,
  target: (h) => ({ y: h ? -1.6 : 0, a: h ? 18 : 0 }),
  draw(p, E) { at(E.q, { transform: `translate(0 ${f(p.y)}) rotate(${f(p.a)} 15.5 12.5)` }); }
});

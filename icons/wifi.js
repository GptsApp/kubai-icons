import { defineIcon, f, DEEP, DEEPS, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'wifi',
  zh: '无线网络',
  category: 'devices',
  tags: ['wireless', 'signal', 'internet', 'network'],
  variants: ['lock', 'check', 'x', 'alert', 'cog'],
  off: true,
  // Signal arcs that fill up from the inside out on hover.
  svg: () => `<circle cx="15.5" cy="20.6" r="2" ${DEEP}/>
    <path data-n="a1" d="M11.6 16.7A5.5 5.5 0 0 1 19.4 16.7" fill="none" stroke-width="2.8" stroke-linecap="round" ${DEEPS}/>
    <path data-n="a2" d="M8 13.1A10.6 10.6 0 0 1 23 13.1" fill="none" stroke-width="2.8" stroke-linecap="round" ${DEEPS}/>
    <path data-n="a3" d="M4.4 9.5A15.7 15.7 0 0 1 26.6 9.5" fill="none" stroke-width="2.8" stroke-linecap="round" ${DEEPS}/>`,
  target: (h) => ({ s: h ? 1 : 0 }),
  draw(p, E) {
    const lit = (i) => f(0.28 + 0.72 * Math.max(0, Math.min(1, p.s * 2 - (i - 1) * 0.8)));
    at(E.a2, { opacity: lit(1) }); at(E.a3, { opacity: lit(2) });
  }
});

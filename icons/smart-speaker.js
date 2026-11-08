import { defineIcon, f, OL, DEEPS, R, rp, rr, at } from '../packages/core/src/kit.js';
import { solid, span } from './_devices.js';

export default defineIcon({
  name: 'smart-speaker',
  zh: '智能音箱',
  category: 'devices',
  tags: ['voice assistant', 'home speaker', 'assistant', 'speaker', '语音助手'],
  variants: ['plus', 'check', 'x', 'sparkle', 'cog'],
  off: true,
  // A smart speaker with a light bar on its top; on hover the bar lights up across and
  // sound waves come from its sides.
  svg: (u) => {
    const cap = rp(R(8, 3, 15, 5.6), [5, 5, 0, 0]);
    return `${solid(u, rr(8, 3, 15, 21, 5), u.loS)}
      <g filter="${u.hi}"><path d="${cap}" fill="${u.upS}"/></g><path d="${cap}" ${OL}/>
      <path data-n="bar" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <path data-n="wv" d="M4.6 10.6Q2 14.6 4.6 18.6M26.4 10.6Q29 14.6 26.4 18.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const w = 2.4 + 2.4 * span(p.o, 0, 0.6);
    at(E.bar, { d: `M${f(15.5 - w)} 5.9H${f(15.5 + w)}` });
    at(E.wv, { opacity: f(span(p.o, 0.3, 0.9)) });
  }
});

import { defineIcon, f, OL, circ, at, clamp01, bump } from '../packages/core/src/kit.js';

const SEAMS = 'M-8.6 -8C-3.2 -4.2 -3.2 4.2 -8.6 8M8.6 -8C3.2 -4.2 3.2 4.2 8.6 8';

export default defineIcon({
  name: 'baseball',
  zh: '棒球',
  category: 'sports',
  tags: ['baseball', 'softball', 'ball', 'sport', 'pitch', 'mlb', '垒球'],
  // A baseball with stitched seams; on hover it is pitched, spinning as it flies.
  svg: (u) => `<clipPath id="${u.id('bs')}"><path d="${circ(0, 0, 11.5)}"/></clipPath>
    <g data-n="g"><g filter="${u.sh}"><g filter="${u.hi}"><path d="${circ(0, 0, 11.5)}" fill="${u.upS}"/></g></g>
      <g clip-path="url(#${u.id('bs')})"><g data-n="s">
        <path d="${SEAMS}" fill="none" stroke-width="1" data-t="stroke:#2F6FE0"/>
        <path d="${SEAMS}" fill="none" stroke-width="2.8" stroke-dasharray="1 1.5" data-t="stroke:#2F6FE0"/></g></g>
      <path d="${circ(0, 0, 11.5)}" ${OL}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    at(E.g, { transform: `translate(${f(15.5 + 0.8 * bump(o))} ${f(12.5 - 1.2 * bump(o))})` });
    at(E.s, { transform: `rotate(${f(-150 * o)})` });
  }
});

import { defineIcon, f, DEEPS, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { back, liveBack, liveFront, setPath } from './_b1-home.js';
import { cubic, ribbon } from './_b2-kitchen.js';

// Strands as [side index, tip height]; the outer ones are drawn first so the inner ones lie over them.
const STRANDS = [[-2, 22.8], [2, 22.8], [0, 23.2], [-1, 24], [1, 24]];
const strand = ([i, y], push) => ribbon(cubic([15.5 + i * 2 + push, 9.6], [15.5 + i * 2.8 + push, 14], [15.5 + i * 4.7, y - 4], [15.5 + i * 4.7 + push * 0.15, y], 10), 4);

export default defineIcon({
  name: 'mop',
  zh: '拖把',
  category: 'home',
  tags: ['clean', 'floor', 'wash', 'housework', 'wet', '拖地', '打扫', '清洁'],
  // An upright string mop with fat hanging strands; on hover it pushes side to side and the strands drag behind.
  svg: (u) => `<g data-n="g"><path d="M15.5 -0.6V9" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/></g>
      ${STRANDS.map(([i], n) => (Math.abs(i) === 1 ? liveFront : liveBack)(u, `s${n}`)).join('')}
      <g data-n="cap">${back(u, rr(9.8, 6.6, 11.4, 4.2, 1.4))}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const x = rattle(clamp01(p.o), 6, 3);
    at(E.g, { transform: `translate(${f(x)} 0)` });
    at(E.cap, { transform: `translate(${f(x)} 0)` });
    STRANDS.forEach((s, n) => setPath(E, `s${n}`, strand(s, x)));
  }
});

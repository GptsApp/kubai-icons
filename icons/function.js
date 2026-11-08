import { defineIcon, f, at } from '../packages/core/src/kit.js';
import { tile, STROKE, swell, rot } from './_arrows.js';

// The f as [command, ...points] runs, so draw() can tilt it about its middle.
const F = [['M', [15.6, 7.8]], ['Q', [15.2, 6.6], [13.9, 6.8]], ['Q', [12.7, 7], [12.5, 8.6]], ['L', [11.3, 17]],
  ['Q', [11.1, 18.4], [9.6, 18.2]], ['M', [9.8, 10.8]]];
const BAR = [14.4, 10.8], FC = [12.6, 12.5];
const turn = ([x, y], a) => {
  const [rx, ry] = rot([x - FC[0], y - FC[1]], a);
  return [rx + FC[0], ry + FC[1]];
};
// Upright, the crossbar ends with H; tilted, with L to its turned end.
const fPath = (a) => F.map(([c, ...pts]) => c + pts.map((q) => turn(q, a).map(f).join(' ')).join(' ')).join('')
  + (a ? `L${turn(BAR, a).map(f).join(' ')}` : `H${BAR[0]}`);

export default defineIcon({
  name: 'function',
  zh: '函数',
  category: 'development',
  tags: ['function', 'formula', 'fx', 'math', 'expression', 'calculate', '公式'],
  // A card marked fx; on hover the f leans back as the x dips and turns a quarter
  // over, and both come back to where they started.
  svg: (u) => `${tile(u)}<path data-n="f" d="${fPath(0)}" ${STROKE}/>
    <path data-n="x" d="M-2.1 -2.1L2.1 2.1M2.1 -2.1L-2.1 2.1" ${STROKE}/>`,
  target: (h) => ({ a: h ? 90 : 0 }),
  draw(p, E) {
    const w = swell(p.a / 90);
    at(E.f, { d: fPath(-8 * w) });
    at(E.x, { transform: `translate(${f(18.9 - 0.15 * w)} ${f(14.4 + w)}) rotate(${f(p.a)})` });
  }
});

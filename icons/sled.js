import { defineIcon, f, DEEPS, rr } from '../packages/core/src/kit.js';
import { layer, band, moveAll } from './_science-edu-sports.js';

const SEAT = rr(4.8, 8.6, 18.6, 4.2, 1.6);
const RUNNER = 'M4.8 18.6H22.4Q26.4 18.6 26.4 15.2Q26.4 12.6 23.8 12.6';

export default defineIcon({
  name: 'sled',
  zh: '雪橇',
  category: 'sports',
  tags: ['sledge', 'sleigh', 'toboggan', 'snow', 'winter', 'sledding', '滑雪橇'],
  // A sled with a curled runner; on hover it tips onto a slope and slides forward.
  svg: (u) => `<g data-n="g">
    <path d="M8.6 12.8V18M19 12.8V18" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    ${band(u, RUNNER, 2.4, u.upS)}
    ${layer(u, 's', SEAT, u.loS)}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    E.g.setAttribute('transform', `translate(${f(1.4 * p.o)} ${f(1.4 + 0.6 * p.o)}) rotate(${f(8 * p.o)} 15.5 18.6)`);
  }
});

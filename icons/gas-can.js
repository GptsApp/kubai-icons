import { defineIcon, KR, f, DEEPS, rp, rr } from '../packages/core/src/kit.js';
import { layer, moveAll } from './_science-edu-sports.js';

const BODY = rp([[6.6, 4.4], [17.4, 4.4], [24.4, 10.2], [24.4, 23], [6.6, 23]], [KR, 1.2, 1.2, KR, KR]);
// The spout cap stands on the chamfered corner, square to it.
const CAP = 'M19.43 3.35L22.18 0.07Q22.82 -0.7 23.6 -0.06L25.3 1.36Q26.07 2 25.43 2.77L22.68 6.05Z';
const PANEL = rr(9.4, 12.2, 12.2, 8.4, 1.6);

export default defineIcon({
  name: 'gas-can',
  zh: '油桶',
  category: 'transport',
  tags: ['jerrycan', 'fuel can', 'petrol', 'gasoline', 'fuel', 'canister', '汽油', '油壶'],
  // A jerrycan with its spout cap; on hover it tips forward as if to pour.
  svg: (u) => `<g transform="translate(-0.6 0.6)">${layer(u, 'cap', CAP, u.upS, { sh: false })}
    ${layer(u, 'b', BODY, u.loS, { extra: `<path d="${rr(9, 6.8, 6.4, 2.6, 1.3)}" fill="#fff"/>` })}
    ${layer(u, 'p', PANEL, u.upS, { sh: false, extra: `<path d="M12 14.6L19 18.2M19 14.6L12 18.2" class="ln" stroke-linecap="round" ${DEEPS}/>` })}</g>`,
  target: (h) => ({ a: h ? 14 : 0 }),
  draw(p, E) { moveAll(E, ['cap', 'b', 'p'], `rotate(${f(p.a)} 24.4 23)`); }
});

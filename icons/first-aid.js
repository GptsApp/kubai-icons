import { defineIcon, KR, CR, f, OL, DEEPS, WHITE, R, rp, rr, at } from '../packages/core/src/kit.js';

const BODY = rr(4, 7, 23, 15.6, KR), LID = rp(R(4, 7, 23, 4.6), [KR, KR, 0, 0]);
const W = 1.4, L = 3.2, X = 15.5, Y = 17.2;
const CROSS = rp([[X - W, Y - L], [X + W, Y - L], [X + W, Y - W], [X + L, Y - W], [X + L, Y + W], [X + W, Y + W], [X + W, Y + L], [X - W, Y + L], [X - W, Y + W], [X - L, Y + W], [X - L, Y - W], [X - W, Y - W]], [0.8, 0.8, 0.4, 0.8, 0.8, 0.4, 0.8, 0.8, 0.4, 0.8, 0.8, 0.4]);

export default defineIcon({
  name: 'first-aid',
  zh: '急救箱',
  category: 'health',
  tags: ['first aid kit', 'medical kit', 'emergency', 'medicine', 'aid', '药箱'],
  variants: ['plus', 'check', 'alert'],
  badgeAt: [24.2, 20.2],
  // A first-aid case with a carry handle on its lid; on hover the lid tips open.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g>
    <path d="${BODY}" ${OL}/>
    <path d="${rr(6.2, 9, 18.6, 2.6, CR)}" fill="#fff"/>
    <path d="${CROSS}" ${WHITE}/>
    <g data-n="lid"><path d="M11.4 7V5Q11.4 3.2 13.2 3.2H17.8Q19.6 3.2 19.6 5V7" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      <g filter="${u.hi}"><path d="${LID}" fill="${u.upS}"/></g><path d="${LID}" ${OL}/></g>`,
  target: (h) => ({ a: h ? -14 : 0 }),
  draw(p, E) { at(E.lid, { transform: `rotate(${f(p.a)} 4 11.6)` }); }
});

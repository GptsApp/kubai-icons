import { defineIcon, f, OL, DEEP, DEEPS, WHITE, WHITES, rp, ellipse, circ, clamp01, at, wave, bump } from '../packages/core/src/kit.js';
import { layer, move } from './_w2-people.js';

const BODY = ellipse(14, 15.4, 8.4, 6.2);
const WING = ellipse(0, -4.2, 3.2, 4.6);

export default defineIcon({
  name: 'bee',
  zh: '蜜蜂',
  category: 'nature',
  tags: ['bee', 'honey', 'insect', 'buzz', 'garden', 'busy', '昆虫'],
  // A striped bee with two wings; on hover its wings buzz and it bobs in the air.
  svg: (u) => `<g data-n="b">
    <path d="${rp([[6.6, 13.6], [2.8, 15.4], [6.6, 17.2]], [0.4, 0.5, 0.4])}" ${DEEP}/>
    <path d="M24.4 10.6Q25 7.4 27.4 6.6" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.loS}"/></g></g><path d="${BODY}" ${OL}/>
    <clipPath id="${u.id('bd')}"><path d="${BODY}"/></clipPath>
    <path d="M11 8V23M15.6 8V23" fill="none" stroke-width="2.2" clip-path="url(#${u.id('bd')})" ${WHITES}/>
    ${layer(u, circ(23.2, 13.8, 3.6), u.loS)}
    <circle cx="24.2" cy="13.2" r="1.2" ${WHITE}/>
    ${layer(u, WING, u.upS, 'w1', { sh: false })}${layer(u, WING, u.upS, 'w2', { sh: false })}</g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), k = 1 - 0.7 * wave(o, (t) => (1 - t) * Math.abs(Math.sin(4 * Math.PI * t)));
    at(E.b, { transform: `translate(0 ${f(-1.2 * bump(o) * (1 - o * 0.5))})` });
    move(E, 'w1', `translate(12.2 10.4) rotate(-24) scale(1 ${f(k)})`);
    move(E, 'w2', `translate(16.8 10.2) rotate(18) scale(1 ${f(k)})`);
  }
});

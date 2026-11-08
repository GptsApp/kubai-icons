import { defineIcon, f, DEEPS, R, rp, clamp01, at, rattle } from '../packages/core/src/kit.js';
import { back, front, turn, setD } from './_b6-vehicles.js';

const NEAR = 'M2.4 10.6C6 14.2 10 15.2 15.5 15.2C21 15.2 25 14.2 28.6 10.6C29 15.6 25.6 20.4 20 20.4H11C5.4 20.4 2 15.6 2.4 10.6Z';
const FAR = 'M2.4 10.6C7 12.2 10.6 12.6 15.5 12.6C20.4 12.6 24 12.2 28.6 10.6C25.6 14.8 21 15.8 15.5 15.8C10 15.8 5.4 14.8 2.4 10.6Z';
const P = [11, 15.6], BLADE = R(8.4, -4.8, 5.2, 7.6);

export default defineIcon({
  name: 'canoe',
  zh: '独木舟',
  category: 'transport',
  tags: ['paddle', 'paddling', 'boat', 'river', 'rowing', 'lake', '皮划艇', '划船'],
  // A long canoe with its long paddle leaning out over the side; on hover the paddle pulls a stroke and the canoe glides on.
  svg: (u) => `<g data-n="t">
    <path data-n="s" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    ${front(u, '', u.upS, 'b')}
    <path d="${FAR}" fill="${u.pure('#2F6FE0')}"/>
    ${back(u, NEAR, u.loS)}</g>`,
  target: (h) => ({ a: h ? 36 : 50, o: h ? 1 : 0 }),
  draw(p, E) {
    const [t] = turn([[11, 0]], p.a, P[0], P[1]);
    at(E.s, { d: `M11 15.6L${f(t[0])} ${f(t[1])}` });
    setD(E, 'b', rp(turn(BLADE, p.a, P[0], P[1]), 2.4));
    at(E.t, { transform: `translate(${f(p.o * 1.2 - 0.6)} ${f(rattle(clamp01(p.o), 1, 2))})` });
  }
});

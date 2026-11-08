import { defineIcon, f, DEEPS, rp, rr } from '../packages/core/src/kit.js';
import { back, front, liveBack, setPath } from './_b1-home.js';

const CX = 15.5, CY = 15.6, RX = 12.2, RY = 6.6;
// Blades lie in a flat disc seen from just below the ceiling, so a turn runs round an ellipse.
const project = (r, w, deg) => {
  const t = deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
  return [f(CX + (r * c - w * s) * RX), f(CY + (r * s + w * c) * RY)];
};
const blade = (deg) => rp([project(0.16, -0.12, deg), project(1, -0.3, deg), project(1, 0.3, deg), project(0.16, 0.12, deg)], [0.6, 1.8, 1.8, 0.6]);

export default defineIcon({
  name: 'ceiling-fan',
  zh: '吊扇',
  category: 'home',
  tags: ['fan', 'ceiling', 'cooling', 'air', 'blades', 'ventilation', '风扇', '电扇'],
  // A ceiling fan seen from just below, four long blades spread round the motor on its rod; they make a full turn on hover.
  svg: (u) => `${liveBack(u, 'b0')}${liveBack(u, 'b1')}${liveBack(u, 'b2')}${liveBack(u, 'b3')}
      <path d="M15.5 5.6V13" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      ${back(u, rr(10.3, 2.8, 10.4, 3.2, 1.4))}
      ${front(u, rr(11.7, 11.8, 7.6, 6.8, 2.6))}`,
  target: (h) => ({ t: h ? 360 : 0 }),
  draw(p, E) {
    for (let i = 0; i < 4; i++) setPath(E, `b${i}`, blade(p.t + 18 + i * 90));
  }
});

import { defineIcon, KR, f, OL, DEEPS, rr, circ, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

const S = [10.6, 17.4], EL = [13.8, 6.4], W = [22.8, 9.2];
// A capsule from point a to point b, t thick, drawn along x then rotated into place.
const limb = (a, b, t) => {
  const l = Math.hypot(b[0] - a[0], b[1] - a[1]), ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
  return { d: rr(a[0] - t / 2, a[1] - t / 2, l + t, t, t / 2), tr: `rotate(${f(ang)} ${a[0]} ${a[1]})` };
};
const LOW = limb(S, EL, 4.4), UP = limb(EL, W, 3.6);
const piece = (u, L, fill, n) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="${n}"><path d="${L.d}" transform="${L.tr}" fill="${fill}"/></g></g></g><g data-n="${n}O"><path d="${L.d}" transform="${L.tr}" ${OL}/></g>`;

export default defineIcon({
  name: 'robot-arm',
  zh: '机械臂',
  category: 'devices',
  tags: ['robot arm', 'industrial robot', 'automation', 'manufacturing', 'robotics', '机器人', '自动化'],
  variants: ['check', 'cog', 'sparkle'],
  // An industrial robot arm on its base; on hover it leans forward, lowers its forearm and closes its gripper.
  svg: (u) => `${back(u, rr(4.8, 19.6, 11.6, 4.4, KR))}
      <g data-n="a1"><g data-n="a2">
        <path data-n="claw" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
        ${piece(u, UP, u.loS, 'up')}
        ${front(u, circ(W[0], W[1], 2.1))}
      </g>
      ${piece(u, LOW, u.loS, 'lo')}
      ${front(u, circ(EL[0], EL[1], 2.6))}</g>
      ${front(u, circ(S[0], S[1], 3))}`,
  target: (h) => ({ a1: h ? 8 : 0, a2: h ? 14 : 0, g: h ? 1.3 : 2.6 }),
  draw(p, E) {
    at(E.a1, { transform: `rotate(${f(p.a1)} ${S[0]} ${S[1]})` });
    at(E.a2, { transform: `rotate(${f(p.a2)} ${EL[0]} ${EL[1]})` });
    at(E.claw, { d: `M${f(W[0] - p.g)} 14.6V10.4H${f(W[0] + p.g)}V14.6` });
  }
});

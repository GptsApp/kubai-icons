import { defineIcon, f, DEEP, DEEPS, ellipse, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

const CX = 15.5, RX = 11.5, RY = 7, TOP = 10.2, H = 4.8;
const disc = (cx, cy, rx, ry, h) => `M${cx - rx} ${cy}V${cy + h}A${rx} ${ry} 0 0 0 ${cx + rx} ${cy + h}V${cy}A${rx} ${ry} 0 0 0 ${cx - rx} ${cy}Z`;
const BODY = disc(CX, TOP, RX, RY, H), TURRET = disc(CX, 8, 4.4, 2.6, 2);
const HUB = [6.8, 19.8];
const SPOKES = [0, 60, 120, 180, 240, 300].map((d) => {
  const r = d * Math.PI / 180;
  return `M0 0L${f(3.8 * Math.sin(r))} ${f(-3.8 * Math.cos(r))}`;
}).join('');

export default defineIcon({
  name: 'robot-vacuum',
  zh: '扫地机',
  category: 'home',
  tags: ['cleaning robot', 'side brush', 'sweeper', 'lidar', 'smart home', '扫地机器人', '清洁机器人'],
  variants: ['check', 'x', 'clock', 'bolt'],
  // A flat round cleaning robot seen from slightly above, with a sensor turret, a button and a
  // small side brush; on hover the brush spins and the robot drives forward.
  svg: (u) => `<g data-n="g"><g data-n="br"><path d="${SPOKES}" fill="none" stroke-width="2" stroke-linecap="round" ${DEEPS}/></g>
      ${back(u, BODY)}
      ${front(u, ellipse(CX, TOP, RX, RY))}
      <path d="${TURRET}" fill="${u.loS}"/>
      <path d="${ellipse(CX, 8, 4.4, 2.6)}" fill="#fff"/>
      <path d="${ellipse(CX, 14, 1.8, 1.25)}" ${DEEP}/></g>`,
  target: (h) => ({ rot: h ? 360 : 0, d: h ? 1.2 : 0 }),
  draw(p, E) {
    at(E.g, { transform: `translate(${f(-p.d)} ${f(p.d * 0.5)})` });
    at(E.br, { transform: `translate(${HUB[0]} ${HUB[1]}) rotate(${f(p.rot)})` });
  }
});

import { defineIcon, f, DEEP, DEEPS, rr, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { solid, span } from './_devices.js';

export default defineIcon({
  name: 'bot',
  zh: '机器人',
  category: 'devices',
  tags: ['robot', 'ai', 'assistant', 'chatbot', 'automation', '智能体'],
  variants: ['plus', 'check', 'x', 'alert', 'sparkle', 'cog', 'heart', 'bolt'],
  // A robot head with an antenna; on hover it blinks and its antenna wobbles.
  svg: (u) => `${solid(u, rr(2.8, 11.6, 3.6, 6.4, 1.2), u.upS)}${solid(u, rr(24.6, 11.6, 3.6, 6.4, 1.2), u.upS)}
      <g data-n="ant"><path d="M15.5 7.4V4.4" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/><circle cx="15.5" cy="3" r="1.8" ${DEEP}/></g>
      ${solid(u, rr(5.2, 7, 20.6, 15.6, 4), u.loS)}
      <path d="${rr(8.2, 10, 14.6, 9.6, 2.6)}" fill="#fff"/>
      <path data-n="eyes" ${DEEP}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), hh = 3.8 * (1 - 0.75 * Math.sin(Math.PI * span(o, 0, 0.5)));
    at(E.eyes, { d: rr(10.8, 14.8 - hh / 2, 2.8, hh, Math.min(1.4, hh / 2)) + rr(17.4, 14.8 - hh / 2, 2.8, hh, Math.min(1.4, hh / 2)) });
    at(E.ant, { transform: `rotate(${f(rattle(o, 30, 2))} 15.5 7.4)` });
  }
});

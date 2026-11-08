import { defineIcon, KR, CR, f, LINE, ACC, DEEP, rr, circ, at } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';

const W = [15.5, 17.2];

export default defineIcon({
  name: 'music-player',
  zh: '音乐播放器',
  category: 'devices',
  tags: ['mp3 player', 'portable player', 'click wheel', 'music', 'audio', '随身听'],
  variants: ['plus', 'heart', 'down'],
  // A pocket music player with a click wheel; on hover the centre button is pressed, a finger turns
  // the wheel round and the track plays on.
  svg: (u) => `${back(u, rr(7.4, 1, 16.2, 23, KR))}
      <path d="${rr(9.6, 3.2, 11.8, 7.4, CR)}" fill="#fff"/>
      <path d="M12 7.6H19" ${LINE}/><path data-n="pr" ${ACC}/>
      <path d="${circ(W[0], W[1], 5.2)}" fill="#fff"/>
      <path data-n="ctr" d="${circ(W[0], W[1], 1.8)}" fill="${u.loS}"/>
      <path data-n="dot" ${DEEP}/>`,
  target: (h) => ({ a: h ? 200 : 0, pr: h ? 7 : 2.6 }),
  draw(p, E) {
    const t = p.a / 200, touch = Math.sin(Math.PI * Math.max(0, Math.min(1, t)));
    at(E.ctr, { d: circ(W[0], W[1], 1.8 - 0.7 * Math.sin(Math.PI * Math.max(0, Math.min(1, t / 0.6)))) });
    at(E.pr, { d: `M12 7.6H${f(12 + p.pr)}` });
    const r = p.a * Math.PI / 180;
    at(E.dot, { d: circ(W[0] + 3.5 * Math.sin(r), W[1] - 3.5 * Math.cos(r), 1.2 + 0.45 * touch) });
  }
});

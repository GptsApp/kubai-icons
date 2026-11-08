import { defineIcon, KR, f, DEEP, DEEPS, WHITE, rr, circ, at, clamp01, wave } from '../packages/core/src/kit.js';
import { back } from './_w2-devices.js';

const XS = [10.2, 20.8], CY = 15.4;

export default defineIcon({
  name: 'boombox',
  zh: '手提音响',
  category: 'media',
  tags: ['stereo', 'cassette player', 'portable speaker', 'music', 'retro', '录音机', '收录机'],
  // A portable stereo with a carrying handle and a pair of speakers; on hover both cones beat
  // twice and the whole set hops with the bass.
  svg: (u) => `<g data-n="g"><path d="M8.6 7.6V5.2Q8.6 3 10.8 3H20.2Q22.4 3 22.4 5.2V7.6" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
      ${back(u, rr(4, 7, 23, 14.8, KR))}
      <path d="${rr(12.5, 8.8, 6, 2.4, 1.2)}" ${WHITE}/>
      <path d="${circ(XS[0], CY, 4.2) + circ(XS[1], CY, 4.2)}" fill="#fff"/>
      <path data-n="co" ${DEEP}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), beat = wave(o, (t) => (1 - t * 0.5) * Math.sin(2 * Math.PI * t) ** 2);
    const r = 2.1 + 1.3 * beat;
    at(E.g, { transform: `translate(0 ${f(-1.2 * beat)})` });
    at(E.co, { d: circ(XS[0], CY, r) + circ(XS[1], CY, r) });
  }
});

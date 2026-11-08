import { defineIcon, f, at, clamp01 } from '../packages/core/src/kit.js';
import { band, closed } from './_science-edu-sports.js';

// A figure eight lying on its side, sampled densely; LOOP is the length of its centre line.
const pt = (t) => [15.5 + 9.6 * Math.cos(t), 12.5 + 7.4 * Math.sin(2 * t)];
const PTS = Array.from({ length: 96 }, (_, i) => pt(-Math.PI / 2 + i * Math.PI * 2 / 96));
const LOOP = PTS.reduce((s, p, i) => s + Math.hypot(p[0] - PTS[(i + 1) % 96][0], p[1] - PTS[(i + 1) % 96][1]), 0);
const D = closed(PTS);

export default defineIcon({
  name: 'infinity',
  zh: '无限',
  category: 'shapes',
  tags: ['loop', 'forever', 'unlimited', 'endless', '无穷'],
  // A lying figure eight; on hover a light streak runs along the loop to the other side, stretching as it speeds.
  svg: (u) => `${band(u, D, 3.2, u.loS)}
    <path data-n="run" d="${D}" fill="none" stroke-width="1.6" stroke-linecap="round" stroke="#fff" data-w="stroke" stroke-dasharray="4 ${f(LOOP)}"/>`,
  target: (h) => ({ k: h ? 0.5 : 0 }),
  draw(p, E) {
    // The head leads; the tail grows to its longest halfway and shrinks back on arrival.
    const l = 4 + 14 * Math.sin(Math.PI * clamp01(p.k * 2));
    at(E.run, { 'stroke-dasharray': `${f(l)} ${f(LOOP)}`, 'stroke-dashoffset': f(l - 2 - LOOP * (0.125 + p.k)) });
  }
});

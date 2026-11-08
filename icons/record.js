import { defineIcon, f, circ, at } from '../packages/core/src/kit.js';
import { button } from './_media.js';

export default defineIcon({
  name: 'record',
  zh: '录制',
  category: 'media',
  tags: ['rec', 'capture', 'recording', 'dot', '录音', '录像'],
  // A record button: a white face with a solid dot that swells on hover as recording starts.
  svg: (u) => `${button(u)}
    <path d="${circ(15.5, 12.5, 7.6)}" fill="#fff"/>
    <circle data-n="dot" cx="15.5" cy="12.5" fill="${u.pure('#5393FF')}"/>`,
  target: (h) => ({ r: h ? 5.2 : 4.2 }),
  draw(p, E) { at(E.dot, { r: f(p.r) }); }
});

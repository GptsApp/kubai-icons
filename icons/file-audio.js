import { defineIcon, f, WHITE, rp, at, bump } from '../packages/core/src/kit.js';
import { typedPage, FILE_BADGES } from './_files-text.js';

export default defineIcon({
  name: 'file-audio',
  zh: '音频文件',
  category: 'files',
  tags: ['audio', 'sound', 'music', 'mp3', 'song', '音频'],
  variants: FILE_BADGES,
  // A page with a music note that bobs to the beat on hover.
  svg: (u) => {
    const stem = rp([[14.8, 9.4], [16.6, 9.4], [20.6, 12], [20.6, 14.4], [16.6, 12.2], [16.6, 18.6], [14.8, 18.6]], [0.6, 0.6, 0.8, 0.6, 0.3, 0.6, 0.6]);
    const head = 'M9.6 18.6A3 2.3 0 1 0 15.6 18.6A3 2.3 0 1 0 9.6 18.6Z';
    return typedPage(u, `<g data-n="note"><path d="${stem}" ${WHITE}/><path d="${head}" transform="rotate(-20 12.6 18.6)" ${WHITE}/></g>`);
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    // One bounce up and back, ending on a small lift and tilt.
    const o = Math.max(0, Math.min(1, p.o));
    const y = -1.2 * o - 1.4 * bump(o), a = -7 * o;
    at(E.note, { transform: `translate(0 ${f(y)}) rotate(${f(a)} 14.6 18.6)` });
  }
});

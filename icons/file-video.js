import { defineIcon, CR, f, DEEP, rp, rr, at, bump } from '../packages/core/src/kit.js';
import { typedPage, FILE_BADGES } from './_files-text.js';

// The play button's two halves, scaled into the page's screen.
const S = 0.6, CX = 15.5, CY = 15;
const fit = (pts, s = S) => pts.map(([x, y]) => [CX + (x - 15.5) * s, CY + (y - 12.5) * s]);
const PLAY = [[[12.2, 7.2], [16.4, 9.6], [16.4, 15.4], [12.2, 17.8]], [[16, 9.4], [21.4, 12.5], [21.4, 12.5], [16, 15.6]]];
const PAUSE = [[[11, 7.2], [14.2, 7.2], [14.2, 17.8], [11, 17.8]], [[16.8, 7.2], [20, 7.2], [20, 17.8], [16.8, 17.8]]];

export default defineIcon({
  name: 'file-video',
  zh: '视频文件',
  category: 'files',
  tags: ['video', 'movie', 'film', 'mp4', 'clip', '视频'],
  variants: FILE_BADGES,
  // A page with a small screen; on hover its play mark is pressed, popping up and turning into pause.
  svg: (u) => typedPage(u, `<path d="${rr(9, 9.6, 13, 10.8, CR)}" fill="#fff"/>
    <path data-n="l" ${DEEP}/><path data-n="r" ${DEEP}/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o)), s = S * (1 + 0.1 * o + 0.22 * bump(o));
    const mix = (a, b) => a.map(([x, y], i) => [x + (b[i][0] - x) * o, y + (b[i][1] - y) * o]);
    at(E.l, { d: rp(fit(mix(PLAY[0], PAUSE[0]), s), 0.5) }); at(E.r, { d: rp(fit(mix(PLAY[1], PAUSE[1]), s), 0.5) });
  }
});

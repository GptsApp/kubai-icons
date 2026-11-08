import { defineIcon, KR, f, OL, rr, at, clamp01, bump } from '../packages/core/src/kit.js';
import { tri } from './_media.js';

const ROWS = [5.4, 10.6, 15.8], STEP = ROWS[1] - ROWS[0];
const ROW = (y) => rr(12.8, y, 10, 3.2, 1);
// A track bar scaled by s about its own centre.
const bar = (y, s) => rr(17.8 - 5 * s, y + 1.6 - 1.6 * s, 10 * s, 3.2 * s, s);
const ease = (t) => t * t * (3 - 2 * t);

export default defineIcon({
  name: 'playlist',
  zh: '播放列表',
  category: 'media',
  tags: ['queue', 'tracks', 'list', 'songs', 'up next', '歌单'],
  variants: ['plus', 'minus', 'check', 'x', 'heart', 'star', 'clock', 'down', 'up', 'search', 'lock', 'sparkle'],
  // A list of tracks with a play marker on the current one; on hover the finished track
  // shrinks away, the queue moves up under the marker and a new track joins at the end.
  svg: (u) => {
    const body = rr(5.2, 2.2, 20.6, 20.6, KR);
    return `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${u.loS}"/></g></g><path d="${body}" ${OL}/>
    <path data-n="rows" d="${ROWS.map(ROW).join('')}" fill="#fff"/>
    <path data-n="m" d="${tri(8, 11.4, 0, 2, 0.6)}" fill="#fff" data-w="fill"/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    const gone = 1 - ease(clamp01(o / 0.4)), up = STEP * ease(clamp01((o - 0.25) / 0.5)), grow = ease(clamp01((o - 0.55) / 0.45));
    const d = o ? [gone > 0.01 ? bar(ROWS[0], gone) : '', ROW(ROWS[1] - up), ROW(ROWS[2] - up), grow > 0.01 ? bar(ROWS[2], grow) : ''].join('') : ROWS.map(ROW).join('');
    at(E.rows, { d });
    // The marker nudges forward as the next track arrives.
    at(E.m, { transform: `translate(${f(1.2 * bump(o))} ${f(ROWS[0] + 1.6)})` });
  }
});

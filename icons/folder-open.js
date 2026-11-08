import { defineIcon, KR, f, OL, LINE, rp, rr, at } from '../packages/core/src/kit.js';

const BACK_R = [KR, 1.4, 1.4, KR, KR, KR];
const BACK = rp([[4, 3], [11.2, 3], [14.2, 6], [27, 6], [27.6, 23], [4.6, 23]], BACK_R);
const FRONT = rp([[6.8, 13], [29.3, 13], [27.6, 23], [5.4, 23]], 1.8);
const PAPER = rr(0, 0, 17, 9, 1);

export default defineIcon({
  name: 'folder-open',
  zh: '打开的文件夹',
  category: 'files',
  tags: ['folder', 'open', 'directory', 'browse', 'files', '展开'],
  variants: ['plus', 'minus', 'check', 'x', 'alert', 'info', 'up', 'down', 'right', 'clock', 'star', 'heart', 'lock', 'search', 'sync', 'cog', 'sparkle'],
  // A folder lying open with a sheet of paper inside; on hover the paper lifts out of it.
  svg: (u) => `
    <g filter="${u.sh}"><path d="${BACK}" fill="${u.lo(20)}"/></g>
    <path d="${BACK}" ${OL}/>
    <g data-n="file"><path d="${PAPER}" fill="#fff"/><path d="${PAPER}" ${OL}/><path d="M5.5 2.3H11.5" ${LINE} stroke-width="1"/></g>
    <g filter="${u.hi}"><path d="${FRONT}" fill="${u.up(10)}"/></g>
    <path d="${FRONT}" ${OL}/>`,
  target: (h) => ({ y: h ? 4.2 : 9, x: h ? 7.6 : 7.9 }),
  draw(p, E) { at(E.file, { transform: `translate(${f(p.x)} ${f(p.y)})` }); }
});

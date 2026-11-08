import { defineIcon, f, rr, at } from '../packages/core/src/kit.js';
import { typedPage, FILE_BADGES } from './_files-text.js';

const COLS = [9.2, 16.3], ROWS = [9.6, 13.8, 18], W = 5.5, H = 2.6;
const cells = ROWS.flatMap((y) => COLS.map((x) => rr(x, y, W, H, 0.6))).join('');

export default defineIcon({
  name: 'file-spreadsheet',
  zh: '表格文件',
  category: 'files',
  tags: ['spreadsheet', 'sheet', 'excel', 'csv', 'table', 'cells', '表格'],
  variants: FILE_BADGES,
  // A page ruled into cells; on hover one cell is selected with a pop and the selection drags down over the cell below.
  svg: (u) => typedPage(u, `<path d="${cells}" fill="#fff"/>
    <path data-n="sel" d="${rr(COLS[0], ROWS[1], W, H, 0.6)}" fill="${u.pure('#2F6FE0')}"/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o)), a = Math.min(1, o / 0.45), b = Math.max(0, (o - 0.45) / 0.55);
    const s = 0.5 + 0.5 * a + 0.4 * Math.sin(Math.PI * a), h = H + (ROWS[2] - ROWS[1]) * b;
    const cx = COLS[0] + W / 2, cy = ROWS[1] + H / 2;
    at(E.sel, { d: o ? rr(cx - W * s / 2, cy - H * s / 2, W * s, h - H + H * s, 0.6) : rr(COLS[0], ROWS[1], W, H, 0.6), opacity: o ? 1 : 0 });
  }
});

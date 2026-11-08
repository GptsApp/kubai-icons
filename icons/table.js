import { defineIcon, KR, f, OL, R, rp, rr, at } from '../packages/core/src/kit.js';

const COLS = [7.6, 13.4, 19.2], ROWS = [10, 14, 18], W = 4.2, H = 2.4;

export default defineIcon({
  name: 'table',
  zh: '表格',
  category: 'text',
  tags: ['table', 'grid', 'sheet', 'rows', 'columns', 'data', '数据表'],
  variants: ['plus', 'minus', 'x', 'search', 'cog'],
  // A sheet with a header row and a grid of cells; on hover one row is selected cell by cell, each popping in.
  svg: (u) => {
    const body = rr(5.2, 2.2, 20.6, 20.6, KR), head = rp(R(5.2, 2.2, 20.6, 5.6), [KR, KR, 0, 0]);
    const cells = ROWS.flatMap((y) => COLS.map((x) => rr(x, y, W, H, 0.6))).join('');
    const sel = COLS.map((x) => rr(x, ROWS[1], W, H, 0.6)).join('');
    return `<g filter="${u.sh}"><path d="${body}" fill="${u.loS}"/></g><path d="${body}" ${OL}/>
      <path d="${cells}" fill="#fff"/>
      <path data-n="sel" d="${sel}" fill="${u.pure('#2F6FE0')}"/>
      <g filter="${u.hi}"><path d="${head}" fill="${u.upS}"/></g><path d="${head}" ${OL}/>`;
  },
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o));
    const d = o ? COLS.map((x, i) => {
      const t = Math.max(0, Math.min(1, (o - 0.2 * i) / 0.6));
      if (!t) return '';
      const s = 0.4 + 0.6 * t + 0.45 * Math.sin(Math.PI * t), cx = x + W / 2, cy = ROWS[1] + H / 2;
      return rr(cx - W * s / 2, cy - H * s / 2, W * s, H * s, 0.6);
    }).join('') : COLS.map((x) => rr(x, ROWS[1], W, H, 0.6)).join('');
    at(E.sel, { d, opacity: o ? 1 : 0 });
  }
});

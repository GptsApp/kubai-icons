import { defineIcon, f, WHITE, at, clamp01, bump } from '../packages/core/src/kit.js';
import { card } from './_files-text.js';

// Right-hand crossing of two circles [cx, cy, r].
const meetRight = (a, b) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy);
  const l = (a[2] * a[2] - b[2] * b[2] + d * d) / (2 * d), h = Math.sqrt(Math.max(0, a[2] * a[2] - l * l));
  const mx = a[0] + dx * l / d, my = a[1] + dy * l / d, p = [mx - h * dy / d, my + h * dx / d], q = [mx + h * dy / d, my - h * dx / d];
  return p[0] > q[0] ? p : q;
};
// A capital B round its centre; `g` thickens it outward while the two counters keep their size.
const glyph = (g) => {
  const A = [0.8, -3.5, 3.3 + g], B = [1.4, 3.1, 3.7 + g], m = meetRight(A, B);
  const outer = `M${f(-5 - g)} ${f(-6.8 - g)}H0.8A${f(A[2])} ${f(A[2])} 0 0 1 ${f(m[0])} ${f(m[1])}`
    + `A${f(B[2])} ${f(B[2])} 0 0 1 1.4 ${f(6.8 + g)}H${f(-5 - g)}Z`;
  return outer + 'M-2 -4.2H0.8A1.25 1.25 0 0 1 0.8 -1.7H-2Z' + 'M-2 0.9H1A1.65 1.65 0 0 1 1 4.2H-2Z';
};

export default defineIcon({
  name: 'bold',
  zh: '加粗',
  category: 'text',
  tags: ['bold', 'strong', 'weight', 'format', 'text', '粗体'],
  // A bold letter B on a card; on hover it swells a weight heavier, past it and back.
  svg: (u) => card(u, `<path data-n="b" fill-rule="evenodd" transform="translate(15.5 12.5)" ${WHITE}/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) { at(E.b, { d: glyph(0.95 * p.o + 0.45 * bump(clamp01(p.o))) }); }
});

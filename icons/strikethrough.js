import { defineIcon, f, WHITE, R, rp, at, clamp01, bump } from '../packages/core/src/kit.js';
import { card } from './_files-text.js';
import { ribbon, arcPts } from './_w2-interface.js';

// A letter S from two stacked bowls, ends cut square.
const S = ribbon([...arcPts(0, -3, 3, -25, -270, 24), ...arcPts(0, 3, 3, -90, 155, 24).slice(1)], 2.8);

export default defineIcon({
  name: 'strikethrough',
  zh: '删除线',
  category: 'text',
  tags: ['strikethrough', 'strike', 'cross out', 'delete', 'format', 'text', '划掉'],
  // A struck-through letter S; on hover the letter lifts while the strike is taken back to its left end, and settles as the strike is pulled through again.
  svg: (u) => card(u, `<path data-n="s" d="${S}" transform="translate(15.5 12.5)" ${WHITE}/><path data-n="ln" ${WHITE}/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o), x0 = 8.6, w = Math.max(2.4, 13.8 * (1 - 1.1 * bump(o)));
    at(E.s, { transform: `translate(15.5 ${f(12.5 - 1.4 * bump(o))})` });
    at(E.ln, { d: rp(R(x0, 11.3, w, 2.4), 1.2) });
  }
});

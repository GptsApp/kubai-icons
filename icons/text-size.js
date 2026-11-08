import { defineIcon, WHITE, R, rp, at, scaleAt, bump } from '../packages/core/src/kit.js';
import { card } from './_files-text.js';

// A letter T: bar of width w and thickness t on top, stem s wide, standing on y=base.
const T = (cx, base, h, w, t, s) => rp([[cx - w / 2, base - h], [cx + w / 2, base - h], [cx + w / 2, base - h + t], [cx + s / 2, base - h + t], [cx + s / 2, base], [cx - s / 2, base], [cx - s / 2, base - h + t], [cx - w / 2, base - h + t]],
  [0.5, 0.5, 0.4, 0.3, 0.5, 0.5, 0.3, 0.4]);

export default defineIcon({
  name: 'text-size',
  zh: '字号',
  category: 'text',
  tags: ['font size', 'text size', 'type size', 'scale', 'format', 'text', '字体大小'],
  // A large and a small letter T on a card; on hover the small one grows up a size on its baseline, away from the large one.
  svg: (u) => card(u, `<path d="${T(12, 19.3, 13.6, 9.6, 2.8, 2.8)}" ${WHITE}/>
    <path data-n="s" d="${T(20.2, 19.3, 7.6, 6, 2.4, 2.4)}" ${WHITE}/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o));
    at(E.s, { transform: o ? scaleAt(1 + 0.36 * o + 0.12 * bump(o), 18.8, 19.3) : scaleAt(1, 20.2, 19.3) });
  }
});

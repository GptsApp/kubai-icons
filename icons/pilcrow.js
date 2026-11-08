import { defineIcon, f, WHITE, at, bump } from '../packages/core/src/kit.js';
import { card } from './_files-text.js';

// A pilcrow: a solid bowl on the left of two stems joined at the top, centred on the origin.
const P = 'M-1.5 -6.8H5.3V6.8H2.9V-4.4H0.9V6.8H-1.5V0.8A3.8 3.8 0 0 1 -1.5 -6.8Z';

export default defineIcon({
  name: 'pilcrow',
  zh: '段落标记',
  category: 'text',
  tags: ['pilcrow', 'paragraph', 'formatting marks', 'invisibles', 'text', '段落'],
  // A paragraph mark on a card; on hover it pops up a size past its mark and settles, as marks are shown.
  svg: (u) => card(u, `<path data-n="p" d="${P}" ${WHITE}/>`),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const s = 1 + 0.18 * p.o + 0.1 * bump(Math.max(0, Math.min(1, p.o)));
    at(E.p, { transform: `translate(15.5 12.5) scale(${f(s)})` });
  }
});

import { defineIcon, f, OL, DEEPS, WHITES, R, rp, rr, at } from '../packages/core/src/kit.js';

// Book spines standing side by side: left edge, width, top; light ones alternate with mid ones.
const BOOKS = [[5.2, 4.6, 6.4], [9.8, 4.8, 3.2], [14.6, 4.2, 7.6], [18.8, 6.6, 5]];

export default defineIcon({
  name: 'library',
  zh: '书架',
  category: 'files',
  tags: ['library', 'books', 'bookshelf', 'collection', 'reading', '图书馆'],
  variants: ['plus', 'check', 'star', 'heart', 'search', 'sparkle'],
  // Books on a shelf; on hover the second book is drawn up out of the row.
  svg: (u) => {
    const book = (i) => {
      const [x, w, y] = BOOKS[i], d = rp(R(x, y, w, 23 - y), [1.2, 1.2, 0, 0]), light = i % 2 === 1;
      const mark = `<path d="M${f(x + 1.2)} ${f(y + 3)}H${f(x + w - 1.2)}" class="ln" ${light ? `${DEEPS} stroke-opacity=".55"` : WHITES}/>`;
      return `<g data-n="b${i}"><g filter="${u.hi}"><path d="${d}" fill="${light ? u.upS : u.loS}"/></g><path d="${d}" ${OL}/>${mark}</g>`;
    };
    const shelf = rr(4, 19.6, 23, 3.8, 1.2);
    return `<g filter="${u.sh}">${BOOKS.map((_, i) => book(i)).join('')}</g>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${shelf}" fill="${u.upS}"/></g></g><path d="${shelf}" ${OL}/>`;
  },
  target: (h) => ({ y: h ? -3.4 : 0 }),
  draw(p, E) { at(E.b1, { transform: `translate(0 ${f(p.y)})` }); }
});

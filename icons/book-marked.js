import { defineIcon, KR, CR, f, OL, ACC, rp, rr, lines, at } from '../packages/core/src/kit.js';

// The cover narrowed to w of its width about the spine at x 6.3, as it lifts open.
const sx = (x, w) => 6.3 + (x - 6.3) * w;
const cover = (w) => rr(6.3, 1.5, 18.4 * w, 19.4, KR);

export default defineIcon({
  name: 'book-marked',
  zh: '书签书本',
  category: 'education',
  tags: ['book', 'bookmark', 'reading', 'saved', 'ribbon', 'library', '已读'],
  variants: ['plus', 'check', 'x'],
  // A closed book with a ribbon bookmark down its cover; on hover the cover lifts open a little
  // to show the pages and the ribbon slips far down.
  svg: (u) => {
    const back = rr(6.3, 1.5, 18.4, 22, KR);
    return `<g filter="${u.sh}"><path d="${back}" fill="${u.loS}"/></g><path d="${back}" ${OL}/>
      <path d="${rr(7.8, 3, 15.6, 19.4, CR)}" fill="#fff"/>
      <path d="${lines(11.4, 8.4, [9.2, 6.6])}" ${ACC}/>
      <g filter="${u.hi}"><path data-n="cv" d="${cover(1)}" fill="${u.loS}"/></g><path data-n="cvO" d="${cover(1)}" ${OL}/>
      <path data-n="title" d="${lines(9.6, 7.6, [4.6])}" class="ln" stroke="#fff" data-w="stroke"/>
      <g filter="${u.hi}"><path data-n="rb" fill="${u.upS}"/></g><path data-n="rbO" ${OL}/>`;
  },
  target: (h) => ({ l: h ? 17.4 : 10.8, w: h ? 0.8 : 1 }),
  draw(p, E) {
    const w = p.w, c = cover(w), l = p.l;
    at(E.cv, { d: c }); at(E.cvO, { d: c });
    at(E.title, { d: `M${f(sx(9.6, w))} 7.6H${f(sx(14.2, w))}` });
    const d = rp([[sx(16.8, w), 1.5], [sx(21.4, w), 1.5], [sx(21.4, w), l], [sx(19.1, w), l - 1.9], [sx(16.8, w), l]], [0, 0, 0.4, 0.5, 0.4]);
    at(E.rb, { d }); at(E.rbO, { d });
  }
});

import { defineIcon, KR, CR, f, DEEPS, WHITE, rp, rr, lines, at } from '../packages/core/src/kit.js';
import { back, front } from './_w2-devices.js';

const KEYS = [14.6, 18.2, 21.8].flatMap((x) => [13, 16.8].map((y) => rr(x, y, 2.4, 2.4, 0.7))).join('');
const HANDSET = rp([[5.8, 6.2], [11.4, 6.2], [11.4, 9.6], [9.9, 11], [9.9, 15.4], [11.4, 16.8], [11.4, 20], [5.8, 20]],
  [2.2, 2.2, 1, 0.6, 0.6, 1, 2.2, 2.2]);

export default defineIcon({
  name: 'fax',
  zh: '传真机',
  category: 'devices',
  tags: ['facsimile', 'office', 'document', 'send', 'telephone', '传真'],
  variants: ['check', 'x', 'alert', 'clock'],
  // A fax machine with a handset, keys and a sheet standing out of the top; on hover the sheet
  // feeds further out and shows its next line.
  svg: (u) => {
    const page = rr(0, 0, 11, 14, CR);
    return `<g data-n="pg">${front(u, page)}<path d="${lines(2.4, 3, [6.2])}${lines(2.4, 6.8, [4.4])}" class="ln" ${DEEPS}/></g>
      ${back(u, rr(4, 9.8, 23, 12, KR))}
      <path d="${KEYS}" ${WHITE}/>
      ${front(u, HANDSET)}`;
  },
  target: (h) => ({ y: h ? 0.2 : 2.8 }),
  draw(p, E) { at(E.pg, { transform: `translate(13.8 ${f(p.y)})` }); }
});

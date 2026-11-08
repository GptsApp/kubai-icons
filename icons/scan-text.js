import { defineIcon, KR, OL, DEEPS, WHITE, rr, at } from '../packages/core/src/kit.js';
import { corners } from './_w2-interface.js';
import { bar } from './_files-text.js';

export default defineIcon({
  name: 'scan-text',
  zh: '识别文字',
  category: 'devices',
  tags: ['ocr', 'scan text', 'text recognition', 'extract text', 'viewfinder', '文字识别'],
  variants: ['check', 'x'],
  // A card of text inside the four corners of a viewfinder; on hover the corners close in on the text.
  svg: (u) => {
    const card = rr(8.7, 7.2, 13.6, 10.6, KR);
    return `<path data-n="fr" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ${DEEPS}/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${card}" fill="${u.loS}"/></g></g><path d="${card}" ${OL}/>
      <path d="${bar(11.4, 10.8, 8.2)}${bar(11.4, 14.2, 5.4)}" ${WHITE}/>`;
  },
  target: (h) => ({ i: h ? 0.8 : 0 }),
  draw(p, E) { at(E.fr, { d: corners(4.4 + p.i, 2 + p.i, 26.6 - p.i, 23 - p.i) }); }
});

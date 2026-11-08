import { defineIcon, KR, OL, WHITE, rp, star, at } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'sticker',
  zh: '贴纸',
  category: 'communication',
  tags: ['sticker', 'emoji', 'decal', 'label', 'reaction', '表情贴纸'],
  variants: ['plus', 'heart', 'star'],
  // A square sticker with a star whose corner is peeling up; on hover it peels further.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="b" fill="${u.loS}"/></g></g><path data-n="bO" ${OL}/>
    <path transform="translate(12.8 11)" d="${star(5, 2.3)}" ${WHITE}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="fl" fill="${u.upS}"/></g></g><path data-n="flO" stroke-linejoin="round" ${OL}/>`,
  target: (h) => ({ d: h ? 9.4 : 7 }),
  draw(p, E) {
    // The corner folds over the line x + y = const: the cut edge is shared by the sticker
    // and the folded flap, whose tip lands at the corner's mirror image.
    const d = p.d, x = 25.8, y = 22.8;
    const body = rp([[5.2, 2.2], [x, 2.2], [x, y - d], [x - d, y], [5.2, y]], [KR, KR, 0.4, 0.4, KR]);
    const flap = rp([[x, y - d], [x - d, y - d], [x - d, y]], [0.4, 1.6, 0.4]);
    at(E.b, { d: body }); at(E.bO, { d: body }); at(E.fl, { d: flap }); at(E.flO, { d: flap });
  }
});

import { defineIcon, KR, CR, f, OL, DEEPS, rp, rr, at } from '../packages/core/src/kit.js';

// The body's top edge; the open flap stands above it and the pocket's V sits below it.
const T = 9.6, B = 23;

export default defineIcon({
  name: 'mail-open',
  zh: '已读邮件',
  category: 'communication',
  tags: ['email', 'envelope', 'read', 'opened', 'letter', 'message', '打开的信封'],
  variants: ['check', 'x', 'alert', 'clock', 'star', 'heart', 'lock', 'search', 'right', 'down'],
  // An opened envelope with its letter standing up; on hover the letter rises further out.
  svg: (u) => {
    const body = rr(4, T, 23, B - T, KR);
    // The open flap squares off where the body's sides turn straight, as in mail.
    const flap = rp([[4, T + KR], [27, T + KR], [27, T], [15.5, T - 7.4], [4, T]], [0, 0, 0.8, 2.4, 0.8], true);
    const pocket = rp([[4, T + 3], [15.5, T + 8], [27, T + 3], [27, B], [4, B]], [0.6, 2.4, 0.6, KR, KR]);
    const letter = rr(7.4, 0, 16.2, 12, CR);
    return `<g filter="${u.sh}"><path d="${body}" fill="${u.loS}"/></g><path d="${body}" ${OL}/>
      <g filter="${u.hi}"><path d="${flap}" fill="${u.loS}"/></g><path d="${flap}" ${OL}/>
      <g data-n="l"><g filter="${u.hi}"><path d="${letter}" fill="${u.upS}"/></g><path d="${letter}" ${OL}/>
        <path d="M10.4 3.4H17.8M10.4 6.6H20.6" class="ln" ${DEEPS} stroke-opacity=".55"/></g>
      <g filter="${u.hi}"><path d="${pocket}" fill="${u.up(B - T - 3)}"/></g><path d="${pocket}" ${OL}/>`;
  },
  target: (h) => ({ y: h ? 0.2 : 3.4 }),
  draw(p, E) { at(E.l, { transform: `translate(0 ${f(p.y)})` }); }
});

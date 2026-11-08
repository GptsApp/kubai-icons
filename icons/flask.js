import { defineIcon, f, OL, rp, rr, at } from '../packages/core/src/kit.js';

const BODY = rp([[12.8, 2.6], [18.2, 2.6], [18.2, 9.2], [25.2, 23.4], [5.8, 23.4], [12.8, 9.2]], [0, 0, 1.6, 2.2, 2.2, 1.6]);
const LIP = rr(11.2, 1, 8.6, 3, 1.4);
// Liquid below a gently waving surface, wide enough to fill the flask once clipped.
const liquid = (y, ph, a = 0.5) => {
  let d = '';
  for (let x = 4; x <= 27; x += 1) d += (d ? 'L' : 'M') + f(x) + ' ' + f(y + a * Math.sin(x * 0.9 + ph));
  return d + 'L27 25L4 25Z';
};

export default defineIcon({
  name: 'flask',
  zh: '烧瓶',
  category: 'science',
  tags: ['chemistry', 'lab', 'experiment', 'potion', '化学', '实验'],
  variants: ['sparkle', 'check', 'alert'],
  // A conical flask half full; on hover bubbles rise to the surface and burst, a new one forms and the surface rolls and rises.
  svg: (u) => `<clipPath id="${u.id('fl')}"><path d="${BODY}"/></clipPath>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${BODY}" fill="${u.upS}"/></g></g>
    <g clip-path="url(#${u.id('fl')})"><g filter="${u.hi}"><path data-n="liq" fill="${u.loS}"/></g>
      ${[1, 2, 3, 4].map((i) => `<circle data-n="b${i}" fill="#fff" data-w="fill"/>`).join('')}</g>
    <path d="${BODY}" ${OL}/>
    <g filter="${u.hi}"><path d="${LIP}" fill="${u.upS}"/></g><path d="${LIP}" ${OL}/>`,
  target: (h) => ({
    ph: h ? 3 * Math.PI : 0,
    y: h ? 13.2 : 14.4,
    a: h ? 1 : 0.5,
    b1: h ? [12.8, 16, 1.5] : [12.4, 20.6, 1.3],
    b2: h ? [18.4, 13.6, 0] : [17.8, 19.4, 1.5],
    b3: h ? [15.6, 13.2, 0] : [15, 17, 1.2],
    b4: h ? [15.4, 21.3, 1.6] : [15.4, 22.6, 0]
  }),
  draw(p, E) {
    at(E.liq, { d: liquid(p.y, p.ph, p.a) });
    [1, 2, 3, 4].forEach((i) => { const b = p[`b${i}`]; at(E[`b${i}`], { cx: f(b[0]), cy: f(b[1]), r: f(Math.max(0, b[2])) }); });
  }
});

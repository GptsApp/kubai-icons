import { defineIcon, KR, f, OL, DEEP, R, rp, rr, at } from '../packages/core/src/kit.js';

const BAND = rp(R(4, 7.6, 23, 4.2), [KR, KR, 0, 0]);
const STICK = rp(R(4, 3, 23, 3.6), [1.6, 1.6, 0.8, 0]);
const stripes = (y0, y1, lean) => [7.6, 13.2, 18.8, 24.4].map((x) => rp([[x, y0], [x + 2.8, y0], [x + 2.8 + lean, y1], [x + lean, y1]], 0.3)).join('');

export default defineIcon({
  name: 'clapperboard',
  zh: '场记板',
  category: 'media',
  tags: ['clapper', 'movie', 'film', 'scene', 'take', 'video', '电影'],
  variants: ['plus', 'check'],
  // A film slate whose striped clapper swings open on its hinge on hover, ready to clap.
  svg: (u) => {
    const body = rr(4, 7.6, 23, 15, KR);
    return `<clipPath id="${u.id('b')}"><path d="${BAND}"/></clipPath><clipPath id="${u.id('s')}"><path d="${STICK}"/></clipPath>
    <g filter="${u.sh}"><path d="${body}" fill="${u.lo(15)}"/></g><path d="${body}" ${OL}/>
    <g filter="${u.hi}"><path d="${BAND}" fill="${u.upS}"/></g>
    <path d="${stripes(7.6, 11.8, -2.2)}" clip-path="url(#${u.id('b')})" ${DEEP}/>
    <path d="${BAND}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="st"><path d="${STICK}" fill="${u.upS}"/></g></g></g>
    <g data-n="sto"><path d="${stripes(3, 6.6, 2)}" clip-path="url(#${u.id('s')})" ${DEEP}/><path d="${STICK}" ${OL}/></g>`;
  },
  target: (h) => ({ a: h ? -20 : 0 }),
  draw(p, E) {
    const t = `rotate(${f(p.a)} 4 6.6)`;
    at(E.st, { transform: t }); at(E.sto, { transform: t });
  }
});

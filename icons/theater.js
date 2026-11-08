import { defineIcon, f, OL, DEEP, DEEPS, ellipse, at } from '../packages/core/src/kit.js';

// A mask drawn round its own centre: a slightly dipped brow and a rounded chin.
const MASK = 'M-5.5 -4.6Q-5.5 -6.5 -3.6 -6.3Q0 -5.6 3.6 -6.3Q5.5 -6.5 5.5 -4.6V0.6C5.5 4.4 3 6.8 0 6.8C-3 6.8 -5.5 4.4 -5.5 0.6Z';
const EYES = ellipse(-2.3, -2, 1.4, 1.2) + ellipse(2.3, -2, 1.4, 1.2);

export default defineIcon({
  name: 'theater',
  zh: '戏剧',
  category: 'media',
  tags: ['masks', 'drama', 'comedy', 'tragedy', 'stage', 'performance', '剧场'],
  // The two masks of drama, sad behind and happy in front; on hover they tilt apart.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="bf"><path d="${MASK}" fill="${u.loS}"/></g></g></g>
    <g data-n="bo"><path d="${MASK}" ${OL}/><path d="${EYES}" fill="#fff" data-w="fill"/>
      <path d="M-2.4 3.6Q0 1.4 2.4 3.6" fill="none" stroke-width="1.6" stroke-linecap="round" stroke="#fff" data-w="stroke"/></g>
    <g filter="${u.sh}"><g filter="${u.hi}"><g data-n="ff"><path d="${MASK}" fill="${u.upS}"/></g></g></g>
    <g data-n="fo"><path d="${MASK}" ${OL}/><path d="${EYES}" ${DEEP}/>
      <path d="M-2.6 1.8Q0 4.6 2.6 1.8" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/></g>`,
  target: (h) => ({ b: h ? [10.4, 9, -22] : [11, 9.6, -14], fr: h ? [20, 14.6, 20] : [19.6, 14.2, 12] }),
  draw(p, E) {
    const t = (q) => `translate(${f(q[0])} ${f(q[1])}) rotate(${f(q[2])})`;
    at(E.bf, { transform: t(p.b) }); at(E.bo, { transform: t(p.b) });
    at(E.ff, { transform: t(p.fr) }); at(E.fo, { transform: t(p.fr) });
  }
});

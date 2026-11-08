import { defineIcon, f, OL, star, at } from '../packages/core/src/kit.js';

const STAR = star(11.6, 5.4);

export default defineIcon({
  name: 'star-half',
  zh: '半星评分',
  category: 'interface',
  tags: ['rating', 'half star', 'review', 'score', 'stars', '评分', '星级'],
  // A star filled up to its middle, as a half rating; on hover the fill runs on across the whole star.
  svg: (u) => {
    const cp = u.id('half');
    return `<defs><clipPath id="${cp}"><path data-n="cut"/></clipPath></defs>
      <g filter="${u.sh}"><g transform="translate(15.5 13.4)"><path d="${STAR}" fill="#fff"/>
        <g filter="${u.hi}"><path d="${STAR}" fill="${u.loS}" clip-path="url(#${cp})"/></g></g></g>
      <path d="${STAR}" transform="translate(15.5 13.4)" ${OL}/>`;
  },
  target: (h) => ({ x: h ? 12.5 : 0 }),
  draw(p, E) { at(E.cut, { d: `M-13 -13H${f(p.x)}V13H-13Z` }); }
});

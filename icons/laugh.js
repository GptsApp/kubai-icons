import { defineIcon, f, OL, clamp01, rattle, at } from '../packages/core/src/kit.js';
import { FACE } from './_comm-people.js';

export default defineIcon({
  name: 'laugh',
  zh: '大笑',
  category: 'people',
  tags: ['face', 'laughing', 'joy', 'funny', 'emoji', 'emotion', '哈哈'],
  // A laughing face with shut eyes; on hover it shakes with laughter, mouth opening wider.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="f"><path d="${FACE}" fill="${u.loS}"/></g></g></g>
    <g data-n="fo"><path d="${FACE}" ${OL}/>
      <path d="M9.4 10.4Q11.4 7.4 13.4 10.4M17.6 10.4Q19.6 7.4 21.6 10.4" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" stroke="#fff" data-w="stroke"/>
      <path data-n="m" fill="#fff" data-w="fill"/></g>`,
  target: (h) => ({ o: h ? 1 : 0, open: h ? 21 : 19.6 }),
  draw(p, E) {
    const b = p.open;
    at(E.m, { d: `M10.2 13.4H20.8Q22 13.4 21.7 14.6Q20.4 ${f(b)} 15.5 ${f(b)}Q10.6 ${f(b)} 9.3 14.6Q9 13.4 10.2 13.4Z` });
    const t = `rotate(${f(rattle(clamp01(p.o), 8, 3))} 15.5 21)`;
    at(E.f, { transform: t }); at(E.fo, { transform: t });
  }
});

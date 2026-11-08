import { defineIcon, f, OL, at } from '../packages/core/src/kit.js';
import { FACE } from './_comm-people.js';

export default defineIcon({
  name: 'wink',
  zh: '眨眼',
  category: 'people',
  tags: ['face', 'wink', 'playful', 'joke', 'emoji', 'emotion', '俏皮'],
  // A winking face; on hover it tips its head and the smile widens.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><g data-n="f"><path d="${FACE}" fill="${u.loS}"/></g></g></g>
    <g data-n="fo"><path d="${FACE}" ${OL}/>
      <circle cx="11.4" cy="9.8" r="1.7" fill="#fff" data-w="fill"/>
      <g fill="none" stroke-width="2.2" stroke-linecap="round" stroke="#fff" data-w="stroke"><path d="M17.4 10.2Q19.6 8 21.8 10.2"/><path data-n="m"/></g></g>`,
  target: (h) => ({ a: h ? -8 : 0, m: h ? [10, 14.4, 20.6] : [10.8, 15.2, 19.2] }),
  draw(p, E) {
    const [x, y, c] = p.m;
    at(E.m, { d: `M${f(x)} ${f(y)}Q15.5 ${f(c)} ${f(31 - x)} ${f(y)}` });
    const t = `rotate(${f(p.a)} 15.5 12.5)`;
    at(E.f, { transform: t }); at(E.fo, { transform: t });
  }
});

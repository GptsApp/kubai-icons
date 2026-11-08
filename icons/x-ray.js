import { defineIcon, KR, CR, f, DEEP, rr, at } from '../packages/core/src/kit.js';
import { solid } from './_b5-parts.js';

const BODY = rr(5.2, 2.2, 20.6, 20.6, KR), FILM = rr(7.4, 4.4, 16.2, 16.2, CR);
const RIBS = 'M10.6 9.8Q11 7.4 13.4 7.4H17.6Q20 7.4 20.4 9.8M9.9 13.8Q10.3 11.4 12.9 11.4H18.1Q20.7 11.4 21.1 13.8M10.6 17.8Q11 15.4 13.4 15.4H17.6Q20 15.4 20.4 17.8';

export default defineIcon({
  name: 'x-ray',
  zh: 'X 光片',
  category: 'health',
  tags: ['radiograph', 'scan', 'ribs', 'chest', 'radiology', 'imaging', '放射', '胸片'],
  // A chest film in a light box, ribs and spine in white; on hover a band of light passes down the film.
  svg: (u) => `<clipPath id="${u.id('fm')}"><path d="${FILM}"/></clipPath>
    ${solid(u, BODY, u.loS)}
    <path d="${FILM}" ${DEEP}/>
    <g clip-path="url(#${u.id('fm')})"><path data-n="scan" d="${rr(7.4, -1, 16.2, 5.4, 0)}" data-t="fill:#89B5FF"/></g>
    <path d="${RIBS}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M15.5 6V19" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`,
  target: (h) => ({ y: h ? 21.6 : 0 }),
  draw(p, E) { at(E.scan, { transform: `translate(0 ${f(p.y)})` }); }
});

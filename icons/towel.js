import { defineIcon, f, DEEPS, rp, R, rr, at } from '../packages/core/src/kit.js';
import { back, liveBack, liveFront, setPath } from './_b1-home.js';

export default defineIcon({
  name: 'towel',
  zh: '毛巾',
  category: 'home',
  tags: ['bathroom', 'hand towel', 'dry', 'wash', 'spa', 'rail', '浴巾', '擦手', '洗漱'],
  // A striped towel over a rail; it is pulled down through the rail on hover.
  svg: (u) => `${liveBack(u, 'b')}${back(u, rr(3.4, 3, 24.2, 3.4, 1.7))}
      ${liveFront(u, 'f')}<path data-n="s" fill="none" stroke-width="2.2" ${DEEPS}/>`,
  target: (h) => ({ y: h ? 24 : 17.4 }),
  draw(p, E) {
    setPath(E, 'b', rp(R(7.6, 2, 15.8, 40.6 - p.y - 2), [0, 0, 2, 2]));
    setPath(E, 'f', rp(R(7.6, 1.2, 15.8, p.y - 1.2), [2, 2, 2, 2]));
    at(E.s, { d: `M7.6 ${f(p.y - 4.2)}H23.4` });
  }
});

import { defineIcon, WHITES, rr, rp, at, f } from '../packages/core/src/kit.js';
import { back, liveFront, setPath, place } from './_b1-home.js';

const HINGE = [13.6, 11.8], LID = [[-0.8, -1.4], [13.6, -1.4], [13.6, 1.6], [-0.8, 1.6]];

export default defineIcon({
  name: 'toilet',
  zh: '马桶',
  category: 'home',
  tags: ['wc', 'restroom', 'bathroom', 'lavatory', 'flush', 'washroom', '卫生间', '厕所', '洗手间'],
  // A toilet from the side; on hover the flush lever dips and the lid lifts on its hinge.
  svg: (u) => {
    const bowl = 'M7.6 13H26.2Q27.1 13 27 13.9C26.3 18.4 23.8 20.4 20.8 20.9L21.5 23.2Q21.7 24 20.9 24H10.6Q9.8 24 9.8 23.2V20.2Q7.6 18.8 7.6 15.4Z';
    return `${back(u, rr(4.6, 1, 9, 12.6, 2.2))}${back(u, bowl)}
      <path data-n="lv" d="M7.2 5.2H11" fill="none" stroke-width="2.2" stroke-linecap="round" ${WHITES}/>
      ${liveFront(u, 'lid')}`;
  },
  target: (h) => ({ a: h ? -64 : 0, y: h ? 1.6 : 0 }),
  draw(p, E) {
    setPath(E, 'lid', rp(place(LID, p.a, ...HINGE), 1.4));
    at(E.lv, { transform: `translate(0 ${f(p.y)})` });
  }
});

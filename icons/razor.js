import { defineIcon, f, DEEPS, R, poly, rp, at, rattle, clamp01 } from '../packages/core/src/kit.js';
import { back, front, place } from './_b1-home.js';

const DEG = 32, CX = 13.8, CY = 13.5;
const on = (pts) => place(pts, DEG, CX, CY);

export default defineIcon({
  name: 'razor',
  zh: '剃须刀',
  category: 'home',
  tags: ['shave', 'blade', 'beard', 'grooming', 'barber', 'bathroom', '刮胡刀', '刀片', '胡须'],
  // A safety razor held at an angle; it makes shaving strokes along its handle on hover.
  svg: (u) => `<g data-n="g">
      ${front(u, rp(on([[-2.2, -5], [2.2, -5], [3.2, 11], [-3.2, 11]]), [0, 0, 2.6, 2.6]))}
      ${back(u, rp(on(R(-7.4, -11, 14.8, 8)), 2.2))}
      <path d="${rp(on(R(-5.2, -9, 10.4, 4)), 1.2)}" fill="#fff"/>
      <path d="${poly(on([[-3.6, -7], [3.6, -7]]))}" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
      <path d="${poly(on([[-1.3, 2.8], [1.3, 2.8]])) + poly(on([[-1.5, 6.2], [1.5, 6.2]]))}" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    </g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const t = rattle(clamp01(p.o), 4.2, 3), a = DEG * Math.PI / 180;
    at(E.g, { transform: `translate(${f(t * Math.sin(a))} ${f(-t * Math.cos(a))})` });
  }
});

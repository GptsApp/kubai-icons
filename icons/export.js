import { defineIcon, WHITE, WHITES, f, arrow, at } from '../packages/core/src/kit.js';
import { trayBack, trayFront, trayLower } from './_tray.js';
import { swell } from './_arrows.js';

const A = arrow(15.5, 12.3, 15.5, 5.9, 3.4, 2.9);

export default defineIcon({
  name: 'export',
  zh: '导出',
  category: 'arrows',
  tags: ['export', 'outbox', 'tray', 'send', 'arrow up', '发出'],
  // A tray with an arrow rising out of it; on hover the arrow lifts out as the front
  // wall dips away, then settles a little higher.
  svg: (u) => `${trayBack(u)}
    <g data-n="arr"><path d="${A.shaft}" fill="none" stroke-width="2.2" stroke-linecap="round" ${WHITES}/><path d="${A.head}" ${WHITE}/></g>
    ${trayFront(u)}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const w = swell(p.o);
    trayLower(E, 1.8 * w);
    at(E.arr, { transform: `translate(0 ${f(-p.o - 0.9 * w)})` });
  }
});

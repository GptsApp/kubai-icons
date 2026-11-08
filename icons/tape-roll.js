import { defineIcon, f, rp, circ, at } from '../packages/core/src/kit.js';
import { solid } from './_w2-dev.js';
import { cwCirc } from './_tools-dev.js';

const CX = 12.6, CY = 11.4, R = 9.4;
const ROLL = circ(CX, CY, R) + cwCirc(CX, CY, 6.4), CORE = circ(CX, CY, 6.4) + cwCirc(CX, CY, 4);

export default defineIcon({
  name: 'tape-roll',
  zh: '胶带',
  category: 'tools',
  tags: ['tape', 'adhesive tape', 'sticky tape', 'duct tape', 'roll', 'pack', '透明胶', '封箱'],
  // A roll of tape with its loose end; on hover a long strip is pulled off the
  // roll and down.
  svg: (u) => `<g filter="${u.hi}"><path data-n="t" fill="${u.upS}"/></g><path data-n="tO" class="ol" data-t="stroke:#5393FF"/>
    ${solid(u, ROLL, u.loS)}${solid(u, CORE, u.upS, { sh: false })}`,
  target: (h) => ({ x: h ? 29.4 : 24.8, dy: h ? 2.6 : 0 }),
  draw(p, E) {
    const y0 = CY + R - 3.6, y1 = CY + R;
    const d = rp([[CX, y0], [p.x, y0 + p.dy], [p.x - 1.6, y1 + p.dy], [CX, y1]], [0, 0.5, 0.5, 0]);
    at(E.t, { d }); at(E.tO, { d });
  }
});

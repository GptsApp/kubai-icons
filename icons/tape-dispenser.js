import { defineIcon, rp, circ, at, DEEP, OL } from '../packages/core/src/kit.js';
import { solid } from './_w2-dev.js';
import { band, cwCirc } from './_tools-dev.js';

const CX = 11.8, CY = 9.4, R = 8, HOLE = 3;
const BODY = rp([[3.2, 15.6], [20.4, 15.6], [20.4, 12], [27.2, 12], [27.8, 23.8], [3.2, 23.8]], [1.4, 1.4, 1.4, 1.2, 2, 2]);
const TEETH = rp([[21.6, 12.4], [23.4, 8.2], [25.2, 12.4], [27, 8.2], [28.8, 12.4]], [0.2, 0.3, 0.2, 0.3, 0.2]);

export default defineIcon({
  name: 'tape-dispenser',
  zh: '胶带座',
  category: 'tools',
  tags: ['sellotape', 'scotch tape holder', 'desk', 'office', 'stationery', '胶带切割器', '办公'],
  // A weighted desk dispenser with a roll on its hub; on hover more tape is pulled over the cutter and droops.
  svg: (u) => `<path d="${TEETH}" ${DEEP}/>
    <g filter="${u.hi}"><path data-n="t" fill="${u.upS}"/></g><path data-n="tO" ${OL}/>
    ${solid(u, circ(CX, CY, R) + cwCirc(CX, CY, 4.6), u.loS)}${solid(u, circ(CX, CY, 4.6) + cwCirc(CX, CY, HOLE), u.upS, { sh: false })}
    ${solid(u, BODY, u.loS)}`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const q = p.o;
    const d = rp(band([[CX + 4.2, CY - R + 0.6], [22.6, 5], [26.6 + 0.4 * q, 6.4 + 0.6 * q], [27.2 + 0.2 * q, 6.8 + 7.2 * q]], 2.6), 0.4);
    at(E.t, { d }); at(E.tO, { d });
  }
});

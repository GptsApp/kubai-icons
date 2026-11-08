// Shared pieces for the battery, energy and appliance icons.
import { KR, OL, DEEP, R, rp, rr } from '../packages/core/src/kit.js';

/** A back piece: mid-tone fill with shadow, top glow and outside outline. */
export const back = (u, d, fill = u.loS, n = '') => `<g filter="${u.sh}"><g filter="${u.hi}"><path d="${d}" fill="${fill}"${n ? ` data-n="${n}"` : ''}/></g></g><path d="${d}" ${OL}${n ? ` data-n="${n}O"` : ''}/>`;
/** A front piece: light fill with top glow and outside outline, no shadow. */
export const front = (u, d, fill = u.upS, n = '') => `<g filter="${u.hi}"><path d="${d}" fill="${fill}"${n ? ` data-n="${n}"` : ''}/></g><path d="${d}" ${OL}${n ? ` data-n="${n}O"` : ''}/>`;

/** The battery shell shared with battery-low: body, nub and the white cell window. */
export const BATTERY_BODY = rr(3.6, 6.4, 21.6, 12.2, KR);
export const BATTERY_NUB = rp(R(24.6, 10, 2.8, 5), [0, 1.2, 1.2, 0]);
export const battery = (u) => `${back(u, BATTERY_NUB)}${back(u, BATTERY_BODY)}<path d="${rr(5.8, 8.6, 17.2, 7.8, 1.2)}" fill="#fff"/>`;
/** The charge level inside the battery window, w wide. */
export const level = (w) => rr(7.2, 10, w, 5, 0.8);
/** A lightning bolt mark whose box is 5.4 wide and 6.8 tall, top left at (x, y). */
export const bolt = (x, y, s = 1) => rp([[3.8, 0], [0, 4], [2.4, 4], [1.6, 6.8], [5.4, 2.8], [3, 2.8]].map(([a, b]) => [x + a * s, y + b * s]), 0.4);
export { DEEP };

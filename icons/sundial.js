import { defineIcon, f, OL, DEEPS, rp, ellipse, at } from '../packages/core/src/kit.js';

const PLATE = 'M4 12.6A11.5 4.6 0 0 1 27 12.6V14.8A11.5 4.6 0 0 1 4 14.8Z';
const POST = rp([[12.2, 17], [18.8, 17], [20.4, 23.4], [10.6, 23.4]], [0, 0, 1.2, 1.2]);
const GNOMON = rp([[15.5, 12.6], [15.5, 3.2], [22.2, 12.6]], [0, 0.8, 0.6]);

export default defineIcon({
  name: 'sundial',
  zh: '日晷',
  category: 'time',
  tags: ['sundial', 'sun', 'shadow', 'ancient', 'time', '日影'],
  // A sundial on its post; on hover the sun moves on and the gnomon's shadow swings
  // across the dial, lengthening as it goes.
  svg: (u) => `
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${POST}" fill="${u.upS}"/></g></g><path d="${POST}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${PLATE}" fill="${u.loS}"/></g></g><path d="${PLATE}" ${OL}/>
    <path d="${ellipse(15.5, 12.6, 11.5, 4.6)}" fill="#fff"/>
    <path data-n="shade" fill="none" stroke-width="2.2" stroke-linecap="round" ${DEEPS}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${GNOMON}" fill="${u.upS}"/></g></g><path d="${GNOMON}" ${OL}/>`,
  target: (h) => ({ a: h ? 32 : 150 }),
  draw(p, E) {
    const r = p.a * Math.PI / 180, k = 1 + 0.08 * (150 - p.a) / 118;
    at(E.shade, { d: `M15.5 13.2L${f(15.5 + 8.2 * k * Math.cos(r))} ${f(13 + 3 * k * Math.sin(r))}` });
  }
});

import { defineIcon, f, DEEP, DEEPS, LINE, ellipse, rr, at, clamp01 } from '../packages/core/src/kit.js';
import { back, front } from './_commerce-charts.js';

const WALL = 'M4 11V15.6A11.5 6.4 0 0 0 27 15.6V11Z';
const RIM = ellipse(15.5, 11, 11.5, 6.4);
const LAMP = (x) => rr(x - 2.2, 0.4, 4.4, 2.8, 0.9);

export default defineIcon({
  name: 'stadium',
  zh: '体育场',
  category: 'travel',
  tags: ['arena', 'stadium', 'sports venue', 'match', 'concert', 'event', '球场', '场馆'],
  variants: ['star', 'clock', 'check'],
  // An oval stadium with floodlights on two masts; on hover the floodlights come on.
  svg: (u) => `<path d="M6.6 3.2V8M24.4 3.2V8" fill="none" stroke-width="1.6" stroke-linecap="round" ${DEEPS}/>
    <path d="${LAMP(6.6) + LAMP(24.4)}" ${DEEP}/>
    <path data-n="lit" d="${rr(5, 1, 3.2, 1.6, 0.8) + rr(22.8, 1, 3.2, 1.6, 0.8)}" fill="#fff"/>
    ${back(u, WALL, u.loS)}
    ${front(u, RIM, u.upS)}
    <path d="${ellipse(15.5, 11, 7.6, 3.6)}" fill="#fff"/>
    <path d="M15.5 7.4V14.6" ${LINE}/>`,
  target: (h) => ({ lit: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.lit), g = Math.min(1, o * 3), face = (x) => rr(x - 0.3 * g, 1 - 0.3 * g, 3.2 + 0.6 * g, 1.6 + 0.6 * g, 0.8 - 0.2 * g);
    at(E.lit, { d: face(5) + face(22.8), opacity: f(o) });
  }
});

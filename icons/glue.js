import { defineIcon, rp, rr, scaleAt, at } from '../packages/core/src/kit.js';
import { solid } from './_w2-dev.js';

const BODY = rr(8.6, 10.8, 13.8, 12.4, 2.2), CAP = rp([[10.8, 11.4], [20.2, 11.4], [17.8, 5.4], [13.2, 5.4]], [0.6, 0.6, 1.2, 1.2]);
const NOZZLE = rr(14.3, 1.4, 2.4, 5, 1.1), LABEL = rr(10.8, 13.6, 9.4, 6.4, 1.2);
const DROP = 'M15.5 14.6C16.4 15.6 17.2 16.4 17.2 17.4A1.7 1.7 0 0 1 13.8 17.4C13.8 16.4 14.6 15.6 15.5 14.6Z';

export default defineIcon({
  name: 'glue',
  zh: '胶水',
  category: 'tools',
  tags: ['glue', 'adhesive', 'paste', 'bottle', 'craft', 'stick', '粘贴', '胶'],
  // A bottle of glue with a pointed nozzle; on hover the bottle is squeezed.
  svg: (u) => `${solid(u, NOZZLE, u.loS)}${solid(u, CAP, u.upS)}
    <g data-n="b">${solid(u, BODY, u.lo(12.4))}<path d="${LABEL}" fill="#fff"/><path d="${DROP}" data-t="fill:#2F6FE0"/></g>`,
  target: (h) => ({ s: h ? 0.9 : 1 }),
  draw(p, E) { at(E.b, { transform: scaleAt(p.s, 15.5, 17, 1) }); }
});
